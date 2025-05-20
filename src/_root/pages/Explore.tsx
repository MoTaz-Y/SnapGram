import { Input } from '@/components/ui/input';
import GridPostList from '@/components/ui/shared/GridPostList';
import Loader from '@/components/ui/shared/Loader';
import useDebounce from '@/hooks/useDebounce';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutations';
import type { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface SearchResultProps {
  isSearchFetching: boolean;
  // searchedPostsArray is now an array of documents directly or undefined
  searchedPostsArray: Models.Document[] | undefined;
}

// Component to display search results
const SearchResults = ({
  isSearchFetching,
  searchedPostsArray,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
    // Check searchedPostsArray directly
  } else if (searchedPostsArray && searchedPostsArray.length > 0) {
    return <GridPostList posts={searchedPostsArray} />;
  } else {
    return (
      <p className='text-light-4 mt-10 text-center w-full'>No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState('');
  // Debounce search term to avoid excessive API calls
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Fetch search results only if debouncedSearchValue is present
  const { data: searchedPostsData, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearchValue);

  // Fetch general posts for browsing, with infinite scrolling
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingPosts,
  } = useGetPosts();

  useEffect(() => {
    // Fetch more posts on scroll if not searching and there are more posts to load
    if (inView && !searchValue && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage, hasNextPage]);

  // Determine if search results should be displayed
  const shouldShowSearchResults = debouncedSearchValue !== '';

  // Flatten all posts from different pages and filter out any undefined documents
  const allPosts =
    posts?.pages
      .flatMap((page) => page?.documents) // page.documents might be undefined
      .filter((post): post is Models.Document => !!post) || []; // Type guard to ensure post is Document

  // Show loader for search if search is active and data is not yet fetched
  if (shouldShowSearchResults && !searchedPostsData && isSearchFetching) {
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
        <div className='flex-center w-full h-full mt-10'>
          <Loader />
        </div>
      </div>
    );
  }

  // Show full-page loader if not searching and initial general posts are loading
  if (!shouldShowSearchResults && isLoadingPosts && allPosts.length === 0) {
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  }

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
          <p className='small-medium md-base-medium text-light-2'>All</p>
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
            isSearchFetching={isSearchFetching}
            // Pass searchedPostsData.documents directly
            searchedPostsArray={searchedPostsData?.documents}
          />
        ) : allPosts.length > 0 ? (
          // Now allPosts is guaranteed to be Models.Document[]
          <GridPostList posts={allPosts} />
        ) : (
          // If not searching and no general posts are found (after loading)
          !isLoadingPosts && (
            <p className='text-light-4 mt-10 text-center w-full'>
              No posts found
            </p>
          )
        )}
      </div>
      {/* Show loader for infinite scroll only when not searching and there's a next page */}
      {hasNextPage && !searchValue && (
        <div ref={ref} className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
