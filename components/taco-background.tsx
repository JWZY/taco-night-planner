"use client"

import { useEffect, useRef } from "react"

export function TacoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawTacos()
    }

    // Draw taco emojis in an evenly distributed grid
    const drawTacos = () => {
      ctx.fillStyle = "#FFCC80" // Light orange background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const tacoEmoji = "🌮"
      ctx.font = "40px Arial"

      // Calculate grid dimensions for even distribution
      const emojiSize = 60 // Size of each emoji with padding
      const cols = Math.floor(canvas.width / emojiSize)
      const rows = Math.floor(canvas.height / emojiSize)

      // Draw tacos in a grid pattern with random rotations
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Add some randomness to position within the cell
          const x = col * emojiSize + Math.random() * 10
          const y = row * emojiSize + Math.random() * 10
          const rotation = Math.random() * Math.PI * 2 // Random rotation between 0 and 2π

          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation)
          ctx.globalAlpha = 0.2 // Make the tacos semi-transparent
          ctx.fillText(tacoEmoji, 0, 0)
          ctx.restore()
        }
      }
    }

    // Initial setup
    resizeCanvas()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-20" style={{ pointerEvents: "none" }} />
}
