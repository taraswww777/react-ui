import styled, { css, DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import { typography } from '#src/components/Typography';
import { PositionInPortal } from '#src/components/PositionInPortal';

export const AnchorWrapper = styled.div<{ anchorCssMixin?: FlattenInterpolation<ThemeProps<DefaultTheme>> }>`
  display: inline-block;
  position: relative;
  cursor: pointer;
  ${(p) => (p.anchorCssMixin ? p.anchorCssMixin : '')}
`;

const CLOSE_BUTTON_SIZE = 20;
const CLOSE_BUTTON_MARGIN_LEFT = 16;

export const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: 0;
  padding: 0;
  width: ${CLOSE_BUTTON_SIZE};
  height: ${CLOSE_BUTTON_SIZE};
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: -4px;
    right: -4px;
    background: transparent;
    border-radius: 50%;
  }
  ${({ theme }) => `
    & *[fill^='#'] {
      fill: ${theme.color['Neutral/Neutral 50']};
    }

    &:hover, &:focus {
      &:before {
        background: ${theme.color['Opacity/Hover']};
      }
    }

    &:active {
      &:before {
        background: ${theme.color['Opacity/Press']};
      }
    }
  `}
`;

export type Dimension = 's' | 'm' | 'l';

const HINT_PADDING = 16;
const HINT_BORDER_RADIUS = '4px';
const HINT_WIDTH_S = '280px';
const HINT_WIDTH_M = '384px';
const HINT_WIDTH_L = '488px';
const HINT_WIDTH_MOBILE = 'calc(100vw - 32px)';

const sizes = css<{ dimension: Dimension; isMobile: boolean }>`
  width: ${({ dimension, isMobile }) => {
    if (isMobile) return HINT_WIDTH_MOBILE;
    if (dimension === 's') return HINT_WIDTH_S;
    if (dimension === 'm') return HINT_WIDTH_M;
    return HINT_WIDTH_L;
  }};
`;

export const HintWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  margin: 0 0 0 -8px;
  width: max-content;
  min-width: max-content;
  opacity: 0;
  transition-delay: 200ms;
  transition-property: opacity;
  pointer-events: initial;
  position: relative;
`;

export const HintDialog = styled.div<{
  dimension: Dimension;
  isMobile: boolean;
}>`
  display: flex;
  padding: ${HINT_PADDING}px 0 ${HINT_PADDING}px ${HINT_PADDING}px;
  ${sizes}
  background-color: ${({ theme }) => theme.color['Special/Elevated BG']};
  ${typography['Body/Body 2 Long']}
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  ${({ theme }) => theme.shadow['Shadow 08']}
  border-radius: ${HINT_BORDER_RADIUS};
  box-sizing: border-box;
`;

export const HintContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  max-height: 320px;
  overflow: auto;
  padding-right: ${HINT_PADDING}px;
  [data-trigger='click'] & {
    padding-right: ${CLOSE_BUTTON_SIZE + HINT_PADDING + CLOSE_BUTTON_MARGIN_LEFT}px;
  }
`;

export const Portal = styled(PositionInPortal)<{ flexDirection?: any }>`
  display: flex;
  flex-wrap: nowrap;
  ${({ flexDirection }) => (flexDirection ? `flex-direction: ${flexDirection};` : 'flex-direction: column;')}
`;

export const FakeTarget = styled.div`
  pointer-events: none;
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
`;
