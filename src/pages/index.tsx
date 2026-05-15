import tags from '@/pages/api/watchlater_grouped.json';
import Image from 'next/image';
import { useState } from 'react';

function getYouTubeId(url: string): string | null {
	const match = url.match(
		/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
	);
	return match ? match[1] : null;
}
export default function Home() {
	const [getTags, setTags] = useState<string>('');
	const [getSubcategory, setSubcategory] = useState<string[]>([]);

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

	const allVideos = filteredTag.flatMap((group) => group.videos);
	console.log(getSubcategory);
	return (
		<div className='h-screen w-screen p-4'>
			<div className=' grid grid-cols-5 grid-rows-7 gap-4 h-full '>
				<nav className=' rounded col-span-full border-border bg-border/50 border-2 row-span-1 flex items-center justify-between px-5'>
					<div className='flex  gap-3 items-center'>
						<h1 className='text-xl font-black text-accent'>Watched Videos</h1>
						<span className='text-md font-medium text-foreground'>
							{allVideos.length} videos
						</span>
					</div>
					<button>search</button>
				</nav>
				<aside className='relative rounded row-span-6 border-border border-2 min-h-0 overflow-hidden'>
					<div className='flex absolute top-0 left-0 bg-background justify-center border-b-2 border-border w-full py-5 mb-10'>
						<span
							onClick={() => {
								setTags('');
								setSubcategory([]);
							}}
							className={`cursor-pointer text-center px-5 py-1 text-zinc-600 rounded h-auto align-middle  ${getTags === '' ? 'bg-accent text-zinc-100' : 'bg-zinc-900'}`}
						>
							all videos
						</span>
					</div>
					<ul className='overflow-y-scroll w-auto h-full mx-3 min-h-0 pt-20 scrollbar-none'>
						<h2 className=' mb-2'>tags</h2>
						{tagList.map((tag) => (
							<li className=' ' key={tag.tag}>
								<button
									className={`${getTags === tag.tag ? 'bg-accent text-zinc-100' : ''} rounded hover:text-zinc-100 cursor-pointer flex justify-between w-full px-2 py-1 pb-1  hover:bg-zinc-900  text-zinc-600`}
									onClick={() => {
										setTags(tag.tag);
										setSubcategory([]);
									}}
								>
									<span className='w-28 text-start overflow-hidden'>
										{tag.tag}
									</span>
									<span className='ml-2  text-gray-500'>{tag.length}</span>
								</button>
							</li>
						))}
					</ul>
				</aside>
				<main className='rounded row-span-6 col-span-4 h-full min-h-0 overflow-hidden'>
					<section className='h-full min-h-0 flex flex-col gap-4 '>
						{getTags && (
							<div className='rounded  border-border border-2 w-auto h-auto'>
								<div className='flex flex-wrap gap-2 mx-2 my-2'>
									<h2>concept</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[0])),
									].map((concept, index) => (
										<span
											onClick={() => handleSubcategoryClick(concept)}
											className={`${getSubcategory.includes(concept) ? 'ring-[#aad97d] text-zinc-200 bg-[#aad97d]' : 'ring-border '}cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
											key={index}
										>
											{concept}
										</span>
									))}
								</div>
								<div className='flex flex-wrap gap-2 mx-2 my-2'>
									<h2>tools</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[1])),
									].map((tools, index) => (
										<span
											onClick={() => handleSubcategoryClick(tools)}
											className={`${getSubcategory.includes(tools) ? 'ring-[#5a97d6] text-zinc-200 bg-tools' : 'ring-border '}cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
											key={index}
										>
											{tools}
										</span>
									))}
								</div>
								<div className='flex flex-wrap gap-2 mx-2 my-2'>
									<h2>topic</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[2])),
									].map((topics, index) => (
										<span
											onClick={() => handleSubcategoryClick(topics)}
											className={`${getSubcategory.includes(topics) ? 'ring-[#b7a1ff] text-zinc-200 bg-topics' : 'ring-border '}cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
											key={index}
										>
											{topics}
										</span>
									))}
								</div>
							</div>
						)}
						<div className='rounded border-border border-2 w-auto h-8'></div>
						<section
							className={` grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 flex-1 min-h-0 overflow-y-auto scrollbar-none`}
						>
							{allVideos
								.filter((video) =>
									getSubcategory.length > 0
										? video.subcategory.some((subcategory) =>
												getSubcategory.includes(subcategory),
											)
										: true,
								)
								.map((video) => (
									<div
										key={video.index}
										className='flex flex-col justify-between  rounded border-border bg-border/50 border-2 min-w-60 h-72 '
									>
										<Image
											src={`https://i.ytimg.com/vi/${getYouTubeId(video.link)}/mqdefault.jpg`}
											alt={video.title}
											width={300}
											height={200}
										/>
										<h2 className='mt-1 px-2  text-center rounded w-full h-auto truncate'>
											{video.title}
										</h2>
										<span className=' ml-2 rounded text-xs text-zinc-400 w-auto h-auto'>
											{video.channelName}
										</span>
										<div className='mx-2 mb-2 rounded  text-xs w-auto flex flex-wrap gap-1 '>
											<span className='ring-[#aad97d] ring-1 px-1 text-zinc-400 rounded bg-concept w-auto h-auto '>
												{video.subcategory[0]}
											</span>
											<span className='ring-[#5a97d6] ring-1 px-1 rounded text-zinc-400 bg-tools w-auto h-auto'>
												{video.subcategory[1]}
											</span>
											<span className='ring-[#b7a1ff] ring-1 px-1  rounded text-zinc-400 bg-topics w-auto h-auto'>
												{video.subcategory[2]}
											</span>
										</div>
									</div>
								))}
						</section>
					</section>
					<section></section>
				</main>
			</div>
		</div>
	);
}
