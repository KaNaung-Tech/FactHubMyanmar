import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CategoryBackArrow = (props) => (
  <Svg
    width={8}
    height={16}
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0.517024 15.276C0.842466 15.6014 1.3701 15.6014 1.69554 15.276L7.23257 9.7389C8.20866 8.76282 8.20891 7.18048 7.23324 6.20404L1.75799 0.72455C1.43256 0.399108 0.904916 0.399108 0.579483 0.72455C0.254049 1.04998 0.254049 1.57763 0.579483 1.90306L6.05616 7.37973C6.38166 7.70523 6.38166 8.23282 6.05616 8.55823L0.517024 14.0974C0.191591 14.4229 0.191591 14.9505 0.517024 15.276Z"
      fill="#5B5D71"
    />
  </Svg>
);
export default CategoryBackArrow;
