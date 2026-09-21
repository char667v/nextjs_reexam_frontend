"use client";

import PillButton from "./PillButton";

type SwitchMembershipWarningProps = {
  currentTier: string;
  newTier: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SwitchMembershipWarning({
  currentTier,
  newTier,
  onConfirm,
  onCancel,
}: SwitchMembershipWarningProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center px-8 gap-6">
      <span className="text-9xl text-(--color-danger)">⚠</span>

      <h2 className="text-h4 text-foreground text-center">Skift enkeltvask medlemskab?</h2>

      <p className="text-h5 text-foreground text-center">Er du sikker på at du vil skifte til {newTier}?</p>
      <p className="text-h5 text-foreground text-center">Dit aktive medlemskab er {currentTier}.</p>

      <div className="w-full flex flex-col gap-3">
        <PillButton onClick={onConfirm}>Ja, jeg er sikker!</PillButton>
        <PillButton variant="danger" onClick={onCancel}>Nej, jeg fortryder</PillButton>
      </div>
    </div>
  );
}