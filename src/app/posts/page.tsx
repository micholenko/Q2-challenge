import { api, Post } from '@/lib/api';
import PostCard from '@/components/PostCard';
import PageLayout from '@/components/PageLayout';

// ISR with revalidation every 60 seconds
export const revalidate = 60;

export default async function PostsPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await api.getPosts();
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    error = 'Failed to load posts';
  }

  if (error) {
    return (
      <PageLayout title="Posts">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-white mb-8 sr-only">
            Posts
          </h1>
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-red-400">
              Error loading posts. Please try again later.
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
      <div className="mb-8">
        <div className="mb-48"></div> {/* Spacer to maintain layout */}
      </div>
      
      <h2 className="text-3xl font-semibold text-[#495057] pb-10">
        Nejnovější
      </h2>
      
      {!posts || posts.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-300">
            No posts found.
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}