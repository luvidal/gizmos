import ButtonGroup from './buttongroup'
import Label from './label'
import Button from './toolbarbutton'

interface PaginatorProps {
    page: number
    setPage: (page: number) => void
    hasNext: boolean
    className?: string
    visible?: boolean
    compact?: boolean
}

const Paginator = ({ page, setPage, hasNext, className = '', visible, compact = false }: PaginatorProps) => {
    const hasPrev = page > 0

    // Auto-hide: if visible is undefined, hide when only one page exists
    // If visible is explicitly set, respect that value
    if (visible === false || (visible === undefined && !hasPrev && !hasNext)) return null

    if (compact) {
        return (
            <div className={`flex items-center ${className}`}>
                <ButtonGroup>
                    <Button
                        icon='ChevronLeft'
                        label='Anterior'
                        onClick={() => setPage(Math.max(page - 1, 0))}
                        disabled={page === 0}
                    />
                    <Label text={`${page + 1}`} />
                    <Button
                        icon='ChevronRight'
                        label='Siguiente'
                        onClick={() => setPage(page + 1)}
                        disabled={!hasNext}
                    />
                </ButtonGroup>
            </div>
        )
    }

    return (
        <div className={`flex justify-end p-3 sm:p-4 ${className}`}>
            <ButtonGroup>
                <Button
                    icon='ChevronLeft'
                    label='Anterior'
                    onClick={() => setPage(Math.max(page - 1, 0))}
                    disabled={page === 0}
                />
                <Label text={`${page + 1}`} />
                <Button
                    icon='ChevronRight'
                    label='Siguiente'
                    onClick={() => setPage(page + 1)}
                    disabled={!hasNext}
                />
            </ButtonGroup>
        </div>
    )
}

export default Paginator
