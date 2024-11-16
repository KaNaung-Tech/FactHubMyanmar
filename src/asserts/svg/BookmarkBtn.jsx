import React, { useState } from 'react';
import { Svg, Path } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookmarkBtn = ({width, height, fill, onPress, isBookmarked}) => {
 

  return (
    <TouchableOpacity onPress={onPress}>
      {isBookmarked ? (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 20 20"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.76182 2H14.3333C15.1223 2 15.7618 2.67158 15.7618 3.5V18L10.0475 14L4.33325 18V3.5C4.33325 2.67158 4.97284 2 5.76182 2ZM10.5833 6C10.5833 5.67783 10.3221 5.41667 9.99992 5.41667C9.67775 5.41667 9.41658 5.67783 9.41658 6V7.75H7.66659C7.34442 7.75 7.08325 8.01117 7.08325 8.33333C7.08325 8.6555 7.34442 8.91667 7.66659 8.91667H9.41658V10.6667C9.41658 10.9888 9.67775 11.25 9.99992 11.25C10.3221 11.25 10.5833 10.9888 10.5833 10.6667V8.91667H12.3333C12.6554 8.91667 12.9166 8.6555 12.9166 8.33333C12.9166 8.01117 12.6554 7.75 12.3333 7.75H10.5833V6Z"
            fill="#F56200"
          />
        </Svg>
      ) : (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 14 18"
          fill={fill}
          xmlns="http://www.w3.org/2000/svg">
          <Path
            d="M4.71434 7.28571H9.28577M7.00005 5V9.57143M2.71434 1H11.2858C12.0748 1 12.7143 1.67158 12.7143 2.5V17L7.00005 13L1.28577 17V2.5C1.28577 1.67158 1.92536 1 2.71434 1Z"
            stroke="#71758E"
            strokeWidth="1.14286"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
};

export default BookmarkBtn;
