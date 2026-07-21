import { SVGProps } from "react";
const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#000"
      d="M8.293 3.707 1 11v4h4l7.293-7.293-4-4ZM9.707 2.293l4 4 1.465-1.465a2.829 2.829 0 0 0-4-4L9.707 2.293Z"
    />
  </svg>
);
export default Edit;
