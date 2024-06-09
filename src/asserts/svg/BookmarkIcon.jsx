import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BookmarkIcon = ({color}) => (
  <Svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M14.6667 10.7274V7.3985C14.6667 4.53944 14.6667 3.1099 13.788 2.2217C12.9094 1.3335 11.4951 1.3335 8.66669 1.3335C5.83826 1.3335 4.42405 1.3335 3.54537 2.2217C2.66669 3.1099 2.66669 4.53944 2.66669 7.3985V10.7274C2.66669 12.7918 2.66669 13.824 3.15609 14.275C3.38949 14.4902 3.68412 14.6253 3.99797 14.6612C4.65603 14.7365 5.42451 14.0568 6.96146 12.6974C7.64082 12.0965 7.98055 11.796 8.37355 11.7169C8.56709 11.6779 8.76629 11.6779 8.95982 11.7169C9.35282 11.796 9.69255 12.0965 10.3719 12.6974C11.9089 14.0568 12.6774 14.7365 13.3354 14.6612C13.6493 14.6253 13.9439 14.4902 14.1773 14.275C14.6667 13.824 14.6667 12.7918 14.6667 10.7274Z"
      stroke="#71758E"
    />
    <Path d="M10.6667 4H6.66669" stroke="#71758E" stroke-linecap="round" />
  </Svg>
);

export default BookmarkIcon;
