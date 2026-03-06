import Icon from '../common/icon'

type Variant = 'primary' | 'glass' | 'danger' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string
    text?: string
    variant?: Variant
    size?: Size
    active?: boolean
    /** Shows inline spinner and disables interaction */
    loading?: boolean
}

const sizeConfig = {
    sm: { cls: 'h-8 px-3 text-xs gap-1.5', icon: 14 },
    md: { cls: 'h-10 px-5 text-sm gap-2', icon: 16 },
    lg: { cls: 'h-12 px-6 text-base gap-2.5', icon: 18 },
}

const variantStyles: Record<Variant, (active: boolean, disabled: boolean) => string> = {
    primary: (_a, d) =>
        `bg-theme-700 hover:bg-theme-600 text-white shadow-lg hover:shadow-xl ${d ? 'cursor-not-allowed' : ''}`,
    glass: (a, d) =>
        `${a ? 'bg-white/20 text-white' : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'} ${d ? 'cursor-not-allowed' : ''}`,
    danger: (_a, d) =>
        `bg-rose-600 hover:bg-rose-700 text-white shadow-lg hover:shadow-xl ${d ? 'cursor-not-allowed' : ''}`,
    outline: (_a, d) =>
        `border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white ${d ? 'cursor-not-allowed' : ''}`,
    ghost: (_a, d) =>
        `text-gray-600 hover:bg-gray-100 ${d ? 'cursor-not-allowed' : ''}`,
}

const Button = ({ icon, text, variant = 'primary', size = 'md', active = false, loading = false, className = '', ...props }: ButtonProps) => {
    const isDisabled = props.disabled || loading
    const sz = sizeConfig[size]
    const base = 'flex items-center justify-center transition-all duration-200 backdrop-blur-sm rounded-btn active:scale-[0.98]'
    const disabledEffect = isDisabled ? 'opacity-40 blur-[0.5px]' : ''

    return (
        <button className={`${base} ${sz.cls} ${variantStyles[variant](active, isDisabled)} ${className}`} {...props} disabled={isDisabled}>
            {loading ? (
                <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            ) : (
                icon && <Icon name={icon} size={sz.icon} className={`text-shadow-sm ${disabledEffect}`} />
            )}
            {text && <span className={`text-shadow-sm truncate font-semibold uppercase tracking-wide ${disabledEffect}`}>{text}</span>}
        </button>
    )
}

export default Button
