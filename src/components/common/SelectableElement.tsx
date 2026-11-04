import React from 'react'
import { useResumeStore } from '../../store/useResumeStore'
import { getElementStyleObject } from '../../utils/selectable'

export interface SelectableElementProps extends React.HTMLAttributes<HTMLElement> {
  id: string
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  ringClassName?: string
  showBadge?: boolean
  badgeLabel?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  style?: React.CSSProperties
}

export const SelectableElement: React.FC<SelectableElementProps> = ({
  id,
  as: Component = 'div',
  children,
  className = '',
  ringClassName,
  showBadge = false,
  badgeLabel,
  onClick,
  style,
  ...props
}) => {
  const { selectedElementId, setSelectedElementId, elementStyles } = useResumeStore()
  const isSelected = selectedElementId === id
  const customStyle = getElementStyleObject(id, elementStyles)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setSelectedElementId(id)
    if (onClick) {
      onClick(e)
    }
  }

  const indicatorClass = isSelected
    ? ringClassName ||
      'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-[#EDE6D8] dark:ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.35)] rounded relative z-20 print:ring-0 print:shadow-none'
    : 'hover:ring-1 hover:ring-[#FF6F3C]/50 hover:ring-offset-1 rounded'

  return (
    <Component
      id={id}
      data-element-id={id}
      onClick={handleClick}
      className={`relative cursor-pointer transition-all duration-150 ${indicatorClass} ${className}`}
      style={{ ...customStyle, ...style }}
      {...props}
    >
      {children}
      {isSelected && showBadge && (
        <span className="absolute -top-3 right-2 px-1.5 py-0.5 text-[8.5px] font-mono font-bold bg-[#FF6F3C] text-[#121316] rounded shadow-md pointer-events-none select-none z-30 uppercase tracking-wider print:hidden">
          {badgeLabel || id}
        </span>
      )}
    </Component>
  )
}

export default SelectableElement
