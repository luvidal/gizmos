import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../common/icon'

interface ToolBackProps {
    icon: string
    label?: string
    onClick: () => void
    variant?: 'dark' | 'light'
}

const Tooltip = ({ label, btnRef }: { label: string; btnRef: React.RefObject<HTMLButtonElement | null> }) => {
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

    useEffect(() => {
        const el = btnRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        setPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 })
    }, [btnRef])

    if (!pos) return null

    return createPortal(
        <span
            className='fixed pointer-events-none z-50 px-2 py-0.5 rounded text-[11px] whitespace-nowrap bg-gray-900 text-white shadow-lg -translate-x-1/2'
            style={{ top: pos.top, left: pos.left }}
        >
            {label}
        </span>,
        document.body
    )
}

const ToolBack = ({ icon, label = 'Volver', onClick, variant = 'light' }: ToolBackProps) => {
    const [hovered, setHovered] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)

    const variantStyles = variant === 'light'
        ? 'bg-theme-100 hover:bg-theme-200 text-theme-700 hover:text-theme-800'
        : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'

    return (
        <button
            ref={btnRef}
            onClick={e => {
                e.stopPropagation()
                onClick()
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={label}
            className={`
                flex items-center justify-center gap-0.5 h-9 px-2
                ${variantStyles}
                backdrop-blur-sm transition-all duration-200
                rounded-btn
            `}
        >
            <Icon name='ChevronLeft' size={16} className={variant === 'dark' ? 'icon-shadow-sm' : ''} />
            <Icon name={icon} size={16} className={variant === 'dark' ? 'icon-shadow-sm' : ''} />
            {hovered && <Tooltip label={label} btnRef={btnRef} />}
        </button>
    )
}

export default ToolBack
