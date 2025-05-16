import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { sidebarLinks } from '@/constants';
import type { INavLink } from '@/types';

const LeftSidebar = () => {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <nav className='legftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/'>
          <img
            src='/assets/images/logo.png'
            alt='logo'
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
          <img
            src={user.imageUrl || '/assets/icons/profile.placeholder.svg'}
            alt='profile'
            className='w-14 h-14 rounded-full'
          />
          <div className='flex flex-col '>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathName === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink to={link.route} className='flex-center gap-4 p-4'>
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  <p className='small-medium'>{link.label}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Button
          variant='ghost'
          className='shad-button'
          onClick={() => signOut()}
        >
          <img src='/assets/icons/logout.svg' alt='logout' />
          <p className='small-medium lg:base-medium'>Log out</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
