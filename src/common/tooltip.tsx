import { createPortal } from 'react-dom'
import { useState, useRef, useEffect, useCallback } from 'react'
import Icon from './icon'

type TooltipProps = {
    text: string
    icon?: string
    iconColor?: string
    className?: string
    html?: boolean
}

const Tooltip = ({ text, icon = 'CircleQuestionMark', iconColor = 'text-gray-700', className = '', html = false }: TooltipProps) => {
    const [open, setOpen] = useState(false)
    const [pos, setPos] = useState({ top: 0, left: 0 })
    const [visible, setVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    const shouldHtml = html || /<[a-z][\s\S]*>/i.test(text)
    const patchedText = shouldHtml
        ? text.replace(
            /(<li[\s\S]*<\/li>)/gi,
            '<ul style="list-style:disc;padding-left:1.25rem;margin:0">$1</ul>'
        )
        : text

    const updatePosition = useCallback(() => {
        if (!btnRef.current) return
        const r = btnRef.current.getBoundingClientRect()
        let top = r.top
        let left = r.right + 8

        // Viewport edge detection: if tooltip would overflow right, show on left
        const tooltipWidth = 256 // max-w-xs = 20rem = 320px, but typically ~256px
        if (left + tooltipWidth > window.innerWidth - 16) {
            left = r.left - tooltipWidth - 8
        }

        // If would overflow bottom, shift up
        if (top + 100 > window.innerHeight - 16) {
            top = window.innerHeight - 116
        }

        // Clamp to viewport
        top = Math.max(8, top)
        left = Math.max(8, left)

        setPos({ top, left })
    }, [])

    useEffect(() => {
        if (open) {
            updatePosition()
            requestAnimationFrame(() => setVisible(true))
        } else {
            setVisible(false)
        }
    }, [open, updatePosition])

    useEffect(() => {
        const onDown = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node) &&
                tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [])

    return (
        <span ref={ref} className={`relative inline-block left-1 ${className}`}>
            <button
                ref={btnRef}
                onClick={e => {
                    e.stopPropagation()
                    setOpen(v => !v)
                }}
            >
                <Icon
                    name={icon}
                    className={`size-4 opacity-60 hover:opacity-100 transition-opacity ${iconColor}`}
                />
            </button>
            {open && typeof document !== 'undefined' && createPortal(
                <div
                    ref={tooltipRef}
                    className={`
                        fixed z-[9999] p-3 rounded-xl shade-md text-sm max-w-xs break-words
                        bg-theme-800 text-white/90 border border-white/10 backdrop-blur-md
                        transition-all duration-200
                        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
                    `}
                    style={{ top: pos.top, left: pos.left }}
                >
                    {shouldHtml
                        ? <div dangerouslySetInnerHTML={{ __html: patchedText }} />
                        : text}
                </div>,
                document.body
            )}
        </span>
    )
}

export default Tooltip
