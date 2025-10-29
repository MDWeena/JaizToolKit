import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";
export const AccountIcon = (props: SvgProps) => (
  <Svg {...props} width={48} height={48} fill='none'>
    <Rect width={48} height={48} fill='#E70000' rx={24} />
    <Path
      fill='#fff'
      d='M29.5 23a5.5 5.5 0 1 1-5.5-5.5 5.506 5.506 0 0 1 5.5 5.5Zm7.5 1a13 13 0 1 1-13-13 13.014 13.014 0 0 1 13 13Zm-2 0a11.012 11.012 0 0 0-11.434-10.991C17.68 13.236 12.984 18.14 13 24.03a10.957 10.957 0 0 0 2.78 7.27 9.964 9.964 0 0 1 2.72-2.663.5.5 0 0 1 .604.04 7.479 7.479 0 0 0 9.785 0 .5.5 0 0 1 .604-.04 9.965 9.965 0 0 1 2.723 2.663A10.953 10.953 0 0 0 35 24Z'
    />
  </Svg>
);

export const FunctionIcon = (props: SvgProps) => (
  <Svg {...props} width={48} height={48} fill='none'>
    <Rect width={48} height={48} fill='#FFC000' rx={24} />
    <Path
      fill='#fff'
      d='M37 20a9 9 0 0 1-12.617 8.25l-6.508 7.527a4 4 0 1 1-5.706-5.605l.053-.048 7.528-6.507A9.01 9.01 0 0 1 30.192 11.27a.999.999 0 0 1 .492 1.649L26 17.998l.707 3.295L30 22l5.081-4.69a.998.998 0 0 1 1.649.491c.18.72.27 1.458.27 2.199Z'
    />
  </Svg>
);

export const ProductIcon = (props: SvgProps) => (
  <Svg {...props} width={48} height={48} fill='none'>
    <Rect width={48} height={48} fill='#004081' rx={24} />
    <Path
      fill='#fff'
      d='m35.96 16.268-11-6.019a1.985 1.985 0 0 0-1.92 0l-11 6.022A2 2 0 0 0 11 18.02v11.955a2 2 0 0 0 1.04 1.75l11 6.021a1.985 1.985 0 0 0 1.92 0l11-6.021a2 2 0 0 0 1.04-1.75V18.022a2 2 0 0 0-1.04-1.754ZM24 23l-10.044-5.5L24 12l10.044 5.5L24 23Zm1 12.455V24.728l10-5.472v10.72l-10 5.479Z'
    />
  </Svg>
);

export const ResourceIcon = (props: SvgProps) => (
  <Svg {...props} width={48} height={48} fill='none'>
    <Rect width={48} height={48} fill='#35C220' rx={24} />
    <Path
      fill='#fff'
      d='M36 16h-8.666l-3.468-2.6a2.015 2.015 0 0 0-1.2-.4H17a2 2 0 0 0-2 2v2h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h19.111A1.892 1.892 0 0 0 34 33.111V31h2.111A1.892 1.892 0 0 0 38 29.111V18a2 2 0 0 0-2-2Zm0 13h-2v-7a2 2 0 0 0-2-2h-8.666l-3.468-2.6a2.015 2.015 0 0 0-1.2-.4H17v-2h5.666l3.734 2.8a1 1 0 0 0 .6.2h9v11Z'
    />
  </Svg>
);
