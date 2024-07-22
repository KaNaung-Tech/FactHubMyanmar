import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackArrowIcon = ({width = 20, height = 20, color = '#000000'}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M3.33331 10.0001H16.6666M3.33331 10.0001L6.66665 6.66675M3.33331 10.0001L6.66665 13.3334"
      stroke={color}
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default BackArrowIcon;
