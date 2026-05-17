import tags from '@/pages/api/watchlater_grouped.json';

import { useEffect, useMemo, useState } from 'react';
import FilterIcon from '../../public/FilterIcon';
import Aside from './components/aside';
import FilterComponent from './components/FilterComponent';
import Main from './components/main';
import MobileFilter from './components/mobileFilterComponent';
import Nav from './components/nav';

function getYouTubeId(url: string): string | null {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	);
	return match ? match[1] : null;
}
type Video = {
  index: number;
  title: string;
  link: string;
  thumbnail: string;
  ariaLabel: string;
  channelName: string;
  subcategory: string[];
};

export default function WatchLater() {
	const [getTags, setTags] = useState<string>('');
	const [search, setSearch] = useState<string>('');
	const [asideOpen, setAsideOpen] = useState<boolean>(false);
	const [searchOpen, setSearchOpen] = useState<boolean>(false);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [getSubcategory, setSubcategory] = useState<string[]>([]);
	const [isMoreConcepts, setIsMoreConcepts] = useState<boolean>(false);
	const [showComponent, setShowComponent] = useState<boolean>(false);
   console.log( Boolean(search) || 'no search');
	useEffect(() => {
		const handleResize = () => {
			setShowComponent(window.innerWidth >= 640);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const grouped = tags;
	const tagList: { tag: string; length: number }[] = grouped.map((group) => ({
		tag: group.tag,
		length: group.videos.length,
	}));
	const filteredTag = grouped.filter(
		(group) => getTags === '' || group.tag === getTags,
	);
	const handleSubcategoryClick = (subcategory: string) => {
		if (getSubcategory.includes(subcategory)) {
			setSubcategory(getSubcategory.filter((sub) => sub !== subcategory));
		} else {
			setSubcategory([...getSubcategory, subcategory]);
		}
	};


	const allVideos: Video[] = filteredTag
		.flatMap((group) => group.videos)
		.filter(
			(video) =>
				video.title.toLowerCase().includes(search.toLowerCase()) ||
				video.channelName.toLowerCase().includes(search.toLowerCase()),
		);
	const firstSuggestion : Video | undefined = useMemo(() => {
    if (!search) return undefined;

    return (
       filteredTag.flatMap((group) => group.videos).find((item) =>
        item.title.toLowerCase().startsWith(search.toLowerCase())
      ) || undefined
    );
  }, [search]);

 

	const ConceptList = [
		...new Set(allVideos.map((video) => video.subcategory[0])),
	].toSorted((a, b) => a.localeCompare(b));

	return (
		<div className='h-screen w-screen p-4'>
			<div className=' grid grid-cols-5 grid-rows-7  gap-4 h-full '>
				<Nav
					showComponent={showComponent}
					allVideos={allVideos}
					getSearch={search}
					setSearch={setSearch}
				/>

				{showComponent && (
					<Aside
						showComponent={showComponent}
						setFilterOpen={setFilterOpen}
						setAsideOpen={setAsideOpen}
						getTags={getTags}
						setTags={setTags}
						getSubcategory={getSubcategory}
						setSubcategory={setSubcategory}
						setIsMoreConcepts={setIsMoreConcepts}
						tagList={tagList}
					/>
				)}
				<main className='rounded row-span-6 col-span-full sm:col-span-4 h-full min-h-0 overflow-hidden'>
					<section className='h-full min-h-0 flex flex-col gap-4 '>
						{asideOpen ? (
							<Aside
								showComponent={showComponent}
								setFilterOpen={setFilterOpen}
								setAsideOpen={setAsideOpen}
								getTags={getTags}
								setTags={setTags}
								getSubcategory={getSubcategory}
								setSubcategory={setSubcategory}
								setIsMoreConcepts={setIsMoreConcepts}
								tagList={tagList}
							/>
						) : filterOpen ? (
							<MobileFilter
								allVideos={allVideos}
								getTags={getTags}
								setTags={setTags}
								handleSubcategoryClick={handleSubcategoryClick}
								getSubcategory={getSubcategory}
								setSubcategory={setSubcategory}
								setIsMoreConcepts={setIsMoreConcepts}
								ConceptList={ConceptList}
								isMoreConcepts={isMoreConcepts}
							/>
						) : (
							<Main
								getTags={getTags}
								getSubcategory={getSubcategory}
								handleSubcategoryClick={handleSubcategoryClick}
								allVideos={allVideos}
								ConceptList={ConceptList}
								isMoreConcepts={isMoreConcepts}
								setIsMoreConcepts={setIsMoreConcepts}
								getYouTubeId={getYouTubeId}
							>
								{showComponent && (
									<FilterComponent
										allVideos={allVideos}
										getTags={getTags}
										setTags={setTags}
										handleSubcategoryClick={handleSubcategoryClick}
										getSubcategory={getSubcategory}
										setSubcategory={setSubcategory}
										setIsMoreConcepts={setIsMoreConcepts}
										ConceptList={ConceptList}
										isMoreConcepts={isMoreConcepts}
									/>
								)}
							</Main>
						)}
						{!showComponent && (
							<div className='rounded border-border border-2 w-auto h-15 flex justify-between items-center'>
								<div className='flex items-center'>
									<span
										onClick={() => setAsideOpen(!asideOpen)}
										className={`${searchOpen ? 'hidden ' : ''}  bg-accent cursor-pointer rounded mx-2 w-30 truncate text-zinc-900 px-2 py-1 `}
									>
										{getTags || 'all videos'}
									</span>
									<span
										onClick={() => {
											if (!getTags) return;
											setFilterOpen(!filterOpen);
											setIsMoreConcepts(true);
										}}
										className={`${!getTags ? 'pointer-events-none ' : 'fill-accent bg-zinc-[#283e52] cursor-pointer'} ${filterOpen ? 'fill-border-900 bg-accent ' : 'bg-[#283e52] '} ${searchOpen ? 'hidden ' : ''}  rounded size-6 mx-2`}
									>
										<FilterIcon
											width={15}
											height={15}
											className={`translate-x-1 translate-y-1 `}
										/>
									</span>
								</div>
   <div className={`${searchOpen ? 'grow ml-2' : ' '}  relative w-72 truncate mx-3 `}>
								      <div className="absolute inset-0 flex items-center px-2 py-1 pointer-events-none  text-zinc-500">
										<span className="invisible outline-none">{search}</span>

										<span className="outline-none">
										{firstSuggestion?.title?.slice(search.length).toLowerCase()}
										</span>
									</div>

								<input
									type='text'
									onChange={(e) => {setSearch(e.target.value); }}
									onClick={() => setSearchOpen(true)}
									onBlur={() => setSearchOpen(false)}
									placeholder='Search titles, channels...'
									className={`relative w-full px-1 py-1  bg-transparent border border-border outline-none focus:ring-0 rounded text-white `}
								/>
							</div>
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	);
}
