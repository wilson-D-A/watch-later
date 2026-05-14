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
	const filteredTag = grouped.filter((group) => group.tag === getTags);
	const allVideos = filteredTag.flatMap((group) => group.videos);
	console.log(allVideos);
	return (
		<div className='h-screen w-screen p-4'>
			<div className=' grid grid-cols-5 grid-rows-7 gap-4 h-full '>
				<nav className=' rounded col-span-full bg-blue-400'>.</nav>
				<aside className='relative rounded row-span-6 bg-red-500 h-0min-h-0 overflow-hidden'>
					<div className='absolute top-0 left-0 bg-gray-400 w-full h-10 pb-10'>
						.
					</div>
					<ul className='overflow-y-scroll w-auto h-full min-h-0 py-10 scrollbar-none'>
						<li>tags</li>
						{tagList.map((tag) => (
							<li className=' ' key={tag.tag}>
								<button
									className='cursor-pointer'
									onClick={() => {
										setTags(tag.tag);
										setSubcategory([]);
									}}
								>
									<span>{tag.tag}</span>
									<span className='ml-2 text-sm text-gray-500'>
										{tag.length}
									</span>
								</button>
							</li>
						))}
					</ul>
				</aside>
				<main className='rounded row-span-6 col-span-4 h-full min-h-0 overflow-hidden'>
					<section className='h-full min-h-0 flex flex-col gap-4'>
						<div className='rounded bg-gray-400 w-auto h-auto'>
							{[
								...new Set(allVideos.map((video) => video.subcategory).flat()),
							].map((subcategory) => (
								<button
									onClick={() =>
										setSubcategory((prev) => {
											if (prev.includes(subcategory)) {
												return prev.filter((item) => item !== subcategory);
											} else {
												return [...prev, subcategory];
											}
										})
									}
									key={subcategory}
									className='mr-2 cursor-pointer inline'
								>
									{subcategory}
								</button>
							))}
						</div>
						<div className='rounded bg-gray-300 w-auto h-8'></div>
						<section
							className={`${allVideos.length < 9 ? 'grid-rows-3' : 'xl:grid-rows-3'} grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 flex-1 min-h-0 overflow-y-auto scrollbar-none`}
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
										className='rounded bg-gray-200 w-auto h-50'
									>
										<div className='rounded bg-gray-400 w-auto h-10'>
											{video.title}
										</div>
										<Image
											src={`https://i.ytimg.com/vi/${getYouTubeId(video.link)}/mqdefault.jpg`}
											alt={video.title}
											width={300}
											height={200}
										/>
										<div className='rounded bg-gray-300 w-auto h-8'>
											{video.channelName}
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
