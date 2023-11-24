import java.io.*;
import java.time.*;
import java.util.*;

public class UserLogin {
    private final Map<String, String> userCredentials = new HashMap<>();
    private final String LOGIN_ATTEMPT_FILE = "signIn.txt";

    public UserLogin(String credentialsFile) throws IOException {
        loadCredentials(credentialsFile);
    }

    private void loadCredentials(String credentialsFile) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(credentialsFile))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",\\s*");
                if (parts.length == 2) {
                    userCredentials.put(parts[0].trim(), parts[1].trim());
                }
            }
        }
    }

    public boolean authenticate(String userID, String password) throws IOException {
        boolean isAuthenticated = userCredentials.containsKey(userID) && userCredentials.get(userID).equals(password);
        logAttempt(userID, isAuthenticated);
        return isAuthenticated;
    }

    private void logAttempt(String userID, boolean success) throws IOException {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(LOGIN_ATTEMPT_FILE, true))) {
            bw.write("Login attempt: " + userID + " at " + LocalDateTime.now() + " - " + (success ? "Success" : "Failed") + "\n");
        }
    }
}
