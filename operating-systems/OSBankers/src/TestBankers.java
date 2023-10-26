/**
 * A test harness for the bankers algorithm.
 *
 * Usage:
 *	java TestHarness <one or more resources>
 *
 * I.e.
 *	java TestHarness <input file> 10 5 7
 *
 * Once this is entered, the user enters "*" to output the state of the bank.
 */

import java.io.*;
import java.util.*;

public class TestBankers
{
	public static final int NUMBER_OF_CUSTOMERS = 5;
	
	public static void main(String[] args) throws java.io.IOException {
		Scanner scan = new Scanner(System.in);
		// get the name of the input file
		String inputFile = "/Users/elisamasiero/Documents/stevens-fall/operating-systems/OSBankers/src/infile.txt";

		// now get the resources
		System.out.print("Enter the number of resources available: ");
		int numOfResources = scan.nextInt();

		// the initial number of resources
		int[] initialResources= new int[numOfResources];

		// the resources involved in the transaction
		int[] resources= new int[numOfResources];
			

		// create the bank
		Bank theBank = new BankImpl(initialResources);
		int[] maxDemand = new int[numOfResources];

		// read initial values for maximum array 
		String line;
		try {
			BufferedReader inFile = new BufferedReader(new FileReader(inputFile));

			int threadNum = 0;
			int resourceNum = 0;

			//read from input file
			for (int i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
				line = inFile.readLine();
				StringTokenizer tokens = new StringTokenizer(line,",");
				

				while (tokens.hasMoreTokens()) {
					int amt = Integer.parseInt(tokens.nextToken().trim());
					maxDemand[resourceNum++] = amt;
				}
				theBank.addCustomer(threadNum,maxDemand);
				++threadNum;
				resourceNum = 0;
			}
		}
		catch (FileNotFoundException fnfe) {
			throw new Error("Unable to find file " + inputFile);
		}
		catch (IOException ioe) {
			throw new Error("Error processing " + inputFile);
		}

		// now loop reading requests

		BufferedReader cl = new BufferedReader(new InputStreamReader(System.in));
		int[] requests = new int[numOfResources];
		String requestLine;

		while ( (requestLine = cl.readLine()) != null) {
			if (requestLine.equals(""))
				continue;

			if (requestLine.equals("*"))
				// output the state
				theBank.getState();
			else {
				// we know that we are reading N items on the command line
				// [RQ || RL] <customer number> <resource #1> <#2> <#3>
				StringTokenizer tokens = new StringTokenizer(requestLine);

				// get transaction type - request (RQ) or release (RL)
				String trans = tokens.nextToken().trim();

				// get the customer number making the transaction
				int custNum = Integer.parseInt(tokens.nextToken().trim());

				// get the resources involved in the transaction
				for (int i = 0; i < numOfResources; i++) {
					resources[i] = Integer.parseInt(tokens.nextToken().trim());
					//System.out.println("*"+resources[i]+"*");
				}

				// now check the transaction type
				if (trans.equals("RQ")) {  // request
					if (theBank.requestResources(custNum,resources))
						System.out.println("Approved");
					else
						System.out.println("Denied");
				}
				else if (trans.equals("RL")) // release
					theBank.releaseResources(custNum, resources);
				else // illegal request
					System.err.println("Must be either 'RQ' or 'RL'");
			}
		}
	}
}
