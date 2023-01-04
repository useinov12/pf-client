import clsx from 'clsx';
import { useTheme } from '@/context/ThemeProvider';
import { MutableRefObject } from 'react';

export default function Polkadot({
  className,
  ref,
}: {
  className?: string;
  ref?: MutableRefObject<SVGSVGElement | null>;
}) {
  const { mode } = useTheme();
  return (
    <svg className={clsx(className)} ref={ref}>
      <defs>
        <pattern
          id='myPattern'
          x='24'
          y='24'
          width='21'
          height='21'
          patternUnits='userSpaceOnUse'
        >
          <rect
            x='10'
            y='10'
            width='4'
            height='4'
            className={clsx(
              'drop-shadow',
              mode === 'light' ? 'fill-gray-500/70 ' : 'fill-gray-600 ',
            )}
          />
        </pattern>
      </defs>

      <rect width='600' height='500' style={{ fill: 'url(#myPattern)' }} />
    </svg>
  );
}
