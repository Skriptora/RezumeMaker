import type React from 'react'
import type { ElementCustomStyle } from '../types/resume'

export const getSelectableClasses = (
  id: string,
  selectedElementId: string | null,
  baseClass = ''
): string => {
  const isSelected = selectedElementId === id
  const ringClass = isSelected
    ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-[#EDE6D8] dark:ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.35)] rounded relative z-20 print:ring-0 print:shadow-none'
    : 'hover:ring-1 hover:ring-[#FF6F3C]/50 hover:ring-offset-1 rounded transition-all duration-150'

  return `${baseClass} cursor-pointer transition-all duration-150 ${ringClass}`
}

export const getElementStyleObject = (
  id: string,
  elementStyles?: Record<string, ElementCustomStyle>
): React.CSSProperties => {
  if (!elementStyles || !elementStyles[id]) return {}
  const style = elementStyles[id]
  const css: React.CSSProperties = {}

  if (style.fontFamily) {
    css.fontFamily = `"${style.fontFamily}", monospace`
  }
  if (typeof style.fontSize === 'number' && style.fontSize > 0) {
    css.fontSize = `${style.fontSize}px`
  }
  if (typeof style.lineHeight === 'number' && style.lineHeight > 0) {
    css.lineHeight = style.lineHeight
  }
  if (typeof style.padding === 'number') {
    css.padding = `${style.padding}px`
  }
  if (typeof style.margin === 'number') {
    css.margin = `${style.margin}px`
  }
  if (typeof style.letterSpacing === 'number') {
    css.letterSpacing = `${style.letterSpacing}px`
  }
  if (typeof style.width === 'number' && style.width > 0) {
    css.width = `${style.width}px`
  }
  if (typeof style.height === 'number' && style.height > 0) {
    css.height = `${style.height}px`
  }
  if (typeof style.borderWidth === 'number') {
    css.borderWidth = `${style.borderWidth}px`
    css.borderStyle = style.borderWidth > 0 ? 'solid' : 'none'
  }
  if (style.borderColor) {
    css.borderColor = style.borderColor
  }
  if (typeof style.borderRadius === 'number') {
    css.borderRadius = `${style.borderRadius}px`
  }
  if (style.backgroundColor) {
    css.backgroundColor = style.backgroundColor
  }
  if (style.color) {
    css.color = style.color
  }

  return css
}

export const getElementInlineStyle = (
  id: string,
  elementStyles?: Record<string, ElementCustomStyle>,
  baseStyle?: React.CSSProperties
): React.CSSProperties => {
  return { ...baseStyle, ...getElementStyleObject(id, elementStyles) }
}
