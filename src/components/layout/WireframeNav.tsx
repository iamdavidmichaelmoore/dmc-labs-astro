export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface WireframeNavProps {
  items?: NavItem[];
}

export function WireframeNav({ items = [] }: WireframeNavProps) {
  if (items.length === 0) {
    return (
      <nav className="nav">
        <a href="/" className="logo">DMC LABS</a>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <a href="/" className="logo">DMC LABS</a>
      <div className="nav-links">
        {items.map(item => (
          <a
            key={item.href}
            href={item.href}
            className={`nav-link ${item.active ? 'active' : ''}`}
          >
            {item.label.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  );
}
