import type { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { useUserContext } from '@/context/AuthContext';

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const userContext = useUserContext(); // Renamed for clarity
  // console.log(userContext); // For debugging the context value
  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post.$id} className='relative min-w-80 h-80'>
          <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img
              src={post.imageUrl}
              alt='post'
              className='w-full h-full object-cover rounded-lg'
            />
          </Link>
          <div className='grid-post_user'>
            {showUser && (
              <div className='flex irmes-center justify-start gap-2 flex-1'>
                <img
                  // Use post.creator.imageUrl for creator's image
                  src={
                    post.creator.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  alt={post.creator.name}
                  className='w-6 h-6 rounded-full'
                />
                <p className='lie-clamp-1'>{post.creator.name}</p>
              </div>
            )}
            {/* Access userId via userContext.user.id */}
            {showStats && userContext.user.id && (
              <PostStats post={post} userId={userContext.user.id} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
