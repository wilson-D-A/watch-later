import * as React from 'react';

interface IAsideProps {
	getCategory: string;
	setCategory: React.Dispatch<React.SetStateAction<string>>;
	getTag: string[];
	setTag: React.Dispatch<React.SetStateAction<string[]>>;
	setIsMoreConcepts: React.Dispatch<React.SetStateAction<boolean>>;
	categoryCount: Record<string, number>;
	setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
	showComponent: boolean;
}

const Aside: React.FunctionComponent<IAsideProps> = ({
	getCategory,
	setCategory,
	setTag,
	setIsMoreConcepts,
	showComponent,
	categoryCount,
	setAsideOpen,
	setFilterOpen,
}) => {
	return (
		<aside className='relative rounded row-span-6 border-border border-2 min-h-0 overflow-hidden'>
			<div className='flex absolute top-0 left-0 bg-bg justify-center border-b-2 inset-shadow-sm border-border w-full py-5 mb-10'>
				<span
					onClick={() => {
						if (!showComponent) {
							setAsideOpen(false);
							setFilterOpen(false);
						}

						setCategory('');
						setTag([]);
					}}
					className={`cursor-pointer text-center px-1 md:px-5 py-1 text-zinc-300 rounded h-auto align-middle  ${getCategory === '' ? '  bg-accent text-zinc-900' : ' bg-border-900 text-zinc-300 inset-shadow-zinc-900/60 inset-shadow-sm'}`}
				>
					all videos
				</span>
			</div>
			<ul className='overflow-y-scroll w-auto h-full mx-3 min-h-0 pt-20 scrollbar-none'>
				<h2 className=' mb-2'>tags</h2>
				{Object.entries(categoryCount)?.map(([category, count]) => (
					<li className=' ' key={category}>
						<button
							className={`${getCategory === category ? 'bg-accent text-zinc-900' : ''} rounded hover:text-zinc-100 text-5xl cursor-pointer flex justify-between w-full my-3 px-2 py-3   hover:bg-zinc-900  text-zinc-400 align-middle`}
							onClick={() => {
								if (!showComponent) {
									setAsideOpen(false);
								}
								setCategory(category);
								setTag([]);
								setIsMoreConcepts(false);
							}}
						>
							<span className='w-28 text-start overflow-hidden'>{category}</span>
							{
								<span className='ml-2  text-zinc-500 hidden md:inline'>
									{count}
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
