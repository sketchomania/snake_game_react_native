import { Link } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {

  // constants
  const COLs = 48; // Number of columns on board
  const ROWs = 48; // Number of rows on board

  // Default length of snake i.e, it will consume 10 cell by default
  const DEFAULT_LENGTH = 10;

  // Declaring directions as symbol for equality checks
  const UP = Symbol("up");
  const DOWN = Symbol("down");
  const RIGHT = Symbol("right");
  const LEFT = Symbol("left");

  // state and Reference
  const timer = useRef(null);
  const grid = useRef(Array(ROWs).fill(Array(COLs).fill("")));
  const snakeCoordinates = useRef([]);
  const direction = useRef(RIGHT);
  const snakeCoordinatesMap = useRef(new Set());
  const foodCoords = useRef({
      row: -1,
      col: -1,
  });
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setPlaying] = useState(0);


  // move snake
  const moveSnake = () => {
    if (gameOver) return;

    setPlaying((s) => s + 1);

    const coords = snakeCoordinates.current;
    const snakeTail = coords[0];
    const snakeHead = coords.pop();
    const curr_direction = direction.current;

    // Check for food ball consumption
    const foodConsumed =
        snakeHead.row === foodCoords.current.row &&
        snakeHead.col === foodCoords.current.col;

    // Update body coords based on direction and its position
    coords.forEach((_, idx) => {
        // Replace last cell with snake head coords [last is the cell after snake head]
        if (idx === coords.length - 1) {
            coords[idx] = { ...snakeHead };
            coords[idx].isHead = false;
            return;
        }

        // Replace current cell coords with next cell coords
        coords[idx] = coords[idx + 1];
    });

    // Update snake head coords based on direction
    switch (curr_direction) {
        case UP:
            snakeHead.row -= 1;
            break;
        case DOWN:
            snakeHead.row += 1;
            break;
        case RIGHT:
            snakeHead.col += 1;
            break;
        case LEFT:
            snakeHead.col -= 1;
            break;
    }

    // If food ball is consumed, update points and new position of food
    if (foodConsumed) {
        setPoints((points) => points + 10);
        populateFoodBall();
    }

    // If there is no collision for the movement, continue the game
    const collided = collisionCheck(snakeHead);
    if (collided) {
        stopGame();
        return;
    }

    // Create new coords with new snake head
    coords.push(snakeHead);
    snakeCoordinates.current = foodConsumed
        ? [snakeTail, ...coords]
        : coords;
    syncSnakeCoordinatesMap(); // Function to create a set from snake body coordinates
};

// food ball 
const populateFoodBall = async () => {
  const row = Math.floor(Math.random() * ROWs);
  const col = Math.floor(Math.random() * COLs);

  foodCoords.current = {
      row,
      col,
  };
};

// collition check 
const collisionCheck = (snakeHead) => {
  // Check wall collision
  if (
      snakeHead.col >= COLs ||
      snakeHead.row >= ROWs ||
      snakeHead.col < 0 ||
      snakeHead.row < 0
  ) {
      return true;
  }

  // Check body collision
  const coordsKey = `${snakeHead.row}:${snakeHead.col}`;
  if (snakeCoordinatesMap.current.has(coordsKey)) {
      return true;
  }
};


// start stop
const startGame = async () => {
  const interval = setInterval(() => {
      moveSnake();
  }, 100);

  timer.current = interval;
};

const stopGame = async () => {
  setGameOver(true);
  setPlaying(false);
  if (timer.current) {
      clearInterval(timer.current);
  }
};


// callback
const getCell = useCallback(
  (row_idx, col_idx) => {
      const coords = `${row_idx}:${col_idx}`;
      const foodPos = `${foodCoords.current.row}:${foodCoords.current.col}`;
      const head =
          snakeCoordinates.current[snakeCoordinates.current.length - 1];
      const headPos = `${head?.row}:${head?.col}`;

      const isFood = coords === foodPos;
      const isSnakeBody = snakeCoordinatesMap.current.has(coords);
      const isHead = headPos === coords;

      let className = styles.grid;
      if (isFood) {
        let food = StyleSheet.compose(className, styles.food)
        className = food;
      }
      if (isSnakeBody) {
        // className += " body";
        let body = StyleSheet.compose(className, styles.body)
        className = body;
      }
      if (isHead) {
        // className += " head";
        let body = StyleSheet.compose(className, styles.body)
        className = body;
      }

      // return <Item key={coords} style={`${className}`} title={coords}></Item>;
      return <Item key={coords} style={`${className}`} ></Item>;
  },
  [isPlaying]
);

// return (
//   <div className="app-container">
//       {gameOver ? (
//           <p className="game-over">GAME OVER</p>
//       ) : (
//           <button onClick={isPlaying ? stopGame : startGame}>
//               {isPlaying ? "STOP" : "START"} GAME
//           </button>
//       )}
//       <div className="board">
//           {grid.current?.map((row, row_idx) => (
//               <div key={row_idx} className="row">
//                   {row.map((_, col_idx) => getCell(row_idx, col_idx))}
//               </div>
//           ))}
//       </div>
//       <p className="score">SCORE {points}</p>
        // <div className="keys-container">
        //     <button onClick={() => handleDirectionChange("ArrowUp")}>
        //         UP
        //     </button>
        //     <div className="key-row">
        //         <button onClick={() => handleDirectionChange("ArrowLeft")}>
        //             LEFT
        //         </button>
        //         <button onClick={() => handleDirectionChange("ArrowRight")}>
        //             RIGHT
        //         </button>
        //     </div>
        //     <button onClick={() => handleDirectionChange("ArrowDown")}>
        //         DOWN
        //     </button>
        // </div>
//   </div>
// );


  return (
    <SafeAreaView style={styles.container}>
    {/* <View>
      <Text style={styles.title}>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <Link style={{
        color:"green",
        }} href="/details">View details</Link>

      <Button
        title="Press me"
        color="#f194ff"
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      ></Button>
      <Link  style={{
        color:"red",
      }} href="/notFound">Page not found</Link>
    </View> */}
    <Separator />
    <View>
    <View>
      <Text >{isPlaying}</Text>
      <Text >{grid.current}</Text>
      {gameOver ? (
          <Text className="game-over">GAME OVER</Text>
      ) : (
        <Text>

          <Button 
          title={isPlaying ? "STOP" : "START"} 
          onPress={isPlaying ? stopGame : startGame}>
              {isPlaying ? "STOP" : "START"} GAME
          </Button>
        </Text>
      )}
    </View>
    <View style={styles.flexContainer}>
      {grid.current?.map((row, row_idx) => (
        // <View key={row_idx} className="row" title={row_idx}  >
        <View key={row_idx} className="row"  >
          {row.map((_, col_idx) => getCell(row_idx, col_idx))}
        </View>
      ))}
    </View>
    </View>
    <Separator />


    {/* <View>
      <Text style={styles.title}>
        This layout strategy lets the title define the width of the button.
      </Text>
      <View style={styles.fixToText}>
        <Button
          title="Left button"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="Right button"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View> */}
    </SafeAreaView>
  );
}

const Separator = () => <View style={styles.separator} />;
// type ItemProps = {title: string};
// const Item = ({title}: ItemProps) => (
const Item = ({title}) => (
  <View style={styles.grid}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  flexWrap:'wrap',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  grid: {
    // backgroundColor: '#f9c2ff',
    backgroundColor: 'beige',
    borderColor: '#bbbbbb',
    borderWidth: 1,
    borderRadius: 5,

    justifyContent: 'center',
    width: 7,
    height: 7,
    // marginVertical: 10,
    // marginHorizontal: 4,
  },
  // .cell {
  //   width: 8px;
  //   height: 8px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   border: 1px dotted #161616;
  // }
  food: {
    backgroundColor: '#00e244',
    zIndex: 10,
    borderColor: '#00e244',
    // borderRadius: 50%,
    borderRadius: 50,
    boxShadow: '0px 0px 2px 2px #00e244',
    animation: 'glowfood 1.5s linear infinite alternate',
  },
  head: {
    backgroundColor: '#00eeee',
    zIndex: 12,
    borderColor: '#00eeee',
    borderRadius: 50,
  },
  body: {
    backgroundColor: '#3842ff',
    borderColor: '#3842ff',
  },
});