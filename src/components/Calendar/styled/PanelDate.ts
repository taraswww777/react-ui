import styled from 'styled-components';
import { typography } from '#src/components/Typography';

const YEAR_MONTH_HEIGHT = '32px';
const YEAR_MONTH_PADDING = '4px 8px';
const YEAR_MONTH_BORDER_RADIUS = '16px';
const YEAR_WIDTH = '54px';

const PanelItem = styled.h6<{
  view: boolean;
}>`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: ${YEAR_MONTH_HEIGHT};
  padding: ${YEAR_MONTH_PADDING};
  margin: 0;
  border-radius: ${YEAR_MONTH_BORDER_RADIUS};
  ${typography['Subtitle/Subtitle 2']}

  ${({ theme, view }) => `
    color: ${theme.color['Primary/Primary 60 Main']};
    background: ${view ? theme.color['Opacity/Focus'] : 'transparent'};

    &:hover {
      background: ${theme.color['Opacity/Hover']};
    }
  `}
`;

export const Year = styled(PanelItem)`
  width: ${YEAR_WIDTH};
`;

export const Month = styled(PanelItem)``;

export const PanelDate = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
