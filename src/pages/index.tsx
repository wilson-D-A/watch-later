import tags from '@/pages/api/watchlater_grouped.json';

import { useEffect, useState } from 'react';
import Aside from './components/aside';
import Main from './components/main';
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
								getTags={getTags}
								setTags={setTags}
								getSubcategory={getSubcategory}
								setSubcategory={setSubcategory}
								setIsMoreConcepts={setIsMoreConcepts}
								tagList={tagList}
							/>
						) : filterOpen ? (
							getTags && (
								<div className='rounded  border-border border-2 w-auto h-auto'>
									<div className='flex flex-wrap gap-2 mx-2 my-2 '>
										<h2>concept</h2>
										{ConceptList.slice(
											0,
											isMoreConcepts ? ConceptList.length : 10,
										).map((concept, index) => (
											<span
												onClick={() => handleSubcategoryClick(concept)}
												className={`${getSubcategory.includes(concept) ? 'bg-concept ring-[#aad97d] text-zinc-200' : 'ring-border'} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
												key={index}
											>
												{concept}
											</span>
										))}
										{ConceptList.length > 10 && (
											<span
												onClick={() => setIsMoreConcepts(!isMoreConcepts)}
												className='cursor-pointer text-zinc-900 hover:bg-accent/50 hover:text-zinc-200 bg-accent ring-1 ring-border px-2 py-1 rounded'
											>
												{isMoreConcepts ? 'less' : 'more'}
											</span>
										)}
									</div>
									<div className='flex flex-wrap gap-2 mx-2 my-2'>
										<h2>tools</h2>
										{[
											...new Set(
												allVideos.map((video) => video.subcategory[1]),
											),
										].map((tools, index) => (
											<span
												onClick={() => handleSubcategoryClick(tools)}
												className={`${getSubcategory.includes(tools) ? ' bg-tools ring-[#5a97d6] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
												key={index}
											>
												{tools}
											</span>
										))}
									</div>
									<div className='flex flex-wrap gap-2 mx-2 my-2'>
										<h2>topic</h2>
										{[
											...new Set(
												allVideos.map((video) => video.subcategory[2]),
											),
										].map((topics, index) => (
											<span
												onClick={() => handleSubcategoryClick(topics)}
												className={`${getSubcategory.includes(topics) ? ' bg-topics ring-[#b7a1ff] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
												key={index}
											>
												{topics}
											</span>
										))}
									</div>
								</div>
							)
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
							/>
						)}
						<div className='rounded border-border border-2 w-auto h-20 flex justify-between items-center'>
							<div className='flex items-center'>
								<span
									onClick={() => setAsideOpen(!asideOpen)}
									className='bg-accent cursor-pointer rounded mx-2 w-30 truncate text-zinc-900 px-2 py-1 '
								>
									{getTags || 'all videos'}
								</span>
								<span
									onClick={() => setFilterOpen(!filterOpen)}
									className='text-zinc-400  mx-2'
								>
									⦿
								</span>
							</div>
							<input
								type='text'
								onChange={(e) => setSearch(e.target.value)}
								placeholder='Search titles, channels...'
								className='px-2 mr-2 rounded border border-border bg-background text-zinc-300 '
							/>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
