import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ButtonHTMLAttributes, MouseEventHandler } from 'react'
import Icon from '../common/icon'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    icon: string
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
    visible?: boolean
    active?: boolean
    blink?: boolean
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

const ToolbarButton = ({
    icon,
    label,
    visible = true,
    onClick,
    active = false,
    blink = false,
    variant = 'dark',
    className = '',
    disabled,
    ...rest
}: ButtonProps) => {
    const [blinkActive, setBlinkActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!blink) return
        const i = setInterval(() => setBlinkActive(a => !a), 600)
        return () => clearInterval(i)
    }, [blink])

    if (!visible) return null

    const disabledEffect = disabled ? 'opacity-40 blur-[0.5px]' : ''

    const variantStyles = variant === 'light'
        ? 'bg-white hover:bg-gray-50 text-theme-700 hover:text-theme-800'
        : 'bg-white/10 hover:bg-white/15 text-white/80 hover:text-white'

    const activeStyles = variant === 'light'
        ? 'bg-gray-100 text-theme-600'
        : 'bg-white/20 text-white'

    return (
        <button
            {...rest}
            ref={btnRef}
            disabled={disabled}
            onClick={e => {
                e.stopPropagation()
                onClick?.(e)
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label={label}
            className={`
                flex items-center justify-center h-9 px-3
                ${variantStyles}
                backdrop-blur-sm transition-all duration-200
                first:rounded-l-btn last:rounded-r-btn
                ${active ? activeStyles : ''}
                ${blinkActive ? 'opacity-30' : ''}
                ${disabled ? 'cursor-not-allowed' : ''}
                ${className}
            `}
        >
            <Icon name={icon} size={16} className={`${variant === 'dark' ? 'icon-shadow-sm' : ''} ${disabledEffect}`} />
            {hovered && <Tooltip label={label} btnRef={btnRef} />}
        </button>
    )
}

export default ToolbarButton
