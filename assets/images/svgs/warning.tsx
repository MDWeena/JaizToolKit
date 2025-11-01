import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Circle,
  Path,
  Defs,
  RadialGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const ErrorIcon = (props: SvgProps) => (
  <Svg {...props} width={162} height={162} viewBox="0 0 162 162" fill="none">
    <G filter="url(#a)" opacity={0.1}>
      <Circle cx={81} cy={81} r={71} fill="url(#b)" />
    </G>
    <G filter="url(#c)" opacity={0.15}>
      <Circle cx={81} cy={81} r={55} fill="url(#d)" />
    </G>
    <Circle cx={81} cy={81} r={35} fill="#E70000" />
    <Path
      fill="#fff"
      d="M78.39 83.86 77.352 71.4h6.328l-1.064 12.46H78.39Zm2.127 7.392c-.933 0-1.699-.29-2.296-.868-.597-.579-.896-1.27-.896-2.072 0-.821.299-1.503.896-2.044.597-.56 1.363-.84 2.296-.84.933 0 1.69.28 2.268.84.597.541.896 1.223.896 2.044 0 .803-.299 1.493-.896 2.072-.579.579-1.335.868-2.268.868Z"
    />
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(54.435 17.751 3.163) scale(202.981)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.047} stopColor="#E70000" stopOpacity={0.42} />
        <Stop offset={0.983} stopColor="#E70000" />
      </RadialGradient>
      <RadialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(54.435 5.132 29.323) scale(157.238)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.047} stopColor="#E70000" stopOpacity={0.42} />
        <Stop offset={0.983} stopColor="#E70000" />
      </RadialGradient>
    </Defs>
  </Svg>
);

export const WarningIcon = (props: SvgProps) => (
  <Svg {...props} width={35} height={35} viewBox="0 0 35 35" fill="none">
    <Path
      fill="#E70000"
      d="M32.375 25.715 20.419 4.952a3.384 3.384 0 0 0-5.838 0L2.625 25.716a3.214 3.214 0 0 0 0 3.242 3.329 3.329 0 0 0 2.919 1.667h23.912a3.33 3.33 0 0 0 2.916-1.666 3.214 3.214 0 0 0 .003-3.244ZM16.406 14.22a1.094 1.094 0 0 1 2.188 0v5.469a1.094 1.094 0 0 1-2.188 0v-5.47ZM17.5 26.25a1.64 1.64 0 1 1 0-3.28 1.64 1.64 0 0 1 0 3.28Z"
    />
  </Svg>
);
