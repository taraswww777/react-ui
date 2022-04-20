import { css } from 'styled-components';
import { typography } from '../Typography';

export type DropDownItemDimension = 'l' | 'm' | 's';

export const styleTextMixin = css<{ dimension: DropDownItemDimension }>`
  ${({ dimension }) => (dimension === 's' ? typography['Body/Body 2 Long'] : typography['Body/Body 1 Long'])}
  ul[data-dimension='s'] & {
    ${typography['Body/Body 2 Long']}
  }
  text-overflow: ellipsis;
`;

export const colorTextMixin = css<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) => (disabled ? theme.color['Neutral/Neutral 30'] : theme.color['Neutral/Neutral 90'])};
`;

export const backgroundColor = css<{ selected?: boolean; id?: string }>`
  background: ${({ theme, selected }) =>
    selected ? theme.color['Opacity/Focus'] : theme.color['Special/Elevated BG']};
  ${({ id, theme }) => id && `ul[data-selectedid="${id}"] && {background: ${theme.color['Opacity/Focus']};}`}}
`;

export const paddings = css<{ dimension?: DropDownItemDimension }>`
  padding: ${({ dimension }) => {
    switch (dimension) {
      case 'l':
        return '12px 16px';
      case 'm':
        return '8px 16px';
      case 's':
        return '6px 12px';
      default:
        return '12px 16px';
    }
  }};
  ul[data-dimension='m'] && {
    padding: 8px 16px;
  }
  ul[data-dimension='s'] && {
    padding: 6px 12px;
  }
`;
