// vendor imports
import * as React from 'react';

export interface IconProps {
  size?: number;
  fill?: string;
}

const GridIcon = ({ size = 26, fill = 'wheat' }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill={fill}
  >
    <path
      d="M96,176h80V96H96V176z M216,416h80v-80h-80V416z M96,416h80v-80H96V416z M96,296h80v-80H96V296z M216,296h80v-80h-80V296z M336,96v80h80V96H336z M216,176h80V96h-80V176z M336,296h80v-80h-80V296z M336,416h80v-80h-80V416z"
      id="Icon"
    />
  </svg>
);

export default GridIcon;
