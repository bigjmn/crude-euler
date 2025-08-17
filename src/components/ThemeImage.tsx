'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ThemeImageProps {
  src: string
  darkSrc: string
  alt: string
  className?: string
  [key: string]: any
}

export function ThemeImage({ src, darkSrc, alt, className, ...props }: ThemeImageProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Image src={src} alt={alt} className={className} {...props} />
  }

  const imageSrc = resolvedTheme === 'dark' ? darkSrc : src

  return <Image src={imageSrc} alt={alt} className={className} {...props} />
}