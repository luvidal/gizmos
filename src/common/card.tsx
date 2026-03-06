interface PropsCard {
    title: string
    subtitle?: string
    children?: React.ReactNode
    colSpan?: number
}

const Card = ({ title, subtitle, children, colSpan = 6 }: PropsCard) => {
    const colClass = {
        12: 'sm:col-span-12 md:col-span-12 lg:col-span-12',
        8: 'sm:col-span-12 md:col-span-8 lg:col-span-8',
        6: 'sm:col-span-12 md:col-span-6 lg:col-span-6',
        4: 'sm:col-span-6 md:col-span-6 lg:col-span-4',
        3: 'sm:col-span-6 md:col-span-4 lg:col-span-3',
    }[colSpan] || 'sm:col-span-12 md:col-span-6 lg:col-span-6'

    return (
        <div className={`flex flex-col h-96 bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 ${colClass} transition-all duration-300`}>
            <div className='flex-shrink-0 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl font-bold text-theme-700 mb-4 whitespace-nowrap overflow-hidden text-ellipsis'>
                {title}
                {subtitle && (
                    <div className='text-base sm:text-md md:text-md lg:text-base xl:text-lg font-semibold text-theme-500 mt-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                        {subtitle}
                    </div>
                )}
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto'>
                {children}
            </div>
        </div>
    )
}

export default Card