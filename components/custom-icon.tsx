import Image from "next/image"

interface CustomIconProps {
  src: string
  alt: string
  size?: number
}

export function CustomIcon({ src, alt, size = 32 }: CustomIconProps) {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={size} height={size} className="object-contain" />
    </div>
  )
}
