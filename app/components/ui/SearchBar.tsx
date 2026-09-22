type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = "Søg vaskehal" }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 bg-black border border-[#2a2a2a] rounded-full px-6 py-3">
      <span className="text-foreground">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-body-md text-foreground placeholder:text-foreground"
      />
    </div>
  );
}