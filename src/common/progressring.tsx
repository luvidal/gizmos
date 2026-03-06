interface Props {
    progress: number
    size?: number
    /** Light variant for dark backgrounds (sidebar) */
    light?: boolean
}

const ProgressRing = ({ progress, size = 36, light = false }: Props) => {
    const strokeWidth = light ? 2.5 : 3
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference

    return (
        <div className='relative flex items-center justify-center flex-shrink-0'>
            <svg width={size} height={size} className='transform -rotate-90'>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    fill='none'
                    className={light ? 'text-white/15' : 'text-theme-200'}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke='currentColor'
                    strokeWidth={strokeWidth}
                    fill='none'
                    strokeLinecap='round'
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={light ? 'text-white transition-all duration-500 ease-out' : 'text-theme-500 transition-all duration-500 ease-out'}
                />
            </svg>
            <span className={`absolute font-bold ${light ? 'text-[9px] text-white' : 'text-[10px] text-theme-700'}`}>
                {progress}%
            </span>
        </div>
    )
}

export default ProgressRing
