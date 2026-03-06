interface LabelProps {
    text: string
    className?: string
    visible?: boolean
}

const Label = ({ text, className = '', visible = true }: LabelProps) => {
    if (!visible) return null

    return (
        <div className={`flex items-center justify-center px-4 min-w-[2.5rem] h-9 bg-white/10 text-white font-semibold text-sm ${className}`}>
            {text}
        </div>
    )
}

export default Label
