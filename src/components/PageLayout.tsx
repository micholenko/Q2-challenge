import { ReactNode } from 'react';
import PageHeader from './PageHeader';

interface PageLayoutProps {
  title: string;
  backgroundImage?: string;
  children: ReactNode;
}

export default function PageLayout({ title, backgroundImage, children }: PageLayoutProps) {
  return (
    <>
      <PageHeader title={title} backgroundImage={backgroundImage} />
      
      {/* Main Content */}
      <div className="relative py-10 px-[78px] -mt-48">
        {children}
      </div>
    </>
  );
}
