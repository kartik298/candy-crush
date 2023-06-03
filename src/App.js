import React from 'react';
import './style.css';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import blueCandy from './Images/blue-candy.png'
import greenCandy from './Images/green-candy.png'
import orangeCandy from './Images/orange-candy.png'
import purpleCandy from './Images/purple-candy.png'
import redCandy from './Images/red-candy.png'
import yellowCandy from './Images/yellow-candy.png'
import blank from './Images/blank.png'
import backGround from './Images/background2.jpg'
import ScoreBoard from './Component/Score';
const width = 8;

const divVariants = {
  initial: {
    opacity: 0,
    x: '-100%',
    y: '-100%',
    rotateZ:360,
  },
  animate: {
    opacity: 1.2,
    x:400,
    y: 60,
    transition: {
      duration: 0.8
    }
  }
};
const candyColours = [blueCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
  greenCandy];
const App = () => {
  const [currentColour, setCurrentColour] = useState([]);
  const [score,setScore]=useState(0);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [totalChance,setTotalChance]=useState(10);
  const createBoard = () => {
    const board = [];
    for (let i = 0; i < width * width; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)];
      board.push(randomColour);
    }
    console.log(board);
    setCurrentColour(board);
    console.log(currentColour);
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColour[i] === '') {
        let randomNumber = Math.floor(Math.random() * candyColours.length);
        currentColour[i] = candyColours[randomNumber];
      }

      if (currentColour[i + width] === '') {
        currentColour[i + width] = currentColour[i];
        currentColour[i] = '';
      }
    }
  };
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColour[i];
      const isBlank = currentColour[i] ===''
      if (
        columnOfFour.every((square) => currentColour[square] === decidedColor&&!isBlank)
      ) {
        setScore((score)=>score+4);
        columnOfFour.forEach((square) => (currentColour[square] = ''));

        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColour[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      const isBlank = currentColour[i] ===''
      if (notValid.includes(i)) continue;

      if (rowOfFour.every((square) => currentColour[square] === decidedColor&&!isBlank)) {
        setScore((score)=>score+4);
        rowOfFour.forEach((square) => (currentColour[square] = ''));

        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColour[i];
      const isBlank = currentColour[i] ===''
      if (
        columnOfThree.every((square) => currentColour[square] === decidedColor&&!isBlank)
      ) {
        setScore((score)=>score+3);
        columnOfThree.forEach((square) => (currentColour[square] = ''));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColour[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      const isBlank = currentColour[i] === ''
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every((square) => currentColour[square] === decidedColor&&!isBlank)
      ) {
        setScore((score)=>score+3);
        rowOfThree.forEach((square) => (currentColour[square] = ''));
        return true;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
}
const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
}

  useEffect(() => {
    createBoard();
    setScore(0);
  }, []);

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColour[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColour[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    const validMoves = [
        squareBeingDraggedId - 1,
        squareBeingDraggedId - width,
        squareBeingDraggedId + 1,
        squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId &&
        validMove &&
        (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
          setTotalChance((totalChance)=>totalChance-1);
        setSquareBeingDragged(null)
        setSquareBeingReplaced(null)
    } else {
        currentColour[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
        currentColour[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')

        setCurrentColour([...currentColour])

    }
}

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColour([...currentColour]);
    }, 20);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,moveIntoSquareBelow,totalChance,
    currentColour]);

  return (
    <div>

    <motion.div className="app"  style={{ backgroundImage: `url(${backGround})`,backgroundSize:'cover',height:'530px'}} >
    <ScoreBoard score={score} chance={totalChance}></ScoreBoard>

      <motion.div className="game"initial="initial"
        animate="animate"
        variants={divVariants}>
        {currentColour.map((candycolour, index) => (
          <motion.img

          key={index}
          src={candycolour}
          alt={candycolour}
          data-id={index}
          draggable={true}

          onDragStart={dragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1}}
            whileHover={{
              scale: 1.5,
              rotate: 360,
              transition: { duration: 1 },
            }}
            style={{ backgroundColor: candycolour }}
          />
        ))}
      </motion.div>
    </motion.div>
   </div>
  );
};


export default App;