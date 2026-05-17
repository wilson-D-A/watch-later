import * as React from 'react';

interface IMobileFilterProps {
	allVideos: {
		index: number;
		title: string;
		channelName: string;
		link: string;
		subcategory: string[];
	}[];
	getTags: string;
	setTags: React.Dispatch<React.SetStateAction<string>>;
	handleSubcategoryClick: (subcategory: string) => void;
	getSubcategory: string[];
	setSubcategory: React.Dispatch<React.SetStateAction<string[]>>;
	setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
	ConceptList: string[];
	isMoreConcepts: boolean;
}

const MobileFilter: React.FunctionComponent<IMobileFilterProps> = ({
	allVideos,
	getTags,
	setTags,
	getSubcategory,
	handleSubcategoryClick,
	setIsMoreConcepts,
	ConceptList,
	isMoreConcepts,
}) => {
	return (
		<>
			{getTags && (
				<div className='grow sm:grow-0 rounded  border-border border-2 w-auto h-auto flex-1 min-h-0 overflow-y-auto scrollbar-none '>
					<div className='flex  mx-5 my-2 justify-between '>
						<h2
							onClick={() => setIsMoreConcepts(true)}
							className={`${isMoreConcepts ? 'bg-accent text-zinc-900' : 'bg-border-900 inset-shadow-zinc-900/60 inset-shadow-sm text-zinc-300'} text-sm grow   cursor-pointer rounded-l-lg px-4 py-1 `}
						>
							concepts
						</h2>
						<div
							onClick={() => setIsMoreConcepts(false)}
							className={`${!isMoreConcepts ? 'bg-accent *:text-zinc-900 ' : 'bg-border-900 inset-shadow-zinc-900/60 inset-shadow-sm'} flex gap-2 p-1  rounded-r-lg  cursor-pointer  px-5 py-1  `}
						>
							<h2 className='text-sm'>tools</h2>
							<h2 className='text-sm'>&</h2>
							<h2 className='text-sm'> topics</h2>
						</div>
					</div>
					<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2 '>
						{isMoreConcepts &&
							ConceptList?.map((concept, index) => (
								<span
									onClick={() => handleSubcategoryClick(concept)}
									className={`${getSubcategory.includes(concept) ? 'bg-concept ring-[#aad97d] text-zinc-200' : 'ring-border'} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
									key={index}
								>
									{concept}
								</span>
							))}
					</div>
					{!isMoreConcepts && (
						<>
							<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2'>
								<h2 className='text-sm text-zinc-400'>tools</h2>
								{[
									...new Set(allVideos?.map((video) => video.subcategory[1])),
								]?.map((tools, index) => (
									<span
										onClick={() => handleSubcategoryClick(tools)}
										className={`${getSubcategory.includes(tools) ? ' bg-tools ring-[#5a97d6] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
										key={index}
									>
										{tools}
									</span>
								))}
							</div>
							<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2'>
								<h2 className='text-sm text-zinc-400'>topics</h2>
								{[
									...new Set(allVideos?.map((video) => video.subcategory[2])),
								]?.map((topics, index) => (
									<span
										onClick={() => handleSubcategoryClick(topics)}
										className={`${getSubcategory.includes(topics) ? ' bg-topics ring-[#b7a1ff] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
										key={index}
									>
										{topics}
									</span>
								))}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default MobileFilter;
