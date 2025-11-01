import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const GridIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      fill="#212121"
      d="M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2Zm7 0A1.5 1.5 0 0 0 9 3.5v2A1.5 1.5 0 0 0 10.5 7h2A1.5 1.5 0 0 0 14 5.5v-2A1.5 1.5 0 0 0 12.5 2h-2Zm-7 7A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2Zm7 0A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z"
    />
  </Svg>
)

export const EditIcon = (props: SvgProps) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
  >
    <Path
      fill="#004081"
      d="m18.988 2.012 3 3L19.701 7.3l-3-3 2.287-2.288ZM8 16h3l7.287-7.287-3-3L8 13v3Z"
    />
    <Path
      fill="#004081"
      d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19Z"
    />
  </Svg>
)


