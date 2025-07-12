import { Search } from 'lucide-react'

type SearchBoxProps = {
  styles?: string
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  placeholder?: string
  disabled?: boolean
}

export default function SearchBox({
  styles,
  value,
  onChange,
  onSearch,
  placeholder = 'Buscar',
  disabled = false,
}: SearchBoxProps) {
  return (
    <div className={`relative w-[400px] flex items-center ${styles}`}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && onSearch) {
            onSearch()
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-10 pl-4 pr-10 border border-gray-300 rounded-full text-base transition-colors duration-100 outline-none hover:border-blue-400 focus:border-2 focus:border-blue-500 placeholder:text-gray-500 disabled:opacity-50"
      />
      <Search
        className="!w-5 !h-5 absolute right-3 text-xl text-gray-500 cursor-pointer"
        onClick={onSearch}
      />
    </div>
  )
}
