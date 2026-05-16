import * as React from 'react';

interface IFilterProps {
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

const Filter: React.FunctionComponent<IFilterProps> = ({
	allVideos,
	getTags,
	getSubcategory,
	handleSubcategoryClick,
	setIsMoreConcepts,
	ConceptList,
	isMoreConcepts,
}) => {
	return (
		<>
			{getTags && (
				<div className='grow sm:grow-0 rounded  border-border border-2 w-auto h-auto '>
					<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2 '>
						<h2>concept</h2>
						{ConceptList?.slice(0, isMoreConcepts ? ConceptList.length : 10)?.map(
							(concept, index) => (
								<span
									onClick={() => handleSubcategoryClick(concept)}
									className={`${getSubcategory.includes(concept) ? 'bg-concept ring-[#aad97d] text-zinc-200' : 'ring-border'} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
									key={index}
								>
									{concept}
								</span>
							),
						)}
						{ConceptList?.length > 10 && (
							<span
								onClick={() => setIsMoreConcepts(!isMoreConcepts)}
								className='cursor-pointer text-zinc-900 hover:bg-accent/50 hover:text-zinc-200 bg-accent ring-1 ring-border px-2 py-1 rounded'
							>
								{isMoreConcepts ? 'less' : 'more'}
							</span>
						)}
					</div>
					<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2'>
						<h2>tools</h2>
						{[...new Set(allVideos?.map((video) => video.subcategory[1]))]?.map(
							(tools, index) => (
								<span
									onClick={() => handleSubcategoryClick(tools)}
									className={`${getSubcategory.includes(tools) ? ' bg-tools ring-[#5a97d6] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
									key={index}
								>
									{tools}
								</span>
							),
						)}
					</div>
					<div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 mx-2 my-2'>
						<h2>topic</h2>
						{[...new Set(allVideos?.map((video) => video.subcategory[2]))]?.map(
							(topics, index) => (
								<span
									onClick={() => handleSubcategoryClick(topics)}
									className={`${getSubcategory.includes(topics) ? ' bg-topics ring-[#b7a1ff] text-zinc-200' : 'ring-border '} cursor-pointer  ring-1 px-1 py-1 text-zinc-400 rounded  w-auto h-auto `}
									key={index}
								>
									{topics}
								</span>
							),
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Filter;
