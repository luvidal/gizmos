

import { useState } from 'react'
import Icon from './icon'

interface SidebarFilterProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

/** Compact filter input for dark sidebar */
export function SidebarFilter({ value, onChange, placeholder = 'Filtrar...' }: SidebarFilterProps) {
    return (
        <div className='flex items-center gap-2 bg-white/10 rounded-btn px-3 h-9'>
            <Icon name='Search' size={14} className='text-white/50' />
            <input
                type='text'
                defaultValue={value}
                onBlur={e => onChange(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { onChange(e.currentTarget.value); e.currentTarget.blur() } }}
                placeholder={placeholder}
                className='flex-1 min-w-0 bg-transparent text-sm text-white placeholder:text-white/40 border-none focus:ring-0 outline-none'
            />
        </div>
    )
}

interface SidebarSortProps {
    options: { value: string; label: string }[]
    value: string
    onChange: (value: string) => void
    direction: 'asc' | 'desc'
    onDirectionChange: (dir: 'asc' | 'desc') => void
}

/** Compact sort dropdown for dark sidebar */
export function SidebarSort({ options, value, onChange, direction, onDirectionChange }: SidebarSortProps) {
    return (
        <div className='flex items-center gap-2'>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className='flex-1 min-w-0 h-8 px-3 pr-8 text-xs bg-white/10 text-white rounded-btn border-none focus:ring-1 focus:ring-white/30 cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2712%27%20height%3D%2712%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27rgba(255%2C255%2C255%2C0.5)%27%20stroke-width%3D%272%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27%2F%3E%3C%2Fsvg%3E")] bg-no-repeat bg-[center_right_0.5rem]'
            >
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} className='bg-theme-700 text-white'>
                        {opt.label}
                    </option>
                ))}
            </select>
            <button
                onClick={() => onDirectionChange(direction === 'asc' ? 'desc' : 'asc')}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-white/10 hover:bg-white/20 transition-colors'
                title={direction === 'asc' ? 'Ascendente' : 'Descendente'}
            >
                <Icon
                    name={direction === 'asc' ? 'ArrowUp' : 'ArrowDown'}
                    size={14}
                    className='text-white/80'
                />
            </button>
        </div>
    )
}

interface SidebarPaginatorProps {
    page: number
    setPage: (page: number) => void
    hasNext: boolean
}

/** Compact paginator for dark sidebar - auto-hides when only one page */
export function SidebarPaginator({ page, setPage, hasNext }: SidebarPaginatorProps) {
    const hasPrev = page > 0

    // Hide paginator if on first page with no next page (single page of results)
    if (!hasPrev && !hasNext) return null

    return (
        <div className='flex items-center justify-between'>
            <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={!hasPrev}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
            >
                <Icon name='ChevronLeft' size={16} className='text-white' />
            </button>
            <span className='text-xs text-white/60'>
                Página {page + 1}
            </span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNext}
                className='h-8 w-8 flex items-center justify-center rounded-btn bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors'
            >
                <Icon name='ChevronRight' size={16} className='text-white' />
            </button>
        </div>
    )
}

interface SidebarControlsProps {
    // Filter
    search: string
    onSearchChange: (value: string) => void
    // Sort
    sortOptions: { value: string; label: string }[]
    sortBy: string
    onSortChange: (value: string) => void
    sortDir: 'asc' | 'desc'
    onSortDirChange: (dir: 'asc' | 'desc') => void
}

/** Collapsible sidebar controls - filter and sort */
export default function SidebarControls({
    search,
    onSearchChange,
    sortOptions,
    sortBy,
    onSortChange,
    sortDir,
    onSortDirChange
}: SidebarControlsProps) {
    const [expanded, setExpanded] = useState(false)

    const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || sortBy

    return (
        <div className='flex flex-col'>
            {/* Collapsed: show summary bar */}
            <button
                onClick={() => setExpanded(!expanded)}
                className='flex items-center justify-between gap-2 h-9 px-3 rounded-btn bg-white/10 hover:bg-white/15 transition-colors'
            >
                <div className='flex items-center gap-2 min-w-0'>
                    <Icon name='SlidersHorizontal' size={14} className='text-white/60 flex-shrink-0' />
                    <span className='text-xs text-white/80 truncate'>
                        {search ? `"${search}"` : currentSortLabel}
                        {search && ` · ${currentSortLabel}`}
                    </span>
                </div>
                <Icon
                    name={expanded ? 'ChevronUp' : 'ChevronDown'}
                    size={14}
                    className='text-white/50 flex-shrink-0'
                />
            </button>

            {/* Expanded: show full controls */}
            {expanded && (
                <div className='flex flex-col gap-2 mt-2'>
                    <SidebarFilter value={search} onChange={onSearchChange} />
                    <SidebarSort
                        options={sortOptions}
                        value={sortBy}
                        onChange={onSortChange}
                        direction={sortDir}
                        onDirectionChange={onSortDirChange}
                    />
                </div>
            )}
        </div>
    )
}
