import Icon from './common/icon'

interface PillTagProps {
    children: React.ReactNode
    onRemove?: () => void
    grip?: boolean
}

const PillTag = ({ children, onRemove, grip }: PillTagProps) => (
    <div className='inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-700'>
        {grip && <Icon name='GripVertical' size={12} className='text-gray-400' />}
        <span className='truncate'>{children}</span>
        {onRemove && <button onClick={onRemove} className='hover:text-red-500 transition-all'><Icon name='X' size={12} /></button>}
    </div>
)

export default PillTag
