
import { motion } from 'framer-motion';
const Score = ({ score,chance }) => {


  if (chance<=0) {return <>
  <motion.h1 animate={{ rotateZ:360,}}>Final score:{score} 😁😁</motion.h1></>;  }

    return (
      <div className="score-board" style ={{backgroundColor:'invisible'} }>
        <div style={{ fontWeight: 'bold' }}>Game score:</div>
        <h1>{score}</h1>
        <div style={{ fontWeight: 'bold' }}>Total chance:</div>
        <h1>{chance}</h1>
      </div>

    )
    };

  export default Score;