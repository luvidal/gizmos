import { useState, useEffect, ReactNode } from 'react'
import Icon from '../common/icon'

export interface Tab {
    id: string
    label: string
    /** Shorter label shown on mobile (sm breakpoint and below) */
    shortLabel?: string
    icon?: string
    content?: ReactNode
}

export type { Tab as TabType }

interface TabsProps {
    tabs: Tab[]
    activeTab?: string
    onChange?: (tabId: string) => void
    onRefresh?: (tabId: string) => void
    children?: ReactNode
    className?: string
}

const Tabs = ({
    tabs,
    activeTab: controlledActive,
    onChange,
    onRefresh,
    children,
    className = ''
}: TabsProps) => {
    const [internalActive, setInternalActive] = useState(tabs[0]?.id || '')
    const activeId = controlledActive ?? internalActive

    useEffect(() => {
        if (tabs.length > 0 && !tabs.some(t => t.id === activeId)) {
            const newActive = tabs[0].id
            setInternalActive(newActive)
            onChange?.(newActive)
        }
    }, [tabs, activeId])

    const handleTabClick = (tabId: string) => {
        if (tabId === activeId) {
            onRefresh?.(tabId)
        } else {
            if (controlledActive === undefined) {
                setInternalActive(tabId)
            }
            onChange?.(tabId)
        }
    }

    const activeContent = tabs.find(t => t.id === activeId)?.content

    if (tabs.length === 0) return null

    return (
        <div className={className}>
            <div className="flex flex-shrink-0">
                {tabs.map(tab => {
                    const isActive = activeId === tab.id
                    return (
                        <button
                            key={tab.id}
                            onClick={(e) => { e.stopPropagation(); handleTabClick(tab.id) }}
                            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold py-3 sm:py-4 px-2 sm:px-4 md:px-5 truncate whitespace-nowrap overflow-hidden transition-all duration-200 md:first:rounded-tl-btn md:last:rounded-tr-btn ${isActive
                                ? 'text-theme-700 bg-white'
                                : 'text-gray-300 bg-gray-50 hover:text-gray-400 hover:bg-gray-100'
                                }`}
                        >
                            {tab.icon && <Icon name={tab.icon} size={16} className={`flex-shrink-0 ${isActive ? 'text-theme-500' : 'text-gray-300'}`} />}
                            <span className='truncate'>{tab.shortLabel ? (<><span className="sm:hidden">{tab.shortLabel}</span><span className="hidden sm:inline">{tab.label}</span></>) : tab.label}</span>
                        </button>
                    )
                })}
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                {children ?? activeContent}
            </div>
        </div>
    )
}

export default Tabs
