import * as React from 'react';
import { uid } from '#src/components/common/uid';
import { LIGHT_THEME } from '#src/components/themes';
import { useTheme } from 'styled-components';
import type { AvatarProps } from '#src/components/Avatar';

type AvatarSVGProps = {
  dimension: AvatarProps['dimension'];
  size: string;
  hasImage?: boolean;
  href?: string;
  status?: AvatarProps['status'];
  appearance?: AvatarProps['appearance'];
  group?: boolean;
  svgMaskId?: string;
};

const VIEWBOX = {
  xs: '0 0 24 24',
  s: '0 0 32 32',
  m: '0 0 40 40',
  l: '0 0 48 48',
  xl: '0 0 56 56',
};

const CIRCLE = {
  xs: '12',
  s: '16',
  m: '20',
  l: '24',
  xl: '28',
};

const ELLIPSE = {
  xs: { c: '21', r: '3', r2: '5' },
  s: { c: '27', r: '5', r2: '7' },
  m: { c: '34', r: '6', r2: '8' },
  l: { c: '41', r: '7', r2: '9' },
  xl: { c: '47', r: '9', r2: '11' },
};

export const AvatarSVG: React.FC<AvatarSVGProps> = ({
  dimension = 'xl',
  hasImage,
  href,
  status,
  size,
  appearance: appearanceProp,
  group = false,
  svgMaskId,
}) => {
  const theme = useTheme() || LIGHT_THEME;
  const id = svgMaskId || uid();
  const useId = `url(#${id})`;

  const getBackgroundColor = (appearance: AvatarProps['appearance']) => {
    switch (appearance) {
      case 'white':
        return theme.color['Neutral/Neutral 00'];
      case 'grey':
        return theme.color['Neutral/Neutral 50'];
      case 'dark':
        return theme.color['Neutral/Neutral 80'];
      case 'light':
        return theme.color['Neutral/Neutral 10'];
      default:
        return appearance?.background || theme.color['Neutral/Neutral 10'];
    }
  };
  const getStatusColor = (status: AvatarProps['status']) => {
    switch (status) {
      case 'success':
        return theme.color['Success/Success 50 Main'];
      case 'warn':
        return theme.color['Attention/Attention 50 Main'];
      case 'danger':
        return theme.color['Error/Error 60 Main'];
      case 'inactive':
        return theme.color['Neutral/Neutral 50'];
      default:
        return status || theme.color['Neutral/Neutral 50'];
    }
  };
  const appearance = appearanceProp || 'light';
  const backgroundColor = typeof appearance === 'string' ? getBackgroundColor(appearance) : appearance.background;

  return (
    <svg
      viewBox={VIEWBOX[dimension]}
      width={size}
      height={size}
      style={{ transform: 'rotate(.00001deg)' }} /* hack to force anti-aliasing in IE */
    >
      <defs>
        <mask id={id}>
          <circle
            id="outer"
            cx={CIRCLE[dimension]}
            cy={CIRCLE[dimension]}
            r={CIRCLE[dimension]}
            strokeWidth="0"
            stroke="white"
            fill="white"
          />
          {status && !group && (
            <ellipse
              id="inner"
              vectorEffect="non-scaling-stroke"
              cx={ELLIPSE[dimension].c}
              cy={ELLIPSE[dimension].c}
              rx={ELLIPSE[dimension].r2}
              ry={ELLIPSE[dimension].r2}
              fill="black"
            />
          )}
          {group && (
            <circle
              cx={String(Number(CIRCLE[dimension]) * 3 - 2)}
              cy={CIRCLE[dimension]}
              r={String(Number(CIRCLE[dimension]) + 2)}
              strokeWidth="0"
              stroke="black"
              fill="black"
            />
          )}
        </mask>
      </defs>
      {hasImage && (
        <image width="100%" height="100%" preserveAspectRatio="xMidYMid slice" mask={useId} xlinkHref={href} />
      )}
      {!hasImage && (
        <circle
          id="outer"
          cx={CIRCLE[dimension]}
          cy={CIRCLE[dimension]}
          r={CIRCLE[dimension]}
          strokeWidth="0"
          stroke={backgroundColor}
          fill={backgroundColor}
          mask={useId}
        />
      )}
      {status && !group && (
        <ellipse
          style={{ fill: getStatusColor(status), strokeWidth: 0, strokeOpacity: 0 }}
          vectorEffect="non-scaling-stroke"
          cx={ELLIPSE[dimension].c}
          cy={ELLIPSE[dimension].c}
          rx={ELLIPSE[dimension].r}
          ry={ELLIPSE[dimension].r}
        />
      )}
    </svg>
  );
};
