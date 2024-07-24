import React from 'react';
import {useTheme} from './themeContext';

const ArticleIcon = () => {
  const {theme} = useTheme();

  return theme === 'dark' ? (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#2D2F39" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 11.333V20.6663C22.5 21.3294 22.2366 21.9653 21.7678 22.4341C21.2989 22.903 20.663 23.1663 20 23.1663H12C11.337 23.1663 10.7011 22.903 10.2322 22.4341C9.76339 21.9653 9.5 21.3294 9.5 20.6663V11.333C9.5 10.67 9.76339 10.0341 10.2322 9.56524C10.7011 9.0964 11.337 8.83301 12 8.83301H20C20.663 8.83301 21.2989 9.0964 21.7678 9.56524C22.2366 10.0341 22.5 10.67 22.5 11.333ZM21.5 11.333C21.5 10.9352 21.342 10.5537 21.0607 10.2723C20.7794 9.99104 20.3978 9.83301 20 9.83301H12C11.6022 9.83301 11.2206 9.99104 10.9393 10.2723C10.658 10.5537 10.5 10.9352 10.5 11.333V20.6663C10.5 21.0642 10.658 21.4457 10.9393 21.727C11.2206 22.0083 11.6022 22.1663 12 22.1663H20C20.3978 22.1663 20.7794 22.0083 21.0607 21.727C21.342 21.4457 21.5 21.0642 21.5 20.6663V11.333Z"
        fill="#AAACBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0001 11.5C16.1327 11.5 16.2599 11.5527 16.3536 11.6464C16.4474 11.7402 16.5001 11.8674 16.5001 12C16.5001 12.1326 16.4474 12.2598 16.3536 12.3536C16.2599 12.4473 16.1327 12.5 16.0001 12.5H12.6667C12.5341 12.5 12.407 12.4473 12.3132 12.3536C12.2194 12.2598 12.1667 12.1326 12.1667 12C12.1667 11.8674 12.2194 11.7402 12.3132 11.6464C12.407 11.5527 12.5341 11.5 12.6667 11.5H16.0001ZM19.3334 14.1667C19.466 14.1667 19.5932 14.2193 19.687 14.3131C19.7807 14.4069 19.8334 14.5341 19.8334 14.6667C19.8334 14.7993 19.7807 14.9265 19.687 15.0202C19.5932 15.114 19.466 15.1667 19.3334 15.1667H12.6667C12.5341 15.1667 12.407 15.114 12.3132 15.0202C12.2194 14.9265 12.1667 14.7993 12.1667 14.6667C12.1667 14.5341 12.2194 14.4069 12.3132 14.3131C12.407 14.2193 12.5341 14.1667 12.6667 14.1667H19.3334ZM19.3334 16.8333C19.466 16.8333 19.5932 16.886 19.687 16.9798C19.7807 17.0735 19.8334 17.2007 19.8334 17.3333C19.8334 17.4659 19.7807 17.5931 19.687 17.6869C19.5932 17.7807 19.466 17.8333 19.3334 17.8333H12.6667C12.5341 17.8333 12.407 17.7807 12.3132 17.6869C12.2194 17.5931 12.1667 17.4659 12.1667 17.3333C12.1667 17.2007 12.2194 17.0735 12.3132 16.9798C12.407 16.886 12.5341 16.8333 12.6667 16.8333H19.3334ZM19.3334 19.5C19.466 19.5 19.5932 19.5527 19.687 19.6464C19.7807 19.7402 19.8334 19.8674 19.8334 20C19.8334 20.1326 19.7807 20.2598 19.687 20.3536C19.5932 20.4473 19.466 20.5 19.3334 20.5H12.6667C12.5341 20.5 12.407 20.4473 12.3132 20.3536C12.2194 20.2598 12.1667 20.1326 12.1667 20C12.1667 19.8674 12.2194 19.7402 12.3132 19.6464C12.407 19.5527 12.5341 19.5 12.6667 19.5H19.3334Z"
        fill="#AAACBB"
      />
    </svg>
  ) : theme === 'eyeProtection' ? (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#FFFCEB" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 11.3335V20.6668C22.5 21.3299 22.2366 21.9658 21.7678 22.4346C21.2989 22.9034 20.663 23.1668 20 23.1668H12C11.337 23.1668 10.7011 22.9034 10.2322 22.4346C9.76339 21.9658 9.5 21.3299 9.5 20.6668V11.3335C9.5 10.6705 9.76339 10.0346 10.2322 9.56575C10.7011 9.09691 11.337 8.8335 12 8.8335H20C20.663 8.8335 21.2989 9.09691 21.7678 9.56575C22.2366 10.0346 22.5 10.6705 22.5 11.3335ZM21.5 11.3335C21.5 10.9356 21.342 10.5542 21.0607 10.2729C20.7794 9.99162 20.3978 9.8335 20 9.8335H12C11.6022 9.8335 11.2206 9.99162 10.9393 10.2729C10.658 10.5542 10.5 10.9356 10.5 11.3335V20.6668C10.5 21.0646 10.658 21.4462 10.9393 21.7274C11.2206 22.0087 11.6022 22.1668 12 22.1668H20C20.3978 22.1668 20.7794 22.0087 21.0607 21.7274C21.342 21.4462 21.5 21.0646 21.5 20.6668V11.3335Z"
        fill="#AAACBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0001 11.5C16.1327 11.5 16.2599 11.5527 16.3536 11.6465C16.4474 11.7402 16.5001 11.8674 16.5001 12C16.5001 12.1326 16.4474 12.2599 16.3536 12.3537C16.2599 12.4474 16.1327 12.5 16
16.1327 12.5H12.6667C12.5341 12.5 12.407 12.4474 12.3132 12.3537C12.2194 12.2599 12.1667 12.1326 12.1667 12C12.1667 11.8674 12.2194 11.7402 12.3132 11.6465C12.407 11.5527 12.5341 11.5 12.6667 11.5H16.0001ZM19.3334 14.1668C19.466 14.1668 19.5932 14.2194 19.687 14.3132C19.7807 14.407 19.8334 14.5342 19.8334 14.6668C19.8334 14.7994 19.7807 14.9266 19.687 15.0204C19.5932 15.1141 19.466 15.1668 19.3334 15.1668H12.6667C12.5341 15.1668 12.407 15.1141 12.3132 15.0204C12.2194 14.9266 12.1667 14.7994 12.1667 14.6668C12.1667 14.5342 12.2194 14.407 12.3132 14.3132C12.407 14.2194 12.5341 14.1668 12.6667 14.1668H19.3334ZM19.3334 16.8335C19.466 16.8335 19.5932 16.8861 19.687 16.9799C19.7807 17.0736 19.8334 17.2008 19.8334 17.3335C19.8334 17.4661 19.7807 17.5933 19.687 17.687C19.5932 17.7808 19.466 17.8335 19.3334 17.8335H12.6667C12.5341 17.8335 12.407 17.7808 12.3132 17.687C12.2194 17.5933 12.1667 17.4661 12.1667 17.3335C12.1667 17.2008 12.2194 17.0736 12.3132 16.9799C12.407 16.8861 12.5341 16.8335 12.6667 16.8335H19.3334ZM19.3334 19.5001C19.466 19.5001 19.5932 19.5528 19.687 19.6465C19.7807 19.7403 19.8334 19.8675 19.8334 20.0001C19.8334 20.1327 19.7807 20.2599 19.687 20.3537C19.5932 20.4474 19.466 20.5001 19.3334 20.5001H12.6667C12.5341 20.5001 12.407 20.4474 12.3132 20.3537C12.2194 20.2599 12.1667 20.1327 12.1667 20.0001C12.1667 19.8675 12.2194 19.7403 12.3132 19.6465C12.407 19.5528 12.5341 19.5001 12.6667 19.5001H19.3334Z"
        fill="#AAACBB"
      />
    </svg>
  ) : (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="16" fill="#FFF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 11.333V20.6663C22.5 21.3294 22.2366 21.9653 21.7678 22.4341C21.2989 22.903 20.663 23.1663 20 23.1663H12C11.337 23.1663 10.7011 22.903 10.2322 22.4341C9.76339 21.9653 9.5 21.3294 9.5 20.6663V11.333C9.5 10.67 9.76339 10.0341 10.2322 9.56524C10.7011 9.0964 11.337 8.83301 12 8.83301H20C20.663 8.83301 21.2989 9.0964 21.7678 9.56524C22.2366 10.0341 22.5 10.67 22.5 11.333ZM21.5 11.333C21.5 10.9352 21.342 10.5537 21.0607 10.2723C20.7794 9.99104 20.3978 9.83301 20 9.83301H12C11.6022 9.83301 11.2206 9.99104 10.9393 10.2723C10.658 10.5537 10.5 10.9352 10.5 11.333V20.6663C10.5 21.0642 10.658 21.4457 10.9393 21.727C11.2206 22.0083 11.6022 22.1663 12 22.1663H20C20.3978 22.1663 20.7794 22.0083 21.0607 21.727C21.342 21.4457 21.5 21.0642 21.5 20.6663V11.333Z"
        fill="#AAACBB"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.0001 11.5C16.1327 11.5 16.2599 11.5527 16.3536 11.6464C16.4474 11.7402 16.5001 11.8674 16.5001 12C16.5001 12.1326 16.4474 12.2598 16.3536 12.3536C16.2599 12.4473 16.1327 12.5 16.0001 12.5H12.6667C12.5341 12.5 12.407 12.4473 12.3132 12.3536C12.2194 12.2598 12.1667 12.1326 12.1667 12C12.1667 11.8674 12.2194 11.7402 12.3132 11.6464C12.407 11.5527 12.5341 11.5 12.6667 11.5H16.0001ZM19.3334 14.1667C19.466 14.1667 19.5932 14.2193 19.687 14.3131C19.7807 14.4069 19.8334 14.5341 19.8334 14.6667C19.8334 14.7993 19.7807 14.9265 19.687 15.0202C19.5932 15.114 19.466 15.1667 19.3334 15.1667H12.6667C12.5341 15.1667 12.407 15.114 12.3132 15.0202C12.2194 14.9265 12.1667 14.7993 12.1667 14.6667C12.1667 14.5341 12.2194 14.4069 12.3132 14.3131C12.407 14.2193 12.5341 14.1667 12.6667 14.1667H19.3334ZM19.3334 16.8333C19.466 16.8333 19.5932 16.886 19.687 16.9798C19.7807 17.0735 19.8334 17.2007 19.8334 17.3333C19.8334 17.4659 19.7807 17.5931 19.687 17.6869C19.5932 17.7807 19.466 17.8333 19.3334 17.8333H12.6667C12.5341 17.8333 12.407 17.7807 12.3132 17.6869C12.2194 17.5931 12.1667 17.4659 12.1667 17.3333C12.1667 17.2007 12.2194 17.0735 12.3132 16.9798C12.407 16.886 12.5341 16.8333 12.6667 16.8333H19.3334ZM19.3334 19.5C19.466 19.5 19.5932 19.5527 19.687 19.6464C19.7807 19.7402 19.8334 19.8674 19.8334 20C19.8334 20.1326 19.7807 20.2598 19.687 20.3536C19.5932 20.4473 19.466 20.5 19.3334 20.5H12.6667C12.5341 20.5 12.407 20.4473 12.3132 20.3536C12.2194 20.2598 12.1667 20.1326 12.1667 20C12.1667 19.8674 12.2194 19.7402 12.3132 19.6464C12.407 19.5527 12.5341 19.5 12.6667 19.5H19.3334Z"
        fill="#71758E"
      />
    </svg>
  );
};

export default ArticleIcon;

