import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

function App() {

  // State for keeping record of Game wons
  const [player1Games, setPlayer1Games] = useState(0);
  const [player2Games, setPlayer2Games] = useState(0);
  // State for player turns
  const [currentPlayer, setCurrentPlayer] = useState(1);
  // State to manage the game board
  const [gameState, setGameState] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  // Resetting every state if the game is draw
  function resetGame() {
    setPlayer1Games(0);
    setPlayer2Games(0);
    setCurrentPlayer(1);
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  }

  // When a game is completed only the player turn and board are reset
  function gameCompleted() {
    setCurrentPlayer(1);
    setGameState([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  }

  // Will return X or O depending on the player turn
  function play(row, col) {
    var turn = gameState[row][col];
    switch (turn) {
      case 1: return <Text style={styles.tileX}>X</Text>; // for player 1
      case -1: return <Text style={styles.tileO}>O</Text>; // for player 2
      default: return <Text style={styles.tileX}></Text> // empty
    }
  }

  // On pressing the Tile
  function onTilePressed(row, col) {
    // Checking if the tile is already marked or not, if (yes) => return;
    var alreadyMakredTile = gameState[row][col];
    if (alreadyMakredTile != 0) {
      return;
    }

    // Getting current player
    var currentTurn = currentPlayer;
    // Copying the array
    var myArr = gameState.slice();
    myArr[row][col] = currentTurn;
    setGameState(myArr);

    // Switching the turn to next player
    var nextTurn = (currentTurn == 1) ? -1 : 1;
    setCurrentPlayer(nextTurn);

    // Winner check after every turn
    var winner = checkWinner();
    if (winner == 1) {
      Alert.alert("Player 1 Wins..!");
      // incrementing the score
      setPlayer1Games(prevGames1 => prevGames1 + 1);
      // Game completed, NOT RESET!
      gameCompleted();
    } else if (winner == -1) {
      // incrementing the score
      setPlayer2Games(prevGames2 => prevGames2 + 1);
      Alert.alert("Player 2 Wins...!");
      // Game completed, NOT RESET!
      gameCompleted();
    }
  }

  // Checking the winner
  function checkWinner() {
    // if player 1 wins, a row/column will have 3 as sum
    // if player 2 wins, a row/column will have -3 as sum
    var sum;
    var myArray = gameState;

    // getting the total tiles, which are 3 in every case
    const totalTiles = 3;

    // Checking all rows
    for (var i = 0; i < totalTiles; i++) {
      sum = myArray[i][0] + myArray[i][1] + myArray[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Checking all column
    for (var i = 0; i < totalTiles; i++) {
      sum = myArray[0][i] + myArray[1][i] + myArray[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Checking diagonals, hard coding it as only 2 diagonals
    // 1st diagonal
    sum = myArray[0][0] + myArray[1][1] + myArray[2][2]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }
    // 2nd diagonal
    sum = myArray[0][2] + myArray[1][1] + myArray[2][0]
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // if nobody wins
    return 0;

  }

  // Header with Game title and blue background
  function Header() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Tic Tac Toe</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Header */}
      <Header></Header>

      {/* Score Card */}
      <View style={{
        alignItems: 'center',
        paddingTop: 8
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{ fontSize: 25, color: "#d82e1d" }}>Player 1 : </Text>
          <Text style={{ fontSize: 25, color: "#fd8b0c" }}>Player 2</Text>
        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#d82e1d" }}>{player1Games} : </Text>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#fd8b0c" }}>{player2Games}</Text>
        </View>
      </View>

      {/* Game Board */}
      <View style={styles.outerContainer}>

        {/* 1st Row */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onTilePressed(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {play(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
            {play(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {play(0, 2)}
          </TouchableOpacity>
        </View>

        {/* 2nd Row */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onTilePressed(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
            {play(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(1, 1)} style={styles.tile}>
            {play(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {play(1, 2)}
          </TouchableOpacity>
        </View>

        {/* 3rd Row */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => onTilePressed(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
            {play(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {play(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTilePressed(2, 2)} style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}>
            {play(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 50 }}></View>
        {/* Button to reset the game */}
        <Button onPress={gameCompleted} title={"New Game"}></Button>
        <View style={{ paddingTop: 20 }}></View>
        {/* Button to reset the game */}
        <Button onPress={resetGame} title={"Reset Game Scores"}></Button>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#87ceeb",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 500
  },
  tile: {
    borderWidth: 5,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileX: {
    color: '#d82e1d',
    fontSize: 60,
  },
  tileO: {
    color: '#fd8b0c',
    fontSize: 60,
  }
});

export default App;
