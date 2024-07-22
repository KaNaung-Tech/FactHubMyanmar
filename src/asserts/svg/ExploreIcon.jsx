import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ExploreIcon = ({ color, filled }) => (
  <Svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outline of the icon */}
    <Path
      fill={filled ? color : 'none'}
      stroke={color} // Add stroke to ensure visibility even when filled is false
      strokeWidth="1.5" // Adjust stroke width as needed
      d="M7.2215 11.6977C4.46892 11.6977 2.23754 9.50524 2.23754 6.79642C2.23754 4.08759 4.46892 1.89079 7.2215 1.89079C9.97409 1.89079 12.2059 4.08759 12.2059 6.79642C12.2059 9.50524 9.97409 11.6977 7.2215 11.6977ZM15.1983 14.2358L11.5841 10.678C12.5302 9.64965 13.1118 8.29306 13.1118 6.79642C13.1118 3.59309 10.4747 0.998047 7.2215 0.998047C3.96829 0.998047 1.33124 3.59309 1.33124 6.79642C1.33124 9.99537 3.96829 12.5904 7.2215 12.5904C8.62712 12.5904 9.91633 12.1047 10.929 11.2951L14.5577 14.866C14.7349 15.041 15.0215 15.041 15.1983 14.866C15.3755 14.6953 15.3755 14.4109 15.1983 14.2358Z"
    />
    {/* Circle inside the icon */}
    {/* <Path
      fill={color} // Fill with color to represent the circle inside
      d="M7.2215 6.79642C7.2215 7.85915 6.39548 8.70415 5.37843 8.70415C4.36139 8.70415 3.5354 7.85915 3.5354 6.79642C3.5354 5.73369 4.36139 4.88867 5.37843 4.88867C6.39548 4.88867 7.2215 5.73369 7.2215 6.79642Z"
    /> */}
  </Svg>
);

export default ExploreIcon;
