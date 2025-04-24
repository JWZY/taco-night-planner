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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Ref for the container div to calculate relative mouse position if needed
  const containerRef = useRef<HTMLDivElement>(null);

  // Get window dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDimensions() // Initial dimensions
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Calculate position relative to the container if needed, otherwise use clientX/Y
      // For simplicity, using clientX/Y assuming the background covers the viewport
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate tacos when dimensions are known
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setTacos(generateTacos(dimensions.width, dimensions.height, tacoCount))
    }
  }, [dimensions, tacoCount])

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
    // Chaos variant: swarm towards mouse
    chaos: (taco: Taco) => {
      // Add a random offset to the mouse position for the swarm effect
      const offsetX = (Math.random() - 0.5) * 150; // Spread out +/- 75px
      const offsetY = (Math.random() - 0.5) * 150;

      return {
        x: mousePosition.x + offsetX,
        y: mousePosition.y + offsetY,
        rotate: Math.random() * 360, // Keep some rotation
        scale: 1 + Math.random() * 0.3, // Slightly larger
        opacity: 0.5 + Math.random() * 0.3,
        transition: {
          type: "spring",
          stiffness: 50 + Math.random() * 50, // Vary stiffness for more organic movement
          damping: 15 + Math.random() * 10,  // Vary damping
          // No repeat, they just constantly spring towards the cursor
        },
      };
    },
  }

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-amber-100">
      {tacos.map((taco) => (
        <motion.div
          key={taco.id}
          custom={taco} // Pass taco data to variants
          variants={tacoVariants}
          initial="initial"
          animate={isChaosMode ? "chaos" : "initial"}
          style={{
            position: 'absolute',
            left: 0, // Initial left/top set to 0, framer-motion handles position via x/y
            top: 0,
            fontSize: '40px', // Adjust size as needed
            willChange: 'transform, opacity', // Performance hint
          }}
        >
          🌮
        </motion.div>
      ))}
    </div>
  )
}
