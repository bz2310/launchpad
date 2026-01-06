import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header title={title} />
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
}
