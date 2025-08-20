import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Use post image if available, otherwise fallback to background.jpg
  const imageUrl = post.image || '/background.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="relative w-full h-48 bg-gray-200">
        <Image 
          src={imageUrl} 
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2 text-left">
          {post.author}
        </p>
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          <Link
            href={`/posts/${post.id}`}
            className="hover:text-blue-600"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {post.content.substring(0, 120)}...
        </p>
      </div>
    </div>
  );
}
