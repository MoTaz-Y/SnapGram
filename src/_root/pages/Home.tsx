import PostCard from '@/components/ui/shared/PostCard';
import Loader from '@/components/ui/shared/Loader';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';
import type { Models } from 'appwrite';

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    // isError: isErrorPost,
  } = useGetRecentPosts();
  // console.error(isErrorPost);
  return (
    <div className='flex flex-1'>
      <div className='home-container'>
        <div className='home-posts'>
          <h2 className='h3-bold md-h2-bold text-left w-full'>Home Feed</h2>
          {isPostLoading && !posts ? (
            <div className='flex items-center justify-center h-full w-full'>
              <Loader />
            </div>
          ) : (
            <ul className='flex flex-col flex-1 gap-9 w-full'>
              {posts?.documents.map((post: Models.Document) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
