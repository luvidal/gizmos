import { useState, useEffect, useCallback, useMemo } from 'react'
import Icon from './icon'

const useIsMobile = () => {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)')
    setM(mql.matches)
    const h = (e: MediaQueryListEvent) => setM(e.matches)
    mql.addEventListener('change', h)
    return () => mql.removeEventListener('change', h)
  }, [])
  return m
}

type ModalSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type ResizeEdge = 'e' | 's' | 'se'

interface Props {
  title?: string
  icon?: string
  children?: React.ReactNode
  onClose: () => void
  className?: string
  size?: ModalSize
  headerActions?: React.ReactNode
  resizable?: boolean
}

const SIZE_CONFIG: Record<ModalSize, { w: number, h: number, maxW: number, maxH: number }> = {
  xl: { w: 1200, h: 900, maxW: 95, maxH: 90 },
  lg: { w: 960, h: 800, maxW: 92, maxH: 88 },
  md: { w: 720, h: 720, maxW: 90, maxH: 85 },
  sm: { w: 560, h: 600, maxW: 88, maxH: 82 },
  xs: { w: 400, h: 500, maxW: 85, maxH: 80 }
}

const MIN_W = 320
const MIN_H = 240
const MAXIMIZE_MARGIN = 16

const Modal = ({ title, icon, children, onClose, className = '', size: sizeProp = 'md', headerActions, resizable = true }: Props) => {
  const mobile = useIsMobile()
  const sizeConfig = SIZE_CONFIG[sizeProp]

  const [dims, setDims] = useState<{ w: number, h: number } | null>(null)
  const [maximized, setMaximized] = useState(false)
  const [resizing, setResizing] = useState(false)

  const getResponsiveSize = useCallback(() => {
    if (typeof window === 'undefined') return { w: sizeConfig.w, h: sizeConfig.h }
    const maxW = Math.floor(window.innerWidth * sizeConfig.maxW / 100)
    const maxH = Math.floor(window.innerHeight * sizeConfig.maxH / 100)
    return {
      w: Math.min(sizeConfig.w, maxW),
      h: Math.min(sizeConfig.h, maxH)
    }
  }, [sizeConfig])

  const effectiveSize = useMemo(() => {
    if (mobile) return null
    if (maximized) return {
      w: window.innerWidth - MAXIMIZE_MARGIN * 2,
      h: window.innerHeight - MAXIMIZE_MARGIN * 2
    }
    return dims ?? getResponsiveSize()
  }, [mobile, maximized, dims, getResponsiveSize])

  // Clamp dims when browser window shrinks
  useEffect(() => {
    if (mobile) return
    const onResize = () => {
      if (maximized) return
      setDims(prev => {
        if (!prev) return prev
        const maxW = window.innerWidth - MAXIMIZE_MARGIN * 2
        const maxH = window.innerHeight - MAXIMIZE_MARGIN * 2
        const w = Math.min(prev.w, maxW)
        const h = Math.min(prev.h, maxH)
        if (w === prev.w && h === prev.h) return prev
        return { w, h }
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobile, maximized])

  const handleResizeStart = useCallback((edge: ResizeEdge, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setResizing(true)

    const startX = e.clientX
    const startY = e.clientY
    const current = effectiveSize ?? getResponsiveSize()
    const startW = current.w
    const startH = current.h

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      let newW = startW
      let newH = startH

      if (edge.includes('e')) newW = startW + dx
      if (edge.includes('s')) newH = startH + dy

      const maxW = window.innerWidth - MAXIMIZE_MARGIN * 2
      const maxH = window.innerHeight - MAXIMIZE_MARGIN * 2
      newW = Math.max(MIN_W, Math.min(newW, maxW))
      newH = Math.max(MIN_H, Math.min(newH, maxH))

      setDims({ w: newW, h: newH })
      setMaximized(false)
    }

    const onUp = () => {
      setResizing(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [effectiveSize, getResponsiveSize])

  const canResize = resizable && !mobile

  return (
    <div className='fixed z-[9999] inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300'>
      <div
        className={`relative flex flex-col overflow-hidden shadow-2xl bg-theme-700 border border-theme-600 ${mobile ? 'w-full h-full rounded-none' : 'rounded-xl'} ${className}`}
        style={mobile ? {} : {
          width: `${effectiveSize!.w}px`,
          height: `${effectiveSize!.h}px`,
          transition: resizing ? 'none' : 'width 200ms ease, height 200ms ease'
        }}
        onClick={(ev) => ev.stopPropagation()}
      >
        {/* Resize handles */}
        {canResize && !maximized && (
          <>
            <div className="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize z-10"
                 onMouseDown={e => handleResizeStart('s', e)} />
            <div className="absolute right-0 top-2 bottom-2 w-1.5 cursor-e-resize z-10"
                 onMouseDown={e => handleResizeStart('e', e)} />
            <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-20"
                 onMouseDown={e => handleResizeStart('se', e)} />
          </>
        )}

        <div
          className='flex items-center justify-between text-white text-sm px-3 py-2 select-none'
          onDoubleClick={() => canResize && setMaximized(m => !m)}
        >
          <div className='flex items-center'>
            <Icon name={icon ?? 'AppWindow'} size={16} className='me-2 opacity-80' />
            <span className='opacity-90'>{title ?? ' '}</span>
          </div>
          <div className='flex items-center gap-1 select-none'>
            {headerActions}
            {canResize && (
              <div
                className='cursor-pointer hover:bg-white/20 p-1.5 rounded'
                onClick={() => setMaximized(m => !m)}
                title={maximized ? 'Restaurar' : 'Maximizar'}
              >
                {maximized ? (
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' className='text-white'>
                    <rect x='3' y='3' width='8' height='8' stroke='currentColor' strokeWidth='1.2' fill='none' />
                    <path d='M3 3 L3 1 L11 1 L11 3' stroke='currentColor' strokeWidth='1.2' fill='none' />
                    <path d='M11 3 L13 3 L13 11 L11 11' stroke='currentColor' strokeWidth='1.2' fill='none' />
                  </svg>
                ) : (
                  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' className='text-white'>
                    <rect x='2' y='2' width='10' height='10' stroke='currentColor' strokeWidth='1.2' fill='none' />
                  </svg>
                )}
              </div>
            )}
            <div className='cursor-pointer hover:bg-white/20 p-1.5 rounded' onClick={onClose} title='Cerrar Ventana'>
              <Icon name='X' size={16} className='text-white' />
            </div>
          </div>
        </div>
        <div className={`flex-1 overflow-hidden bg-white ${resizing ? 'pointer-events-none' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
