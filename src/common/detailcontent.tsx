import { ReactNode } from 'react'

interface DetailContentProps {
  children: ReactNode
  className?: string
}

export default function DetailContent({ children, className = '' }: DetailContentProps) {
  return (
    <div className={`flex-1 min-h-0 overflow-auto ${className}`}>
      {children}
    </div>
  )
}
