CC = g++
CFLAGS = -Iinclude -std=c++11 
SRC = src/metroApp.cpp src/metroMap.cpp src/graph.cpp src/heap.cpp
OBJ = $(SRC:.cpp=.o)
EXEC = metroApp

all: $(EXEC)

$(EXEC): $(OBJ)
	$(CC) -o $(EXEC) $(OBJ)

%.o: %.cpp
	$(CC) $(CFLAGS) -c $< -o $@


clean:
	rm -f $(OBJ) $(EXEC)
