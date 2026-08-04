interface MainProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function Main({ children, className = '', ariaLabel }: MainProps) {
  return (
    <main className={`main ${className}`} aria-label={ariaLabel}>{children}</main>
  );
}
