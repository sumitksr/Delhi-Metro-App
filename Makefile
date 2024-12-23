CC = g++
CFLAGS = -std=c++11 -Wall
SRC = src/metroApp.cpp src/graph.cpp src/heap.cpp src/metroMap.cpp
OBJ = $(SRC:.cpp=.o)
OUT = metroApp

all: $(OUT)

$(OUT): $(OBJ)
	$(CC) $(CFLAGS) -o $(OUT) $(OBJ)

clean:
	rm -f $(OBJ) $(OUT)
