import Svg, { G, Mask, Path, SvgProps } from 'react-native-svg';

export function RequestTrackerIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="#004081" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0a1.333 1.333 0 011.333 1.333V2.76a9.334 9.334 0 017.907 7.907h1.427a1.333 1.333 0 110 2.666H21.24a9.334 9.334 0 01-7.907 7.907v1.427a1.333 1.333 0 11-2.666 0V21.24a9.333 9.333 0 01-7.907-7.907H1.333a1.333 1.333 0 110-2.666H2.76a9.34 9.34 0 017.907-7.907V1.333A1.333 1.333 0 0112 0zM5.333 12a6.667 6.667 0 1113.334 0 6.667 6.667 0 01-13.334 0z"
        fill="#004081"
      />
    </Svg>
  );
}

export function PasswordResetIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 000-16C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9zm2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77 1.53 0 2.78 1.24 2.78 2.77v1.01zm-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37z"
        fill="#004081"
      />
    </Svg>
  );
}

export function CardHotlist(props: SvgProps) {
  return (
    <Svg width={28} height={22} viewBox="0 0 28 22" fill="none" {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={28}
        height={22}
      >
        <Path
          d="M16.666.333h-5.333c-5.028 0-7.543 0-9.104 1.563C1.104 3.02.789 4.64.701 7.334h26.597c-.088-2.695-.402-4.314-1.528-5.438C24.21.333 21.694.333 16.666.333zm-5.333 21.334h5.333c5.028 0 7.543 0 9.104-1.563 1.562-1.563 1.563-4.076 1.563-9.104 0-.588 0-1.144-.003-1.666H.67C.666 9.856.665 10.412.666 11c0 5.028 0 7.543 1.563 9.104 1.563 1.562 4.076 1.563 9.104 1.563z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 16.334a1 1 0 011-1h5.333a1 1 0 010 2H6a1 1 0 01-1-1zm8.667 0a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1z"
          fill="#000"
        />
      </Mask>
      <G mask="url(#a)">
        <Path d="M-2-5h32v32H-2V-5z" fill="#004081" />
      </G>
    </Svg>
  );
}
