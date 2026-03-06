import React, { useEffect, useId, useState } from 'react'

interface AnimAIProps {
  message?: string
}

const cfg = { svg: 120, text: 'text-lg', minH: 200, barW: 140 }

export default function AnimAI({ message = 'Analizando con IA' }: AnimAIProps) {
  const id = useId().replace(/:/g, '')
  const [phase, setPhase] = useState<'upload' | 'ai'>('upload')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('ai'), 2000)
    return () => clearTimeout(t1)
  }, [])

  const phaseLabel = phase === 'upload' ? 'Subiendo archivo' : message

  return (
    <>
      <style>{`
        @keyframes animai-arrow-${id} {
          0%, 100% { transform: translateY(6px); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes animai-orbit-${id} {
          0% { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }
        @keyframes animai-pop-${id} {
          0% { transform: scale(0); opacity: 0; }
          20% { transform: scale(1.3); opacity: 0.8; }
          40% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(0.6); opacity: 0; }
        }
        .animai-arrow-${id} {
          animation: animai-arrow-${id} 1.4s ease-in-out infinite;
        }
        .animai-orbit-${id}-1 {
          animation: animai-orbit-${id} 3s linear infinite;
          transform-origin: 68px 16px;
        }
        .animai-orbit-${id}-2 {
          animation: animai-orbit-${id} 3s linear -1s infinite;
          transform-origin: 68px 16px;
        }
        .animai-orbit-${id}-3 {
          animation: animai-orbit-${id} 3s linear -2s infinite;
          transform-origin: 68px 16px;
        }
        .animai-pop-${id}-1 {
          animation: animai-pop-${id} 2s ease-out 0s infinite;
        }
        .animai-pop-${id}-2 {
          animation: animai-pop-${id} 2s ease-out 0.7s infinite;
        }
        .animai-pop-${id}-3 {
          animation: animai-pop-${id} 2s ease-out 1.4s infinite;
        }
      `}</style>

      <div className='absolute inset-0 bg-white/60 backdrop-blur-sm grid place-items-center z-50'>
        <div className='flex flex-col items-center justify-center gap-0' style={{ minHeight: cfg.minH }}>

          {/* Phases container */}
          <div className='relative flex items-center justify-center' style={{ minHeight: cfg.minH - 24 }}>

          {/* Phase 1: Upload — arrow moving upward from box */}
          <div
            className='absolute flex flex-col items-center justify-center gap-3 transition-opacity duration-500'
            style={{ opacity: phase === 'upload' ? 1 : 0, visibility: phase === 'upload' ? 'visible' : 'hidden' }}
          >
            <svg
              width={cfg.svg}
              height={Math.round(cfg.svg * 0.83)}
              viewBox='0 0 120 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='opacity-50'
            >
              {/* Static box */}
              <path d='M20 35 L60 15 L100 35 L60 55 Z' className='fill-theme-200 stroke-theme-400' strokeWidth='1.5' />
              <path d='M20 35 L20 65 L60 85 L60 55 Z' className='fill-theme-100 stroke-theme-400' strokeWidth='1.5' />
              <path d='M100 35 L100 65 L60 85 L60 55 Z' className='fill-theme-50 stroke-theme-400' strokeWidth='1.5' />
              {/* Animated upward arrow */}
              <g className={`animai-arrow-${id}`}>
                <path
                  d='M60 30 L60 4 M52 12 L60 4 L68 12'
                  className='stroke-theme-500'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
            <p className={`font-medium text-gray-500 whitespace-nowrap ${cfg.text}`}>{phaseLabel}</p>
          </div>

          {/* Phase 2: AI — magnifying glass with orbiting dots + popping bubbles */}
          <div
            className='absolute flex flex-col items-center justify-center gap-3 transition-opacity duration-500'
            style={{ opacity: phase === 'ai' ? 1 : 0, visibility: phase === 'ai' ? 'visible' : 'hidden' }}
          >
            <svg
              width={cfg.svg}
              height={Math.round(cfg.svg * 0.83)}
              viewBox='0 0 120 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='opacity-50'
            >
              {/* Static box */}
              <path d='M20 35 L60 15 L100 35 L60 55 Z' className='fill-theme-200 stroke-theme-400' strokeWidth='1.5' />
              <path d='M20 35 L20 65 L60 85 L60 55 Z' className='fill-theme-100 stroke-theme-400' strokeWidth='1.5' />
              <path d='M100 35 L100 65 L60 85 L60 55 Z' className='fill-theme-50 stroke-theme-400' strokeWidth='1.5' />
              {/* Magnifying glass */}
              <circle cx='68' cy='16' r='13' className='stroke-theme-500' strokeWidth='2' fill='none' />
              <line x1='78' y1='25' x2='88' y2='35' className='stroke-theme-500' strokeWidth='3' strokeLinecap='round' />
              {/* Orbiting dots around magnifying glass */}
              <circle className={`fill-theme-400 animai-orbit-${id}-1`} r='2.5' cx='68' cy='16' />
              <circle className={`fill-theme-300 animai-orbit-${id}-2`} r='2' cx='68' cy='16' />
              <circle className={`fill-theme-400 animai-orbit-${id}-3`} r='1.5' cx='68' cy='16' />
              {/* Bubbles popping above */}
              <circle cx='50' cy='8' r='3' className={`fill-theme-300 animai-pop-${id}-1`} />
              <circle cx='68' cy='2' r='2.5' className={`fill-theme-300 animai-pop-${id}-2`} />
              <circle cx='42' cy='3' r='2' className={`fill-theme-300 animai-pop-${id}-3`} />
            </svg>
            <p className={`font-medium text-gray-500 whitespace-nowrap ${cfg.text}`}>{phaseLabel}</p>
          </div>

          </div>

          {/* Progress bar */}
          <div
            className='rounded-full bg-theme-100 overflow-hidden'
            style={{ width: cfg.barW, height: 4 }}
          >
            <div
              className='h-full rounded-full bg-theme-400 transition-all ease-out'
              style={{
                width: phase === 'upload' ? '30%' : '85%',
                transitionDuration: phase === 'upload' ? '1.5s' : '8s',
              }}
            />
          </div>

        </div>
      </div>
    </>
  )
}
