import { Main } from './Main';
import { type NavItem, WireframeNav } from './WireframeNav';
import { WireframeFooter } from './WireframeFooter';
import { WireframeGrid } from '../features/WireframeGrid';

const navigationItems: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Log', href: '/blog' },
];

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function MainLayout({ title, children }: MainLayoutProps) {
  return (
    <Main className="main-wrapper">
      <WireframeGrid />
      <WireframeNav items={navigationItems} />
      <div className="main-content">
        <div className="meta-bar">
          <ComponentMeta title={title} />
        </div>
        {children}
      </div>
      <WireframeFooter />
    </Main>
  );
}

interface ComponentMetaProps {
  title: string;
}

function ComponentMeta({ title }: ComponentMetaProps) {
  return (
    <nav className="meta-bar-content" aria-label={`${title} navigation`}>
      <a href="/" className="logo">DMC LABS</a>
      {navigationItems.map(item => (
        <a key={item.href} href={item.href} className="meta-link">
          {item.label.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
