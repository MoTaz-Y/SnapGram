import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/shared/Loader';
import PostStats from '@/components/ui/shared/PostStats';
import { useUserContext } from '@/context/AuthContext';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { data: post, isPending, error } = useGetPostById(id || '');
  if (error) return <div>Error: {error.message}</div>;

  const handleDeletePost = () => {
    // Implement the logic to delete the post here
    // You can use the `id` variable to identify the post to be deleted
    // Make an API request or perform any necessary actions
    // After successful deletion, navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className='post_details-container'>
      <div className='post-back-button'>
        <Button
          onClick={() => navigate(-1)}
          variant='ghost'
          className='shad-button_ghost'
        >
          <img
            src={'/assets/icons/back.svg'}
            alt='back'
            width={24}
            height={24}
          />
          <p className='small-medium lg-base-medium'>Back</p>
        </Button>
      </div>
      {isPending || !post ? (
        <Loader />
      ) : (
        <div className='post_details-card'>
          <img src={post?.imageUrl} alt='post' className='post_details-img' />
          <div className='post_details-info'>
            <div className='flex-between w-full'>
              <Link
                to={`/profile/${post?.creator.$id}`}
                className='flex items-center gap-3'
              >
                <div className='flex items-center gap-3'>
                  <img
                    src={
                      post?.creator?.imageUrl ||
                      '/assets/icons/profile-placeholder.svg'
                    }
                    alt='user'
                    className='w-8 h-8 rounded-full object-cover lg:h-12 lg:w-12'
                  />
                  <div className='flex flex-col'>
                    <p className='base-medium lg-body-bold text-light-1'>
                      {post?.creator?.name}
                    </p>
                    <div className='flex-center gap-2 text-light-3'>
                      <p className='subtle-semibold lg-small-regular'>
                        {post?.$createdAt}
                      </p>
                      -
                      <p className='subtle-semibold lg-small-regular'>
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              {post?.creator?.$id === user?.id && (
                <div className='flex-center gap-4'>
                  <Link to={`/update-post/${post.$id}`}>
                    <img
                      src='/assets/icons/edit.svg'
                      alt='edit'
                      className='w-5 h-5 cursor-pointer'
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant='ghost'
                    className='post_details-delete_btn'
                  >
                    <img
                      src='/assets/icons/delete.svg'
                      alt='delete'
                      className='w-5 h-5 cursor-pointer'
                    />
                  </Button>
                </div>
              )}
            </div>
            <hr className='border w-full border-dark-4' />
            <div className='flex flex-col flex-1 w-full small-medium lg-base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex gap-1 mt-2'>
                {post?.tags?.map((tag: string) => (
                  <li key={tag} className='text-light-3 p-1'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full'>
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
