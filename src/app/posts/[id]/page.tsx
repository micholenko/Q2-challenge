import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await api.getPosts();
    if (!posts || !Array.isArray(posts)) {
      return [];
    }

    const params = posts.map((post) => ({
      id: post.id.toString(),
    }));

    return params;
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  try {
    const post = await api.getPost(postId);

    if (!post) {
      notFound();
    }

    // Use post image if available, otherwise fallback to background.jpg
    const backgroundImage = post.image || '/background.jpg';

    return (
      <PageLayout title={post.title} backgroundImage={backgroundImage}>
        <div className="mb-48"></div> {/* Spacer to maintain layout */}
        <article className="flex space-x-4">
          <h2 className="font-semibold text-nowrap ">{post.author}</h2>
          <div className="w-12 border-t border-gray-300 my-3"></div>
          <div className="flex-1">
            <div className="leading-relaxed text-gray-700 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </article>
      </PageLayout>
    );
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return (
      <PageLayout title="Error Loading Post">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-200 mb-2">
              Error Loading Post
            </h1>
            <p className="text-red-300">
              Failed to load the post. Please try again later.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }
}
