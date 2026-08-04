import { Main } from './Main';
import { WireframeNav } from './WireframeNav';
import { WireframeFooter } from './WireframeFooter';
import { WireframeGrid } from '../features/WireframeGrid';

interface MainLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function MainLayout({ title, children }: MainLayoutProps) {
  return (
    <Main className="main-wrapper">
      <WireframeGrid />
      <WireframeNav />
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
    <div className="meta-bar-content">
      <a href="/" className="logo">DMC LABS</a>
      <a href="/work" className="meta-link">WORK</a>
      <a href="/about" className="meta-link">ABOUT</a>
      <a href="/blog" className="meta-link">LOG</a>
    </div>
  );
}
