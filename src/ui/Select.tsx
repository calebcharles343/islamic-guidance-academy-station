import React, { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { BiX } from 'react-icons/bi'
import { truncateText } from '../utils/truncateText'

interface Option {
  id: string
  name: string
}

interface SelectProps {
  label?: string
  id: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  required?: boolean
  customLabel: string
  optionsHeight?: number | string
  optionsWeight?: number | string // (unused but preserved)
  filterable?: boolean
  clearable?: boolean
  className?: string // NEW: wrapper classes
  triggerClassName?: string // NEW: trigger classes
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  customLabel,
  optionsHeight = 'auto',
  filterable = false,
  clearable = true,
  className,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(value)
  const [searchTerm, setSearchTerm] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  // Filter options
  const filteredOptions = filterable
    ? options.filter((o) =>
        o.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  // Sync external value
  useEffect(() => setSelectedValue(value), [value])

  // Click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus selected on open
  useEffect(() => {
    if (isOpen && optionsRef.current && selectedValue) {
      const idx = filteredOptions.findIndex((o) => o.id === selectedValue)
      if (idx >= 0) setFocusedIndex(idx)
    }
  }, [isOpen, selectedValue, filteredOptions])

  const handleSelect = (val: string) => {
    setSelectedValue(val)
    onChange(val)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedValue('')
    onChange('')
    setSearchTerm('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((p) => Math.min(p + 1, filteredOptions.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((p) => Math.max(p - 1, 0))
        break
      case 'Enter':
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex].id)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchTerm('')
        break
      default:
        if (filterable && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          setSearchTerm((prev) => prev + e.key)
          setFocusedIndex(0)
        }
    }
  }

  const selectedOption = options.find((o) => o.id === selectedValue)

  const wrapperBase = 'text-gray-600 relative w-full'
  const wrapperMerged = className ? `${wrapperBase} ${className}` : wrapperBase

  const triggerBase =
    'w-full px-3 py-2 rounded-md border focus:outline-none shadow-sm text-gray-700 bg-white flex items-center justify-between cursor-pointer ' +
    (isOpen ? 'border-[#B97743]' : 'border-gray-300') +
    ' focus:border-[#B97743]'
  const triggerMerged = triggerClassName
    ? `${triggerBase} ${triggerClassName}`
    : triggerBase

  return (
    <div className={wrapperMerged} ref={dropdownRef} onKeyDown={handleKeyDown}>
      {label && (
        <label
          htmlFor={id}
          className='block mb-1 font-bold text-sm text-gray-600'
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        id={id}
        className={triggerMerged}
        onClick={() => {
          setIsOpen((o) => !o)
          setSearchTerm('')
        }}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <span className='truncate'>
          {selectedOption
            ? truncateText(selectedOption.name, 70, '...')
            : customLabel}
        </span>

        <div className='flex items-center gap-1'>
          {clearable && selectedValue && (
            <button
              type='button'
              onClick={handleReset}
              className='text-gray-400 hover:text-gray-600 transition-colors'
              aria-label='Clear selection'
            >
              <BiX size={16} />
            </button>
          )}
          <span
            className={`transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Options */}
      {isOpen && (
        <div
          className='absolute z-50 w-full max-h-52 mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-y-auto'
          style={{
            maxHeight:
              typeof optionsHeight === 'number'
                ? `${optionsHeight}px`
                : optionsHeight,
          }}
          role='listbox'
          ref={optionsRef}
        >
          {filterable && (
            <div className='sticky top-0 bg-white p-2 border-b'>
              <input
                type='text'
                className='w-full px-3 py-2 rounded-md border placeholder:text-sm focus:border-[#B97743] focus:outline-none text-gray-700 bg-white'
                placeholder='Type to filter...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedValue === option.id ? 'bg-blue-50 font-medium' : ''
                } ${focusedIndex === index ? 'bg-gray-200' : ''}`}
                onClick={() => handleSelect(option.id)}
                role='option'
                aria-selected={selectedValue === option.id}
              >
                {truncateText(option.name, 70, '...')}
              </div>
            ))
          ) : (
            <div className='px-4 py-2 text-gray-600 text-center'>
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Select
