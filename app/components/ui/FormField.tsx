"use client";

type FormFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  bordered?: boolean;
};

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  bordered = true,
}: FormFieldProps) {
  return (
    <div className={bordered ? "border border-brand rounded-xl px-4 py-2" : "py-2"}>
      <label className="block text-body-xs font-bold text-brand">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-body-md text-foreground placeholder:text-[#6b6b68]"
      />
    </div>
  );
}


// "use client";

// type FormFieldProps = {
//   label: string;
//   value: string;
//   onChange: (value: string) => void;
//   type?: string;
//   placeholder?: string;
// };

// export default function FormField({ label, value, onChange, type = "text", placeholder }: FormFieldProps) {
//   return (
//     <div className="border border-brand rounded-xl px-4 py-2">
//       <label className="block text-body-md font-bold text-foreground">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="w-full bg-transparent outline-none text-body-xs text-foreground placeholder:text-[#6b6b68]"
//       />
//     </div>
//   );
// }