import styled, { css } from 'styled-components';
import { styleColorMixin, styleDisabledMixin, styleMixin, styleTextMixin } from '#src/components/Link/mixins';

export type AppearanceLink = 'primary' | 'secondary';
export type Dimension = 'm' | 's';

export type LinkComponent = {
  disabled?: boolean;
  appearance?: AppearanceLink;
  dimension?: Dimension;
};

export const LinkComponentCssMixin = css<LinkComponent>`
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  display: flex;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  align-items: center;
  width: fit-content;
  text-decoration: none;
  position: relative;
  ${styleMixin};
  ${styleColorMixin};
  ${styleTextMixin};
  ${(props) => (props.disabled ? styleDisabledMixin : '')}
`;

export const LinkComponent = styled.a<LinkComponent>`
  ${LinkComponentCssMixin}
`;
