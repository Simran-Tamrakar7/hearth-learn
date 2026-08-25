export const meta = {
  id: "framer-springs",
  title: "Damped Spring Motion Tokens",
  description: "Natural, tactile physics spring configurations for Framer Motion transitions.",
  icon: "zap",
  category: "Product Design",
};

export const snippet = `// Gentle Card Hover
export const cardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

// Micro Button Press Feedback
export const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 500, damping: 25 },
};`;
