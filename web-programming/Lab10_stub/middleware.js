/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/


// Middleware #1: Logs each request
function logRequests(req, res, next) {
    const currentTimestamp = new Date().toUTCString();
    const requestMethod = req.method;
    const requestRoute = req.originalUrl;
    const isAuthenticated = req.session.user ? 'Authenticated User' : 'Non-Authenticated User';

    console.log(`[${currentTimestamp}]: ${requestMethod} ${requestRoute} (${isAuthenticated})`);

    // Implementing additional redirection logic
    if (req.originalUrl === '/') {
        if (req.session.user) {
            if (req.session.user.role === 'admin') {
                return res.redirect('/admin');
            } else {
                return res.redirect('/protected');
            }
        } else {
            return res.redirect('/login');
        }
    }

    next();
}

// Middleware #2: Redirects for /login route
function redirectLogin(req, res, next) {
    if (req.session.user) {
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/protected');
        }
    }
    next();
}

// Middleware #3: Redirects for /register route
function redirectRegister(req, res, next) {
    if (req.session.user) {
        return res.redirect(req.session.user.role === 'admin' ? '/admin' : '/protected');
    }
    next();
}

// Middleware #4: Protects /protected route
function protectRoute(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

// Middleware #5: Protects /admin route
function adminOnly(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    } else if (req.session.user.role !== 'admin') {
        // Redirect to the error route with a custom message
        return res.status(403).render('error', { 
            error: 'Forbidden: You do not have permission to view the admin page' 
        });
    }
    next();
}


// Middleware #6: Handles /logout route
function handleLogout(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    next();
}

export { logRequests, redirectLogin, redirectRegister, protectRoute, adminOnly, handleLogout };
