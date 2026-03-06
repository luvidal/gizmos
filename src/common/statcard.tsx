import Icon from './icon'

interface StatCardProps {
    label: string
    value: string | number
    icon: string
    subtitle?: string
    trend?: { value: number; label: string }
    color?: 'default' | 'success' | 'warning' | 'danger'
    onClick?: () => void
}

const colorMap = {
    default: { bg: 'bg-gray-50', text: 'text-gray-600', icon: 'text-gray-400' },
    success: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'text-emerald-400' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-400' },
    danger: { bg: 'bg-rose-50', text: 'text-rose-600', icon: 'text-rose-400' },
}

export default function StatCard({ label, value, icon, subtitle, trend, color = 'default', onClick }: StatCardProps) {
    const colors = colorMap[color]

    return (
        <div
            onClick={onClick}
            className={`relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className='flex items-start justify-between'>
                <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-500 truncate'>{label}</p>
                    <p className='mt-1 text-3xl font-bold text-theme-700'>{value}</p>
                    {subtitle && <p className='mt-1 text-xs text-gray-400'>{subtitle}</p>}
                    {trend && (
                        <div className='mt-2 flex items-center gap-1'>
                            <Icon name={trend.value >= 0 ? 'TrendingUp' : 'TrendingDown'} size={14} className={trend.value >= 0 ? 'text-emerald-500' : 'text-rose-500'} />
                            <span className={`text-xs font-medium ${trend.value >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {trend.value >= 0 ? '+' : ''}{trend.value}%
                            </span>
                            <span className='text-xs text-gray-400'>{trend.label}</span>
                        </div>
                    )}
                </div>
                <div className={`${colors.bg} rounded-xl p-3`}>
                    <Icon name={icon} size={24} className={colors.icon} />
                </div>
            </div>
        </div>
    )
}
