import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingWord.css';

const words = ['Certification', 'Inspection', 'Testing'];
const FAST_INTERVAL = 2500;
const SLOW_INTERVAL = 5000;
const STAGGER = 0.03;

const letterVariants = {
  initial: { y: '110%' },
  animate: (i) => ({
    y: '0%',
    transition: {
      duration: 0.4,
      delay: i * STAGGER,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i) => ({
    y: '-110%',
    transition: {
      duration: 0.3,
      delay: i * STAGGER,
      ease: [0.55, 0, 1, 0.45],
    },
  }),
};

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const step = useRef(0);

  useEffect(() => {
    const tick = () => {
      step.current += 1;
      setIndex((prev) => (prev + 1) % words.length);
      const delay = step.current >= words.length ? SLOW_INTERVAL : FAST_INTERVAL;
      timeoutId = setTimeout(tick, delay);
    };

    let timeoutId = setTimeout(tick, FAST_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, []);

  const word = words[index];

  return (
    <span className="rotating-word-wrapper" aria-label={word}>
      <AnimatePresence mode="wait">
        <motion.span key={word} className="rotating-word" aria-hidden="true">
          {word.split('').map((char, i) => (
            <span key={`${word}-${i}`} className="letter-clip">
              <motion.span
                className="rotating-letter"
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default RotatingWord;
