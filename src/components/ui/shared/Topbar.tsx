import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);
  return (
    <section className='topbar bg-white shadow-md p-2'>
      <div className='flex-between py-4 px-5'>
        <Link to='/'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={130}
            height={325}
          />
        </Link>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            className='shad-button'
            onClick={() => signOut()}
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
