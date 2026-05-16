import tags from '@/pages/api/watchlater_grouped.json';

import { useEffect, useState } from 'react';
import FilterIcon from '../../public/FilterIcon';
import Aside from './components/aside';
import Main from './components/main';
import FilterComponent from './FilterComponent';
import Nav from './nav';

function getYouTubeId(url: string): string | null {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	);
	return match ? match[1] : null;
}

export default function Home() {
	const [getTags, setTags] = useState<string>('');
	const [getSearch, setSearch] = useState<string>('');
	const [asideOpen, setAsideOpen] = useState<boolean>(false);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const [getSubcategory, setSubcategory] = useState<string[]>([]);
	const [isMoreConcepts, setIsMoreConcepts] = useState<boolean>(false);
	const [showComponent, setShowComponent] = useState<boolean>(false);

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

	const allVideos = filteredTag
		.flatMap((group) => group.videos)
		.filter(
			(video) =>
				video.title.toLowerCase().includes(getSearch.toLowerCase()) ||
				video.channelName.toLowerCase().includes(getSearch.toLowerCase()),
		);
	const ConceptList = [
		...new Set(allVideos.map((video) => video.subcategory[0])),
	].toSorted((a, b) => a.localeCompare(b));

	return (
		<div className='h-screen w-screen p-4'>
			<div className=' grid grid-cols-5 grid-rows-7  gap-4 h-full '>
				<Nav
					showComponent={showComponent}
					allVideos={allVideos}
					getSearch={getSearch}
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
										className='bg-accent cursor-pointer rounded mx-2 w-30 truncate text-zinc-900 px-2 py-1 '
									>
										{getTags || 'all videos'}
									</span>
									<span
										onClick={() => {
											if (!getTags) return;
											setFilterOpen(!filterOpen);
										}}
										className={`${!getTags ? 'pointer-events-none ' : 'fill-accent cursor-pointer'} text-zinc-400  mx-2`}
									>
										<FilterIcon width={16} height={16} className={` `} />
									</span>
								</div>
								<input
									type='text'
									onChange={(e) => setSearch(e.target.value)}
									placeholder='Search titles, channels...'
									className='px-2 mr-2 rounded border border-border bg-background text-zinc-300 '
								/>
							</div>
						)}
					</section>
				</main>
			</div>
		</div>
	);
}
