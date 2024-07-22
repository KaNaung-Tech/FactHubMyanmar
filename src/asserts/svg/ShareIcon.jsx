import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShareIcon = ({ width, height, color }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.50004 10.0001C7.50004 11.1507 6.5673 12.0834 5.41671 12.0834C4.26612 12.0834 3.33337 11.1507 3.33337 10.0001C3.33337 8.8495 4.26612 7.91675 5.41671 7.91675C6.5673 7.91675 7.50004 8.8495 7.50004 10.0001Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <Path
        d="M11.6667 5.41675L7.5 8.33341"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <Path
        d="M11.6667 14.5834L7.5 11.6667"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <Path
        d="M15.8333 15.4166C15.8333 16.5672 14.9005 17.4999 13.75 17.4999C12.5994 17.4999 11.6666 16.5672 11.6666 15.4166C11.6666 14.266 12.5994 13.3333 13.75 13.3333C14.9005 13.3333 15.8333 14.266 15.8333 15.4166Z"
        stroke={color}
        strokeWidth="1.25"
      />
      <Path
        d="M15.8333 4.58333C15.8333 5.73392 14.9005 6.66667 13.75 6.66667C12.5994 6.66667 11.6666 5.73392 11.6666 4.58333C11.6666 3.43274 12.5994 2.5 13.75 2.5C14.9005 2.5 15.8333 3.43274 15.8333 4.58333Z"
        stroke={color}
        strokeWidth="1.25"
      />
    </Svg>
  );
};

export default ShareIcon;
