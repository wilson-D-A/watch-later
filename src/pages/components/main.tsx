import Image from 'next/image';
import * as React from 'react';
interface IMainProps {
	getTags: string;
	getSubcategory: string[];
	handleSubcategoryClick: (subcategory: string) => void;
	allVideos: {
		index: number;
		title: string;
		channelName: string;
		link: string;
		subcategory: string[];
	}[];
	ConceptList: string[];
	isMoreConcepts: boolean;
	setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
	getYouTubeId: (url: string) => string | null;
	children?: React.ReactNode;
}

const Main: React.FunctionComponent<IMainProps> = ({
	getSubcategory,
	allVideos,
	getYouTubeId,
	children,
}) => {
	return (
		<>
			{children}
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
						<button
							key={video.index}
							onClick={() => window.open(video.link, '_blank')}
							className='cursor-pointer flex flex-col justify-between  rounded border-border bg-border/50 border-2 min-w-60 h-72 '
						>
							<div className='relative w-full h-40 mb-2'>
								<Image
									src={`https://i.ytimg.com/vi/${getYouTubeId(video.link)}/mqdefault.jpg`}
									alt={video.title}
									fill
									sizes='(max-width: 768px) 100vw, 300px'
									className='object-cover rounded-t'
								/>
							</div>
							<div className='grow'>
								<h2 className='mt-1 px-2 block text-center md:text-start rounded w-full h-auto line-clamp-2'>
									{video.title}
								</h2>
								<span className=' ml-2 rounded  block text-center md:text-start  text-zinc-400 w-full h-auto'>
									{video.channelName}
								</span>
							</div>
							<div className='mx-2 mb-2 rounded  text-xs w-auto flex flex-wrap gap-2 '>
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
						</button>
					))}
			</section>
		</>
	);
};

export default Main;
