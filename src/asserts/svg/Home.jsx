import React from 'react';
import Svg, { G, Path, ClipPath, Defs, Rect } from 'react-native-svg';

const HomeIcon = ({ color }) => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <G clipPath="url(#clip0_339_997)">
      <Path d="M1.33325 8.1361C1.33325 6.61049 1.33325 5.84768 1.67939 5.21532C2.02552 4.58297 2.65789 4.1905 3.92261 3.40558L5.25594 2.57808C6.59284 1.74836 7.26132 1.3335 7.99992 1.3335C8.73852 1.3335 9.40698 1.74836 10.7439 2.57808L12.0773 3.40558C13.342 4.1905 13.9743 4.58297 14.3205 5.21532C14.6666 5.84768 14.6666 6.61049 14.6666 8.1361V9.15016C14.6666 11.7507 14.6666 13.051 13.8855 13.8589C13.1045 14.6668 11.8474 14.6668 9.33325 14.6668H6.66658C4.15243 14.6668 2.89535 14.6668 2.1143 13.8589C1.33325 13.051 1.33325 11.7507 1.33325 9.15016V8.1361Z" stroke={color} />
      <Path d="M10 12H6" stroke={color} strokeLinecap="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_339_997">
        <Rect width="16" height="16" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default HomeIcon;
