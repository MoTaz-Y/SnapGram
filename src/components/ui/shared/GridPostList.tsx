import type { Models } from 'appwrite';
import { Link } from 'react-router-dom';

type GridPostListProps = {
  posts: Models.Document[];
};
const GridPostList = ({ posts }: GridPostListProps) => {
  return (
    <ul className='grid-container'>
      {posts.map((post) => (
        <li key={post.$id} className='relative min-w-80 h-80'>
          <Link to={`/posts/${post.$id}`}>
            <img
              src={post.imageUrl}
              alt='post'
              className='w-full h-full object-cover rounded-lg'
            />
          </Link>
          <div className='grid-post_user'></div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
