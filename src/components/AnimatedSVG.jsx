import { motion } from 'framer-motion'

function AnimatedSVG() {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileInView={{ rotate: [0, 15, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ee7652e0" />
          <stop offset="33%" stopColor="#e73c7ec4" />
          <stop offset="67%" stopColor="#23a5d5d4" />
          <stop offset="100%" stopColor="#23d5abda" />
        </linearGradient>
      </defs>
      <motion.path
        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
        fill="url(#gradient1)"
      />
    </motion.svg>
  )
}

export default AnimatedSVG
