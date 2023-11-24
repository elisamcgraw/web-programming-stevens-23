import java.io.*;
import java.util.Scanner;

import java.io.IOException;
import java.util.Scanner;


public class Main {
    private static final int MAX_ATTEMPTS = 3;

    public static void main(String[] args) {
        try {
        UserLogin login = new UserLogin("operating-systems/project-3/LoginsAndPasswords.txt");
            Scanner scanner = new Scanner(System.in);
            int attempts = 0;

            while (attempts < MAX_ATTEMPTS) {
                System.out.print("Enter User ID: ");
                String userID = scanner.nextLine();
                System.out.print("Enter Password: ");
                String password = scanner.nextLine();

                if (login.authenticate(userID, password)) {
                    System.out.println("Login successful!");
                    break;
                } else {
                    System.out.println("Incorrect credentials. Please try again.");
                    attempts++;
                }
            }

            if (attempts == MAX_ATTEMPTS) {
                System.out.println("Account locked for 1 hour.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

