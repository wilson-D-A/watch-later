import * as React from 'react';
import type { Video } from '../index';

interface INavProps {
	allVideos:Video[];
	getSearch: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	showComponent: boolean;
}

const Nav: React.FunctionComponent<INavProps> = (props) => {
	const { allVideos, getSearch, setSearch, showComponent } = props;
	return (
		<nav className=' rounded col-span-full border-border bg-border/30 border-2 row-span-1 flex justify-center items-center sm:justify-between sm:px-5'>
			<div className='flex flex-col sm:flex-row gap-3 items-center  '>
				<h1 className='text-xl  font-black text-accent'>Watch Later</h1>
				<span className=' inset-shadow-zinc-900/60 inset-shadow-sm text-center px-5 py-1 text-zinc-300 rounded h-auto align-middle bg-border-900'>
					{allVideos?.length} videos
				</span>
			</div>
			{showComponent && (
				<input
					type='text'
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search titles, channels...'
					className='px-2 w-60 py-1 outline-none rounded border border-border bg-background text-zinc-300 '
				/>
			)}
		</nav>
	);
};

export default Nav;
