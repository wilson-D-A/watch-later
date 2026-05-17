import * as React from 'react';

interface IAsideProps {
	getTags: string;
	setTags: React.Dispatch<React.SetStateAction<string>>;
	getSubcategory: string[];
	setSubcategory: React.Dispatch<React.SetStateAction<string[]>>;
	setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
	tagList: { tag: string; length: number }[];
	setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
	showComponent: boolean;
}

const Aside: React.FunctionComponent<IAsideProps> = ({
	getTags,
	setTags,
	setSubcategory,
	setIsMoreConcepts,
	showComponent,
	tagList,
	setAsideOpen,
	setFilterOpen,
}) => {
	return (
		<aside className='relative rounded row-span-6 border-border border-2 min-h-0 overflow-hidden'>
			<div className='flex absolute top-0 left-0 bg-background justify-center border-b-2 inset-shadow-sm border-border w-full py-5 mb-10'>
				<span
					onClick={() => {
						if (!showComponent) {
							setAsideOpen(false);
							setFilterOpen(false);
						}

						setTags('');
						setSubcategory([]);
					}}
					className={`cursor-pointer text-center px-1 md:px-5 py-1 text-zinc-300 rounded h-auto align-middle  ${getTags === '' ? '  bg-accent text-zinc-900' : ' bg-border-900 text-zinc-300 inset-shadow-zinc-900/60 inset-shadow-sm'}`}
				>
					all videos
				</span>
			</div>
			<ul className='overflow-y-scroll w-auto h-full mx-3 min-h-0 pt-20 scrollbar-none'>
				<h2 className=' mb-2'>tags</h2>
				{tagList?.map((tag) => (
					<li className=' ' key={tag.tag}>
						<button
							className={`${getTags === tag.tag ? 'bg-accent text-zinc-900' : ''} rounded hover:text-zinc-100 cursor-pointer flex justify-between w-full px-2 py-1 pb-1  hover:bg-zinc-900  text-zinc-400`}
							onClick={() => {
								if (!showComponent) {
									setAsideOpen(false);
								}
								setTags(tag.tag);
								setSubcategory([]);
								setIsMoreConcepts(false);
							}}
						>
							<span className='w-28 text-start overflow-hidden'>{tag.tag}</span>
							{
								<span className='ml-2  text-zinc-500 hidden md:inline'>
									{tag.length}
								</span>
							}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Aside;
