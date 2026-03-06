interface ButtonGroupProps {
    children?: React.ReactNode
    className?: string
    visible?: boolean
    /** Visual variant — dark for teal/colored headers, light for white backgrounds */
    variant?: 'dark' | 'light'
}

const ButtonGroup = ({ children, className = '', visible = true, variant = 'dark' }: ButtonGroupProps) => {
    if (!visible) return null

    const bg = variant === 'dark'
        ? 'bg-white/10'
        : 'bg-gray-200 shadow-sm'

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`flex gap-px ${bg} rounded-btn p-px overflow-hidden ${className}`}
        >
            {children}
        </div>
    )
}

export default ButtonGroup
