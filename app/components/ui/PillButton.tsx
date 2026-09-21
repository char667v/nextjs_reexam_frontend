"use client";

import { ReactNode, useState } from "react";

const variants = {
  primary: {
    base: "bg-brand text-white text-body-xl",
    pressed: "bg-[var(--color-primary)] text-white",
  },
  outline: {
    base: "bg-transparent border border-brand text-brand",
    pressed: "bg-brand text-white",
  },
  danger: {
    base: "bg-[#dd0d0d] text-white",
    pressed: "bg-[#A5322F] text-white",
  },
  "danger-outline": {
    base: "bg-transparent border border-[#dd0d0d] text-[#dd0d0d]",
    pressed: "bg-[#dd0d0d] text-white",
  },
};

type PillButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PillButton({
  children,
  variant = "primary",
  onClick,
  disabled = false,
}: PillButtonProps) {
  const [pressed, setPressed] = useState(false);
  const style = pressed ? variants[variant].pressed : variants[variant].base;

  function handleClick() {
    setPressed(true);
    onClick?.();
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full py-3.5 text-body-md font-bold disabled:opacity-50 ${style}`}
    >
      {children}
    </button>
  );
}