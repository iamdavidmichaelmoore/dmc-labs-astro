import { Main } from './Main';
import { type NavItem, SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

const navigationItems: NavItem[] = [
  { label: 'Experiments', href: '/experiments' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
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
      <SiteNav items={activeNavigationItems} />
      <div className="main-content">
        {children}
      </div>
      <SiteFooter />
    </Main>
  );
}
