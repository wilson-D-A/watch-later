import { SVGProps } from 'react';
const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={800}
		height={800}
		viewBox='0 0 1920 1920'
		{...props}
	>
		<path
			fillRule='evenodd'
			d='M1672.853 0 1171.84 640H748.053L426.56 213.333h637.227L1241.173 0H0l746.667 991.147V1600l426.56 320V991.147L1920 0z'
		/>
	</svg>
);
export default FilterIcon;
