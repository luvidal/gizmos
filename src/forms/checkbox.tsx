import Icon from '../common/icon'

interface Props {
  label: string
  checked: boolean
  className?: string
  onChange: (checked: boolean) => void
}

const Checkbox = ({ label, checked, className = '', onChange }: Props) => {
  return (
    <button
      type='button'
      role='checkbox'
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`group flex items-center gap-3 cursor-pointer select-none ${className}`}
    >
      <span className={`flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all duration-200 ${
        checked
          ? 'bg-theme-600 border-theme-600'
          : 'bg-white border-gray-300 group-hover:border-theme-400'
      }`}>
        {checked && <Icon name='Check' size={14} className='text-white' strokeWidth={3} />}
      </span>
      <span className='text-sm text-gray-700 group-hover:text-gray-900 transition-colors'>{label}</span>
    </button>
  )
}

export default Checkbox
