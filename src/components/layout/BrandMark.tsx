interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
      <img className="brand-mark-dark" src="/logos/dmc-mark-dark.png" alt="" />
      <img className="brand-mark-light" src="/logos/dmc-mark-light.png" alt="" />
    </span>
  );
}
