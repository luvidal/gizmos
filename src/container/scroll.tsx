interface ScrollProps {
    children?: React.ReactNode
    className?: string
    grid?: boolean
}

export const Scroll = ({ children, className = '', grid = false }: ScrollProps) => {
    const layout = grid ? 'grid gap-[3%] p-[3%] lg:grid-cols-12' : ''

    return (
        <div className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col ${layout} ${className}`}>
            {children}
        </div>
    )
}

export default Scroll