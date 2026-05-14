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
	const allVideos = filteredTag.flatMap((group) => group.videos);
	console.log(allVideos);
	return (
		<div className='h-screen w-screen p-4'>
			<div className=' grid grid-cols-5 grid-rows-7 gap-4 h-full '>
				<nav className=' rounded col-span-full bg-blue-400'>
					<h1>Watched Videos</h1>
					<div>{allVideos.length}</div>
					<button>search</button>
				</nav>
				<aside className='relative rounded row-span-6 bg-red-500 h-0min-h-0 overflow-hidden'>
					<h2
						onClick={() => {
							setTags('');
							setSubcategory([]);
						}}
						className='cursor-pointer absolute top-0 left-0 bg-gray-400 w-full h-10 pb-10'
					>
						all videos
					</h2>
					<ul className='overflow-y-scroll w-auto h-full min-h-0 py-10 scrollbar-none'>
						<h2>tags</h2>
						{tagList.map((tag) => (
							<li className=' ' key={tag.tag}>
								<button
									className='cursor-pointer flex justify-between w-full px-2 pb-1  hover:bg-gray-400'
									onClick={() => {
										setTags(tag.tag);
										setSubcategory([]);
									}}
								>
									<span>{tag.tag}</span>
									<span className='ml-2  text-gray-500'>{tag.length}</span>
								</button>
							</li>
						))}
					</ul>
				</aside>
				<main className='rounded row-span-6 col-span-4 h-full min-h-0 overflow-hidden'>
					<section className='h-full min-h-0 flex flex-col gap-4'>
						{getTags && (
							<div className='rounded bg-gray-400 w-auto h-auto'>
								<div>
									<h2>concept</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[0])),
									].map((concept, index) => (
										<span className=' bg-red-400 mx-1' key={index}>
											{concept}
										</span>
									))}
								</div>
								<div>
									<h2>tools</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[1])),
									].map((concept, index) => (
										<span className=' bg-red-400 mx-1' key={index}>
											{concept}
										</span>
									))}
								</div>
								<div>
									<h2>topics</h2>
									{[
										...new Set(allVideos.map((video) => video.subcategory[2])),
									].map((concept, index) => (
										<span className=' bg-red-400 mx-1' key={index}>
											{concept}
										</span>
									))}
								</div>
								{/* <div>
									<h1>tools</h1>
									{allVideos.map((video, index) => (
										<span key={index}>{video.subcategory[1]}</span>
									))}
								</div>
								<div>
									<h1>topics</h1>
									{allVideos.map((video, index) => (
										<span key={index}>{video.subcategory[2]}</span>
									))}
								</div> */}
							</div>
						)}
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
										className='rounded bg-gray-200 w-auto h-56'
									>
										<Image
											src={`https://i.ytimg.com/vi/${getYouTubeId(video.link)}/mqdefault.jpg`}
											alt={video.title}
											width={300}
											height={200}
										/>
										<h1 className='rounded text-sm bg-gray-400 w-auto h-10 overflow-hidden'>
											{video.title}
										</h1>
										<h2 className='rounded text-xs  bg-green-300 w-auto h-auto'>
											{video.channelName}
										</h2>
										<div className='rounded  text-xs w-auto flex flex-wrap gap-1 '>
											<span className='bg-red-200 w-auto h-auto '>
												{video.subcategory[0]}
											</span>
											<span className='bg-red-200 w-auto h-auto'>
												{video.subcategory[1]}
											</span>
											<span className='bg-red-200 w-auto h-auto'>
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
