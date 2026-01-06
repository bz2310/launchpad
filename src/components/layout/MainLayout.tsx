import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { RightSidebar } from './RightSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showRightSidebar?: boolean;
}

export function MainLayout({ children, title, showRightSidebar = false }: MainLayoutProps) {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header title={title} />
        <div className="content">
          {children}
        </div>
      </main>
      {showRightSidebar && <RightSidebar />}
    </div>
  );
}
