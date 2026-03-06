import { ReactNode } from 'react'
import ToolTip from '../common/tooltip'

interface FieldWrapperProps {
    label?: string
    tooltip?: string
    className?: string
    visible?: boolean
    children: ReactNode
}

export default function FieldWrapper({ label, tooltip, className = '', visible = true, children }: FieldWrapperProps) {
    if (!visible) return null

    return (
        <div className={`mb-2 ${className}`}>
            {(label || tooltip) && (
                <div className='flex items-center'>
                    {label && <span className='text-gray-500 text-sm'>{label}</span>}
                    {tooltip && <ToolTip text={tooltip} />}
                </div>
            )}
            {children}
        </div>
    )
}
