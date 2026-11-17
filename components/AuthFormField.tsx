export default function AuthFormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block w-full">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export const authInputClassName = 'input';
