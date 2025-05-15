import { Outlet, Navigate } from 'react-router-dom';
const AythLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 flex-col py-10 justify-center items-center'>
            <Outlet />
          </section>
          <img
            src='/assets/images/side-img.svg'
            alt='sideImage'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat '
          />
        </>
      )}
    </>
  );
};

export default AythLayout;
