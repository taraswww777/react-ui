import * as React from 'react';
import { version } from '../package.json';
import { ThemeProvider } from 'styled-components';
import { themes } from '@storybook/theming';

import { DARK_THEME, LIGHT_THEME } from '#src/components/themes';
import { FontsVTBGroup } from '#src/components/FontsVTBGroup';
import { useDarkMode } from 'storybook-dark-mode';
import styled from 'styled-components';
import { DropdownProvider } from '#src/components/DropdownProvider';

import LogoSvg from './Logo.svg';

import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

const customTheme = {
  brandImage: LogoSvg,
  brandTitle: `version ${version}`,
};

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, ...customTheme },
    // Override the default light theme
    light: { ...themes.light, ...customTheme },
  },
  options: {
    storySort: {
      includeName: true,
      locales: 'en-US',
      order: ['Admiral-2.1', ['Atoms', 'Input', 'Form Field', 'Data Table']],
    },
  },
};

// create a component that uses the dark mode hook
function ThemeWrapper(props) {
  // render your custom theme provider
  return <ThemeProvider theme={useDarkMode() ? DARK_THEME : LIGHT_THEME}>{props.children}</ThemeProvider>;
}

const StoryContainer = styled.div`
  padding: 3em;
  background-color: ${(props) => props.theme.color['Neutral/Neutral 00']};
`;

export const decorators = [
  (renderStory) => (
    <ThemeWrapper>
      <DropdownProvider>
        <StoryContainer>{renderStory()}</StoryContainer>
      </DropdownProvider>
    </ThemeWrapper>
  ),
  (Story) => (
    <>
      <FontsVTBGroup />
      <Story />
    </>
  ),
];
