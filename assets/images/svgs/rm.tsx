import * as React from 'react';
import Svg, { G, Mask, Path, SvgProps } from 'react-native-svg';

export function CustomerDetailsIcon(props: SvgProps) {
  return (
    <Svg width={32} height={24} viewBox="0 0 32 24" fill="none" {...props}>
      <Path
        d="M2.667 0h26.666C30.733 0 32 1.267 32 2.667v18.666c0 1.4-1.267 2.667-2.667 2.667H2.667C1.267 24 0 22.733 0 21.333V2.667C0 1.267 1.267 0 2.667 0zm16 4v1.333h10.666V4H18.667zm0 2.667V8h10.666V6.667H18.667zm0 2.666v1.334H28V9.333h-9.333zm-8 5.214c-2.667 0-8 1.453-8 4.12V20h16v-1.333c0-2.667-5.334-4.12-8-4.12zm0-10.547a4 4 0 100 8 4 4 0 000-8z"
        fill="#004081"
      />
    </Svg>
  );
}

export function LienIcons(props: SvgProps) {
  return (
    <Svg width={28} height={32} viewBox="0 0 28 32" fill="none" {...props}>
      <Path
        d="M27.086 6.188a1.317 1.317 0 00-.956-.45c-2.825-.074-6.399-3.094-8.762-4.28-1.46-.73-2.423-1.21-3.147-1.337a1.477 1.477 0 00-.443 0c-.724.128-1.687.609-3.146 1.339C8.27 2.644 4.695 5.665 1.87 5.738a1.33 1.33 0 00-.957.45 1.44 1.44 0 00-.358 1.027C1.16 19.55 5.586 27.185 13.35 31.622c.202.115.426.174.648.174.223 0 .447-.06.65-.174 7.764-4.437 12.187-12.071 12.795-24.407a1.428 1.428 0 00-.357-1.027zM14 22.224a7.455 7.455 0 110-14.91 7.455 7.455 0 010 14.91zm3.052-11.751l-7.35 7.348a5.243 5.243 0 01-.986-3.052A5.292 5.292 0 0114 9.486c1.14 0 2.187.37 3.052.987zm1.243 1.244c.617.864.988 1.914.988 3.052A5.292 5.292 0 0114 20.053a5.242 5.242 0 01-3.053-.987l7.348-7.35z"
        fill="#004081"
      />
    </Svg>
  );
}

export function TransactionsIcon(props: SvgProps) {
  return (
    <Svg width={24} height={30} viewBox="0 0 24 30" fill="none" {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={30}
      >
        <Path
          d="M20.667 4.333H3.333C2.597 4.333 2 4.93 2 5.666V27c0 .736.597 1.333 1.333 1.333h17.334c.736 0 1.333-.597 1.333-1.333V5.666c0-.736-.597-1.333-1.333-1.333z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={2.66667}
          strokeLinejoin="round"
        />
        <Path
          d="M8 1.667v4m8-4v4"
          stroke="#fff"
          strokeWidth={2.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.666 11.666h10.667M6.666 17h8m-8 5.333h5.333"
          stroke="#000"
          strokeWidth={2.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M-4-1h32v32H-4V-1z" fill="#004081" />
      </G>
    </Svg>
  );
}

export function ChequeIcon(props: SvgProps) {
  return (
    <Svg width={30} height={20} viewBox="0 0 30 20" fill="none" {...props}>
      <Path
        d="M5.667 12.666h18.667V14H5.667v-1.334zm21.334 4v-12H3v12h24zM.334.666h29.333v18.667H.334V.667zm5.333 6.667h9.334V10H5.667V7.333z"
        fill="#004081"
      />
    </Svg>
  );
}

export function ServiceRequestIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width ?? 32}
      height={props.height ?? 32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Path
        d="M0 16a16 16 0 1132 0 16 16 0 01-32 0zm13.5 5a3.504 3.504 0 00-2.5-3.356v-3.788A3.504 3.504 0 0010 7a3.5 3.5 0 00-1 6.856v3.788a3.504 3.504 0 001 6.856 3.5 3.5 0 003.5-3.5zM20 11h.5a1 1 0 011 1v5.644a3.504 3.504 0 001 6.856 3.5 3.5 0 001-6.856V12a3 3 0 00-3-3H20V6.258a.5.5 0 00-.854-.354l-3.742 3.742a.5.5 0 000 .708l3.742 3.742a.5.5 0 00.854-.354V11z"
        fill="#004081"
      />
    </Svg>
  );
}
