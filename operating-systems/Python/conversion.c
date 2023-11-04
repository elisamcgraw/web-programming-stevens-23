#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int FIFO(int size, int pages[], int len) {
    int memory[size];
    int faults = 0, count = 0, fifoIndex = 0;

    printf("FIFO\n");

    for (int i = 0; i < len; i++) {
        int page = pages[i];
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (memory[j] == page) {
                found = 1;
                break;
            }
        }
        if (!found && count < size) {
            memory[count++] = page;
            faults++;
        } else if (!found && count == size) {
            memory[fifoIndex] = page;
            fifoIndex = (fifoIndex + 1) % size;
            faults++;
        }
        printf(" faults = %d inserting %d memory = ", faults, page);
        for (int k = 0; k < count; k++) printf("%d ", memory[k]);
        printf("\n");
    }
    return faults;
}

int LRU(int size, int pages[], int len) {
    int memory[size];
    int faults = 0, count = 0;

    printf("LRU\n");

    for (int i = 0; i < len; i++) {
        int page = pages[i];
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (memory[j] == page) {
                found = 1;
                for (int k = j; k < count - 1; k++) memory[k] = memory[k + 1];
                memory[count - 1] = page;
                break;
            }
        }
        if (!found && count < size) {
            memory[count++] = page;
            faults++;
        } else if (!found && count == size) {
            for (int k = 0; k < size - 1; k++) memory[k] = memory[k + 1];
            memory[count - 1] = page;
            faults++;
        }
        printf(" faults = %d inserting %d memory = ", faults, page);
        for (int k = 0; k < count; k++) printf("%d ", memory[k]);
        printf("\n");
    }
    return faults;
}

int OPT(int size, int pages[], int len) {
    int memory[size];
    int faults = 0, count = 0;

    printf("OPT\n");

    for (int i = 0; i < len; i++) {
        int page = pages[i];
        int found = 0;
        for (int j = 0; j < count; j++) {
            if (memory[j] == page) {
                found = 1;
                break;
            }
        }

        if (!found && count < size) {
            memory[count++] = page;
            faults++;
        } else if (!found && count == size) {
            int maxIndex = -1, selected = -1;

            for (int j = 0; j < size; j++) {
                int future = len;
                for (int k = i + 1; k < len; k++) {
                    if (pages[k] == memory[j]) {
                        future = k;
                        break;
                    }
                }
                if (future == len) {
                    selected = j;
                    break;
                } else if (future > maxIndex) {
                    maxIndex = future;
                    selected = j;
                }
            }

            memory[selected] = page;
            faults++;
        }
        printf(" faults = %d inserting %d memory = ", faults, page);
        for (int k = 0; k < count; k++) printf("%d ", memory[k]);
        printf("\n");
    }
    return faults;
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: ./paging [number of pages]\n");
        return 1;
    }

    int size = atoi(argv[1]);
    int pages[] = {0,1,2,3,4,4,3,2,1,0,0,1,2,3,4,4,3,2,1,0};
    int len = sizeof(pages) / sizeof(pages[0]);

    printf("%d page faults.\n", FIFO(size, pages, len));
    printf("%d page faults.\n", LRU(size, pages, len));
    printf("%d page faults.\n", OPT(size, pages, len));

    return 0;
}
