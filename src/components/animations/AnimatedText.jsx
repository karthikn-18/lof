import { motion } from 'framer-motion';

const AnimatedText = ({ words }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div className="animated-text" variants={container} initial="hidden" animate="visible">
      {words.split(' ').map((word, index) => (
        <motion.span key={`${word}-${index}`} className="animated-word" variants={item}>
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
