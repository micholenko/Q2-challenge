import Navigation from './Navigation';

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, backgroundImage = '/background.jpg' }: PageHeaderProps) {
  return (
    <div
      className="h-96 flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navigation />
      <div className="flex-1 flex items-center px-[78px] pb-12">
        <h1 className="text-2xl font-bold text-white drop-shadow-2xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
