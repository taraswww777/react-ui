import React, { useState } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import styled, { ThemeProvider } from 'styled-components';
import { GroupActionsPane, PaneSeparator, TextButton, typography } from '@admiral-ds/react-ui';
import type { Theme } from '@admiral-ds/react-ui';
import { ReactComponent as GovernmentOutline } from '@admiral-ds/icons/build/category/GovernmentOutline.svg';
import { ReactComponent as TelegramOutline } from '@admiral-ds/icons/build/communication/TelegrammOutline.svg';
import { ReactComponent as AlertOutline } from '@admiral-ds/icons/build/category/AlertOutline.svg';
import { ReactComponent as CardSolid } from '@admiral-ds/icons/build/finance/CardSolid.svg';

const Desc = styled.div`
  font-family: 'VTB Group UI';
  font-size: 16px;
  line-height: 24px;
`;

const Description = () => (
  <Desc>
    Опциональная надстройка над таблицей. Размерность : xl - 56px, l - 48px, m - 40px, s - 32px
    <br />
    Для того чтобы была видна кнопка поиска("лупа") необходимо определить свойства searchValue и onChangeSearchValue,
    для кнопки настройки видимости колонок("плюс") - columns и onColumnsChange, для кнопки настроек("шестерёнка") -
    settingsMenu
  </Desc>
);
export default {
  title: 'Admiral-2.1/Data Table/GroupActionsPane',
  decorators: [withDesign],
  component: GroupActionsPane,
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
    componentSubtitle: <Description />,
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A91211',
      },
    ],
  },
  args: {
    dimension: 'xl',
  },
  argTypes: {
    dimension: {
      options: ['xl', 'l', 'm', 's'],
      control: { type: 'radio' },
    },
    settingsButtonsDisabled: {
      control: 'boolean',
    },
    dropContainerCssMixin: {
      control: false,
    },
    columnsButtonDropContainerStyle: {
      control: false,
    },
    settingsButtonDropContainerStyle: {
      control: false,
    },
  },
} as ComponentMeta<typeof GroupActionsPane>;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SettingsMenu = styled.div`
  width: 320px;
  height: 200px;
  ${typography['Body/Body 2 Long']}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const columns = [
  { name: 'Тип сделки', visible: true },
  { name: 'Дата сделки', visible: true },
  { name: 'Сумма', visible: false },
  { name: 'Валюта', visible: true },
  { name: 'Ставка', visible: true },
  { name: 'Статус', visible: true },
];

const Simple: ComponentStory<typeof GroupActionsPane> = (args) => {
  const dimension = ['s', 'm'].includes(args.dimension || 'm') ? 's' : 'm';
  const [columnsVisibility, setColumnsVisibility] = useState(columns);
  const [searchValue, setSearchValue] = useState<string>('');

  function swapBorder(theme: Theme): Theme {
    theme.shape.borderRadiusKind = (args as any).themeBorderKind || theme.shape.borderRadiusKind;
    return theme;
  }

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchEnter = () => {
    console.log('Search input opened');
  };

  const handleSearchLeave = () => {
    console.log('Search input left');
  };

  return (
    <ThemeProvider theme={swapBorder}>
      <Wrapper>
        <GroupActionsPane
          {...args}
          searchValue={searchValue}
          onChangeSearchValue={handleChangeSearchValue}
          columns={columnsVisibility}
          onColumnsChange={setColumnsVisibility}
          onSearchEnter={handleSearchEnter}
          onSearchLeave={handleSearchLeave}
          columnsButtonDropContainerStyle={{ dropContainerClassName: 'columnsButtonDropContainerClass' }}
          settingsButtonDropContainerStyle={{ dropContainerClassName: 'settingsButtonDropContainerClass' }}
          settingsMenu={<SettingsMenu>Здесь может быть меню настройки</SettingsMenu>}
        >
          <TextButton text={'Action 1'} dimension={dimension} iconStart={<GovernmentOutline />} />
          <TextButton text={'Action 2'} dimension={dimension} iconStart={<TelegramOutline />} />
          <TextButton text={'Action 3'} dimension={dimension} iconStart={<AlertOutline />} disabled />
          <PaneSeparator dimension={dimension} />
          <TextButton text={'Action 4'} dimension={dimension} iconStart={<CardSolid />} />
        </GroupActionsPane>
      </Wrapper>
    </ThemeProvider>
  );
};

export const SimpleContainer = Simple.bind({});

SimpleContainer.storyName = 'Простой пример';
SimpleContainer.parameters = {
  docs: {
    description: {
      story:
        'Для того чтобы была видна кнопка поиска("лупа") необходимо определить свойства searchValue и onChangeSearchValue, ' +
        'для кнопки настройки видимости колонок("плюс") - columns и onColumnsChange, для кнопки настроек("шестерёнка") - ' +
        'settingsMenu',
    },
  },
};
