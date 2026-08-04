import { Main } from './Main';
import { type NavItem, WireframeNav } from './WireframeNav';
import { WireframeFooter } from './WireframeFooter';

const navigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'The Lab', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Log', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
  activePath?: string;
}

export function MainLayout({ title, children, activePath }: MainLayoutProps) {
  const activeNavigationItems = navigationItems.map(item => ({
    ...item,
    active: item.href === activePath,
  }));

  return (
    <Main className="main-wrapper" ariaLabel={title}>
      <WireframeNav items={activeNavigationItems} />
      <div className="main-content">
        {children}
      </div>
      <WireframeFooter />
    </Main>
  );
}
