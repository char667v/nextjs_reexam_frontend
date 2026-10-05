"use client";

type FormFieldProps = {
  label: string;
  value: string;
  onChange?: (value: string) => void;   // optional: a read-only field has nothing to change
  type?: string;
  placeholder?: string;
  bordered?: boolean;
  readOnly?: boolean;
};

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  bordered = true,
  readOnly = false,
}: FormFieldProps) {
  return (
    <div className={bordered ? "border border-brand rounded-xl px-4 py-2" : "py-2"}>
      <label className="block text-body-xs font-bold text-brand">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full bg-transparent outline-none text-body-md placeholder:text-[#6b6b68] ${readOnly ? "text-[#8a8a86]" : "text-foreground"}`}
      />
    </div>
  );
}