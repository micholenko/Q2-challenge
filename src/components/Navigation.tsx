import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-black/20">
      <div className="mx-[78px]">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/posts" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/posts"
              className="text-white px-3 py-2 text-sm font-medium font-roboto hover:underline decoration-blue-400 decoration-2 underline-offset-8"
            >
              Blog
            </Link>
            <Link
              href="/posts/new"
              className="text-white px-3 py-2 text-sm font-medium font-roboto hover:underline decoration-blue-400 decoration-2 underline-offset-8"
            >
              Přidat článek
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
