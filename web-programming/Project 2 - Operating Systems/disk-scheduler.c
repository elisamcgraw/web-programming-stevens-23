#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

#define MAX_REQUESTS 100
#define LOWER_CYLINDER 0
#define UPPER_CYLINDER 4999

// Function prototypes
void read_requests(const char* filename, int requests[], int* num_requests);
void print_requests(const int requests[], int num_requests);
void execute_fcfs(int requests[], int num_requests, int initial_pos);
void execute_sstf(int requests[], int num_requests, int initial_pos);
void execute_scan(int requests[], int num_requests, int initial_pos);
void execute_cscan(int requests[], int num_requests, int initial_pos);
void execute_look(int requests[], int num_requets, int initial_pos);
void execute_clook(int requests[], int num_requests, int initial_pos);
int calculate_total_movement(const int serviced_order[], int num_requests, int initial_pos);
int ascending(const void *a, const void *b); 


// Main function
int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <initial_cylinder_position>\n", argv[0]);
        return 1;
    }

    int initial_pos = atoi(argv[1]);
    if (initial_pos < LOWER_CYLINDER || initial_pos > UPPER_CYLINDER) {
        fprintf(stderr, "Initial cylinder position must be between %d and %d\n",
                LOWER_CYLINDER, UPPER_CYLINDER);
        return 1;
    }

    int requests[MAX_REQUESTS];
    int num_requests = 0;

    read_requests("request.txt", requests, &num_requests);
    print_requests(requests, num_requests);

    // Execute scheduling algorithms
    execute_fcfs(requests, num_requests, initial_pos);
    execute_sstf(requests, num_requests, initial_pos);
    execute_scan(requests, num_requests, initial_pos);
    execute_cscan(requests, num_requests, initial_pos);
    execute_look(requests, num_requests, initial_pos);
    execute_clook(requests, num_requests, initial_pos);

    return 0;
}


void read_requests(const char* filename, int requests[], int* num_requests) {
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    int request;
    while (fscanf(file, "%d, ", &request) == 1) {
        if (request < LOWER_CYLINDER || request > UPPER_CYLINDER) {
            fprintf(stderr, "Request %d is out of bounds and will be ignored\n", request);
            continue;
        }
        requests[(*num_requests)++] = request;
    }

    fclose(file);
}

// Print the request queue
void print_requests(const int requests[], int num_requests) {
    printf("Request Queue: ");
    for (int i = 0; i < num_requests; i++) {
        printf("%d ", requests[i]);
    }
    printf("\n");
    printf("-----------------------------------\n");
}

// Calculate total head movement
int calculate_total_movement(const int serviced_order[], int num_requests, int initial_pos) {
    int total_movement = 0;
    int current_pos = initial_pos;

    for (int i = 0; i < num_requests; i++) {
        total_movement += abs(serviced_order[i] - current_pos);
        current_pos = serviced_order[i];
    }

    return total_movement;
}

// Execute the FCFS disk scheduling algorithm
void execute_fcfs(int requests[], int num_requests, int initial_pos) {
    int total_movement = calculate_total_movement(requests, num_requests, initial_pos);
    printf("FCFS Service Order: ");
    for (int i = 0; i < num_requests; i++) {
        printf("%d ", requests[i]);
    }
    printf("\n");
    printf("FCFS Total Head Movement: %d\n", total_movement);

}

// Function to find the index of the minimum element
int find_min_index(int arr[], int num_elements) {
    int min_index = 0;
    for (int i = 1; i < num_elements; i++) {
        if (arr[i] < arr[min_index]) {
            min_index = i;
        }
    }
    return min_index;
}

// Execute the SSTF disk scheduling algorithm
void execute_sstf(int requests[], int num_requests, int initial_pos) {
    int *serviced_order = (int *)malloc(num_requests * sizeof(int));
    int *seek_time = (int *)malloc(num_requests * sizeof(int));
    int current_pos = initial_pos;
    int serviced_count = 0;

    // Create a copy of the requests to manipulate
    int *request_copy = (int *)malloc(num_requests * sizeof(int));
    memcpy(request_copy, requests, num_requests * sizeof(int));

    // Array to keep track of which requests have been serviced
    int *serviced = (int *)calloc(num_requests, sizeof(int));

    while (serviced_count < num_requests) {
        // Calculate seek time for each request from the current position
        for (int i = 0; i < num_requests; i++) {
            seek_time[i] = serviced[i] ? INT_MAX : abs(current_pos - request_copy[i]);
        }

        // Find the request with minimum seek time
        int min_index = find_min_index(seek_time, num_requests);
        serviced_order[serviced_count++] = request_copy[min_index];
        current_pos = request_copy[min_index];
        serviced[min_index] = 1;  // Mark this request as serviced
    }

    // Calculate total head movement
    int total_movement = calculate_total_movement(serviced_order, num_requests, initial_pos);

    // Print total head movement and service order
    printf("SSTF Service Order: ");
    for (int i = 0; i < num_requests; i++) {
        printf("%d ", serviced_order[i]);
    }
    printf("\n");

    // Free allocated memory
    free(serviced_order);
    free(seek_time);
    free(request_copy);
    free(serviced);

    printf("SSTF Total Head Movement: %d\n", total_movement);

}

// Function to compare two integers for ascending order sorting
int ascending(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}


// Execute the LOOK disk scheduling algorithm
void execute_look(int requests[], int num_requests, int initial_pos) {
    int sorted_requests[MAX_REQUESTS];
    memcpy(sorted_requests, requests, num_requests * sizeof(int));
    qsort(sorted_requests, num_requests, sizeof(int), ascending);

    printf("LOOK Service Order: ");
    int total_movement = 0, last_position = initial_pos;

    // Service requests upwards
    for (int i = 0; i < num_requests; i++) {
        if (sorted_requests[i] >= initial_pos) {
            printf("%d ", sorted_requests[i]);  // Printing each serviced request
            total_movement += abs(sorted_requests[i] - last_position);
            last_position = sorted_requests[i];
        }
    }

    // Service requests downwards
    for (int i = num_requests - 1; i >= 0; i--) {
        if (sorted_requests[i] < initial_pos) {
            printf("%d ", sorted_requests[i]);  // Printing each serviced request
            total_movement += abs(sorted_requests[i] - last_position);
            last_position = sorted_requests[i];
        }
    }

    printf("\nLOOK Total Head Movement: %d\n", total_movement);
}

// Execute the C-LOOK disk scheduling algorithm
void execute_clook(int requests[], int num_requests, int initial_pos) {
    int sorted_requests[MAX_REQUESTS];
    memcpy(sorted_requests, requests, num_requests * sizeof(int));
    qsort(sorted_requests, num_requests, sizeof(int), ascending);

    printf("C-LOOK Service Order: ");
    int total_movement = 0, last_position = initial_pos;

    // Service requests upwards
    for (int i = 0; i < num_requests; i++) {
        if (sorted_requests[i] >= initial_pos) {
            printf("%d ", sorted_requests[i]);  // Printing each serviced request
            total_movement += abs(sorted_requests[i] - last_position);
            last_position = sorted_requests[i];
        }
    }

    // Jump to the start and continue servicing
    last_position = sorted_requests[0];  // Set the last position to the lowest request

    for (int i = 0; i < num_requests; i++) {
        if (sorted_requests[i] < initial_pos) {
            printf("%d ", sorted_requests[i]);  // Printing each serviced request
            total_movement += abs(sorted_requests[i] - last_position);
            last_position = sorted_requests[i];
        }
    }

    printf("\nC-LOOK Total Head Movement: %d\n", total_movement);
}


// Utility function to serve requests in the direction from the initial head position towards UPPER_CYLINDER
int serve_direction_up(int *requests, int num_requests, int current_pos, int *serviced_order, int start_index) {
    int movement = 0;
    for (int i = start_index; i < num_requests; ++i) {
        serviced_order[i - start_index] = requests[i];
        movement += abs(requests[i] - current_pos);
        current_pos = requests[i];
    }
    return movement;
}

// Utility function to serve requests in the direction from the initial head position towards LOWER_CYLINDER
int serve_direction_down(int *requests, int num_requests, int current_pos, int *serviced_order, int end_index) {
    int movement = 0;
    for (int i = end_index; i >= 0; --i) {
        serviced_order[end_index - i] = requests[i];
        movement += abs(requests[i] - current_pos);
        current_pos = requests[i];
    }
    return movement;
}

// Execute SCAN disk schdeuling algorithm
void execute_scan(int requests[], int num_requests, int initial_pos) {
    printf("SCAN Service Order: ");
    int sorted_requests[MAX_REQUESTS];
    memcpy(sorted_requests, requests, num_requests * sizeof(int));
    qsort(sorted_requests, num_requests, sizeof(int), ascending);

    int total_movement = 0, last_position = initial_pos;
    int i, serviced = 0;

    // Service requests upwards
    for (i = 0; i < num_requests && sorted_requests[i] <= initial_pos; i++);
    for (int j = i; j < num_requests; j++) {
        printf("%d ", sorted_requests[j]);
        total_movement += abs(sorted_requests[j] - last_position);
        last_position = sorted_requests[j];
        serviced++;
    }

    // Service requests downwards
    for (int j = i - 1; j >= 0; j--) {
        printf("%d ", sorted_requests[j]);
        total_movement += abs(sorted_requests[j] - last_position);
        last_position = sorted_requests[j];
    }

    printf("\nSCAN Total Head Movement: %d\n", total_movement);
}






// Execute the C-SCAN disk scheduling algorithm
void execute_cscan(int requests[], int num_requests, int initial_pos) {
    printf("C-SCAN Service Order: ");
    int sorted_requests[MAX_REQUESTS];
    memcpy(sorted_requests, requests, num_requests * sizeof(int));
    qsort(sorted_requests, num_requests, sizeof(int), ascending);

    int total_movement = 0, last_position = initial_pos;
    int i = 0;

    // Service requests upwards from the initial position
    while (i < num_requests && sorted_requests[i] < initial_pos) {
        i++;
    }

    for (; i < num_requests; i++) {
        printf("%d ", sorted_requests[i]);
        total_movement += abs(sorted_requests[i] - last_position);
        last_position = sorted_requests[i];
    }

    // Jump to the start
    if (num_requests > 0 && sorted_requests[num_requests - 1] != UPPER_CYLINDER) {
        total_movement += UPPER_CYLINDER - last_position;
        total_movement += UPPER_CYLINDER; // Full jump from end to start
        last_position = LOWER_CYLINDER;
    }

    // Continue servicing from the lowest request
    for (i = 0; i < num_requests && sorted_requests[i] < initial_pos; i++) {
        printf("%d ", sorted_requests[i]);
        total_movement += abs(sorted_requests[i] - last_position);
        last_position = sorted_requests[i];
    }

    printf("\nC-SCAN Total Head Movement: %d\n", total_movement);
}
