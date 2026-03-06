import React, { useState } from 'react'
import Icon from '../common/icon'

type CollapsiblePanelProps = {
  title: string
  icon: string
  iconColor?: string
  defaultOpen?: boolean
  maxHeight?: number
  children: React.ReactNode
}

const CollapsiblePanel = ({
  title,
  icon,
  iconColor = 'text-gray-500',
  defaultOpen = true,
  maxHeight,
  children,
}: CollapsiblePanelProps) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-3">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <h4 className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
          <Icon name={icon} size={12} className={iconColor} />
          {title}
        </h4>
        <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={14} className="text-gray-400" />
      </button>
      {open && (
        <div className="p-3 overflow-y-auto" style={maxHeight ? { maxHeight } : undefined}>
          {children}
        </div>
      )}
    </div>
  )
}

type DataRowProps = {
  label: string
  value: React.ReactNode
}

const DataRow = ({ label, value }: DataRowProps) => {
  const displayValue = value ?? '—'
  const titleValue = typeof value === 'string' ? value : undefined

  return (
    <div className="py-1.5 border-b border-gray-100 last:border-0">
      <div className="text-[10px] text-gray-500 capitalize">{label.replace(/_/g, ' ')}</div>
      <div className="text-xs text-gray-900 truncate" title={titleValue}>
        {displayValue || <span className="text-gray-400">—</span>}
      </div>
    </div>
  )
}

type TablePanelProps = {
  title: string
  icon: string
  iconColor?: string
  defaultOpen?: boolean
  maxHeight?: number
  data: Array<{ label: string; value: string | React.ReactNode }>
  emptyContent?: React.ReactNode
}

export const TablePanel = ({
  title,
  icon,
  iconColor = 'text-gray-500',
  defaultOpen = false,
  maxHeight = 200,
  data,
  emptyContent,
}: TablePanelProps) => (
  <CollapsiblePanel
    title={title}
    icon={icon}
    iconColor={iconColor}
    defaultOpen={defaultOpen}
    maxHeight={maxHeight}
  >
    {data.length > 0
      ? data.map((row, i) => <DataRow key={i} label={row.label} value={row.value} />)
      : emptyContent || <p className="text-xs text-gray-400">Sin datos</p>}
  </CollapsiblePanel>
)

export default TablePanel
