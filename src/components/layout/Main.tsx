interface MainProps {
  children: React.ReactNode;
  className?: string;
}

export function Main({ children, className = '' }: MainProps) {
  return (
    <main className={`main ${className}`}>{children}</main>
  );
}
