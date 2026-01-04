import { ArtistSidebar } from './ArtistSidebar';
import { ArtistHeader } from './ArtistHeader';

interface ArtistLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function ArtistLayout({ children, title }: ArtistLayoutProps) {
  return (
    <div className="container artist-container">
      <ArtistSidebar />
      <main className="main-content artist-main">
        <ArtistHeader title={title} />
        <div className="content artist-content">
          {children}
        </div>
      </main>
    </div>
  );
}
