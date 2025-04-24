"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Taco {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
}

interface TacoBackgroundProps {
  isChaosMode: boolean
  tacoCount?: number // Optional prop to control density
}

// Function to generate initial taco positions in a grid-like fashion
const generateTacos = (width: number, height: number, count: number): Taco[] => {
  const tacos: Taco[] = []
  const emojiSize = 60 // Approximate size for distribution calculation
  const cols = Math.max(1, Math.floor(width / emojiSize))
  const rows = Math.max(1, Math.floor(height / emojiSize))
  const cellWidth = width / cols
  const cellHeight = height / rows

  for (let i = 0; i < count; i++) {
    // Distribute somewhat evenly but with randomness
    const col = i % cols
    const row = Math.floor(i / cols) % rows

    tacos.push({
      id: i,
      // Random position within its approximate grid cell
      x: col * cellWidth + Math.random() * cellWidth,
      y: row * cellHeight + Math.random() * cellHeight,
      rotation: Math.random() * 360, // Random rotation
      scale: 0.8 + Math.random() * 0.4, // Random scale (80% to 120%)
    })
  }
  return tacos
}

export function TacoBackground({ isChaosMode, tacoCount = 50 }: TacoBackgroundProps) {
  const [tacos, setTacos] = useState<Taco[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [eatenTacos, setEatenTacos] = useState<Set<number>>(new Set());

  // Get window dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDimensions() // Initial dimensions
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Generate tacos when dimensions are known
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setTacos(generateTacos(dimensions.width, dimensions.height, tacoCount))
    }
  }, [dimensions, tacoCount])

  // Function to handle clicking a taco
  const handleTacoClick = (tacoId: number) => {
    setEatenTacos(prev => new Set(prev).add(tacoId));
  };

  // Define animation variants
  const tacoVariants = {
    initial: (taco: Taco) => ({
      x: taco.x,
      y: taco.y,
      rotate: taco.rotation,
      scale: taco.scale,
      opacity: 0.2,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 } // Spring back to initial
    }),
    // Chaos variant: gentle random bouncing/drifting
    chaos: (taco: Taco) => ({
      x: Math.random() * dimensions.width, // Move to random x
      y: Math.random() * dimensions.height, // Move to random y
      rotate: taco.rotation + (Math.random() - 0.5) * 180, // Add some slow rotation
      scale: taco.scale * (1.8 + Math.random() * 0.4), // Increase size to 180%-220% of initial
      opacity: 0.8 + Math.random() * 0.2, // Increase opacity to 0.8-1.0
      transition: {
        duration: 2 + Math.random() * 2, // Slower duration (5-10s)
        repeat: Infinity,
        repeatType: "reverse", // Move back and forth
        ease: "easeInOut",
      },
    }),
    // Eaten variant: shrink and fade away
    eaten: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    },
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-amber-100 z-[-1]">
      {tacos.map((taco) => (
        <motion.div
          key={taco.id}
          custom={taco} // Pass taco data to variants
          variants={tacoVariants}
          initial="initial"
          animate={eatenTacos.has(taco.id) ? "eaten" : (isChaosMode ? "chaos" : "initial")}
          onClick={() => isChaosMode && handleTacoClick(taco.id)} // Only clickable in chaos mode
          style={{
            position: 'absolute',
            left: 0, // Initial left/top set to 0, framer-motion handles position via x/y
            top: 0,
            fontSize: '40px', // Adjust size as needed
            willChange: 'transform, opacity', // Performance hint
            cursor: isChaosMode ? 'pointer' : 'default', // Show pointer cursor in chaos mode
          }}
        >
          🌮
        </motion.div>
      ))}
    </div>
  )
}
