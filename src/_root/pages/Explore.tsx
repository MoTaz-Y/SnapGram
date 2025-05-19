import { Input } from '@/components/ui/input';
import GridPostList from '@/components/ui/shared/GridPostList';
import Loader from '@/components/ui/shared/Loader';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import { useState } from 'react';

interface SearchResultProps {
  isSearchingFetching: boolean;
  searchedPosts: any;
}
const SearchResults = ({
  isSearchingFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchingFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts?.document.length > 0) {
    return <GridPostList posts={searchedPosts?.document} />;
  } else {
    <p className='text-light-4 mt-10 text-center w-full'>No results found</p>;
  }
};

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const debounceSearch = useDebounce(searchValue, 500);
  const { data: posts, isFetching: isSearchFetching } =
    useSearchPosts(debounceSearch);
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  if (!posts)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item.document.length === 0);

  return (
    <div className='explore-container'>
      <div className='scroll-inner_container'>
        <h2 className='h3-bold md-h2-bold'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4 items-center '>
          <img
            src='/assets/icons/search.svg'
            alt='search'
            className='w-5 h-5'
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md-h3-bold'>Popular today </h3>
        <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-4 cursor-pointer'>
          <p className='amsll-medium md-base-medium text-light-2'>All</p>
          <img
            src='/assets/icons/filter.svg'
            alt='filter'
            className='w-5 h-5'
          />
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchingFetching={isSearchFetching}
            searchedPosts={posts}
          />
        ) : shouldShowPosts ? (
          <p className='text-light-4 mt-10 text-center w-full'>
            No results found
          </p>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPostList key={item.id} posts={item.document} />
          ))
        )}
      </div>
    </div>
  );
};

export default Explore;
