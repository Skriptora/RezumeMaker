import React, { useState, useRef, useEffect } from 'react'
import { Pencil, Check } from 'lucide-react'
import { useResumeStore } from '../../../store/useResumeStore'
import { getElementStyleObject } from '../../../utils/selectable'

interface InlineEditableTextProps {
  value: string
  onSave: (newVal: string) => void
  isEditable?: boolean
  className?: string
  placeholder?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  multiline?: boolean
  elementId?: string
}

export const InlineEditableText: React.FC<InlineEditableTextProps> = ({
  value,
  onSave,
  isEditable = true,
  className = '',
  placeholder = 'Click to edit...',
  as: Component = 'p',
  multiline = false,
  elementId,
}) => {
  const { selectedElementId, setSelectedElementId, elementStyles } = useResumeStore()
  const [isEditing, setIsEditing] = useState(false)
  const [currentVal, setCurrentVal] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const isSelected = !!elementId && selectedElementId === elementId
  const customStyle = elementId ? getElementStyleObject(elementId, elementStyles) : {}

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (elementId) {
      setSelectedElementId(elementId)
    }
    setCurrentVal(value)
    setIsEditing(true)
  }

  const handleFinish = () => {
    setIsEditing(false)
    if (currentVal.trim() !== value) {
      onSave(currentVal.trim() || value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleFinish()
    } else if (e.key === 'Escape') {
      setCurrentVal(value)
      setIsEditing(false)
    }
  }

  const indicatorClass = isSelected
    ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-[#121316] shadow-[0_0_12px_rgba(255,111,60,0.35)] rounded relative z-20'
    : 'hover:outline-dashed hover:outline-1 hover:outline-[#FF6F3C]/60 hover:rounded'

  if (!isEditable) {
    return (
      <Component
        id={elementId}
        onClick={(e: React.MouseEvent) => {
          if (elementId) {
            e.stopPropagation()
            setSelectedElementId(elementId)
          }
        }}
        style={customStyle}
        className={`${className} cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-[#FF6F3C] ring-offset-2 ring-offset-[#121316] rounded' : ''
        }`}
      >
        {value || placeholder}
      </Component>
    )
  }

  if (isEditing) {
    return (
      <div
        id={elementId}
        onClick={(e) => e.stopPropagation()}
        className="relative inline-flex items-center w-full group/inline"
      >
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            onBlur={handleFinish}
            onKeyDown={handleKeyDown}
            rows={3}
            className={`w-full bg-[#181A1F] text-[#F7F4EB] border-2 border-[#FF6F3C] rounded-lg p-2 font-mono text-xs focus:outline-none shadow-lg ${className}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentVal}
            onChange={(e) => setCurrentVal(e.target.value)}
            onBlur={handleFinish}
            onKeyDown={handleKeyDown}
            className={`w-full bg-[#181A1F] text-[#F7F4EB] border-2 border-[#FF6F3C] rounded px-2 py-0.5 font-mono focus:outline-none shadow-lg ${className}`}
          />
        )}
        <button
          type="button"
          onMouseDown={handleFinish}
          className="absolute right-1.5 top-1.5 p-1 rounded bg-[#FF6F3C] text-[#121316] hover:bg-[#FF6F3C]/90 cursor-pointer shadow-xs"
          title="Save edit"
        >
          <Check className="w-3 h-3 font-bold" />
        </button>
      </div>
    )
  }

  return (
    <div
      id={elementId}
      onClick={handleStartEdit}
      style={customStyle}
      className={`group/editable relative inline-flex items-baseline cursor-pointer px-1 -mx-1 transition-all ${indicatorClass}`}
      title={elementId ? `[${elementId}] Click to select & edit text` : 'Click to edit text directly'}
    >
      <Component className={className}>{value || placeholder}</Component>
      <Pencil className="w-2.5 h-2.5 ml-1.5 text-[#FF6F3C] opacity-0 group-hover/editable:opacity-100 transition-opacity flex-shrink-0 self-center" />
    </div>
  )
}
