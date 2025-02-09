import * as React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import styled, { ThemeProvider } from 'styled-components';
import { SliderRange, ALL_BORDER_RADIUS_VALUES } from '@admiral-ds/react-ui';
import type { Theme } from '@admiral-ds/react-ui';

const Separator = styled.div`
  height: 20px;
`;
const Desc = styled.div`
  font-family: 'VTB Group UI', serif;
  font-size: 16px;
  line-height: 24px;
`;

const Description = () => (
  <Desc>
    Поле ввода с двойным слайдером позволяет выбирать диапазон внутри обозначенного диапазона значений. Так же возможен
    ввод вручную.
    <Separator />В диапозон может быть добавлено значение: рубли, доллары и тп. В таком случае значение подставляется
    только в поле ввода.
  </Desc>
);

export default {
  title: 'Admiral-2.1/Input/SliderRange',
  decorators: [withDesign],
  component: SliderRange,
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
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61377',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61446',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61513',
      },
    ],
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    thousand: {
      control: { type: 'text' },
    },
    suffix: {
      control: { type: 'text' },
    },
    themeBorderKind: {
      options: ALL_BORDER_RADIUS_VALUES,
      control: { type: 'radio' },
    },
    skeleton: {
      control: { type: 'boolean' },
    },
    minValue: {
      control: { type: 'number' },
    },
    maxValue: {
      control: { type: 'number' },
    },
    precision: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    value: {
      control: false,
    },
    defaultValue: {
      control: false,
    },
    input1: {
      control: false,
    },
    input2: {
      control: false,
    },
    prefix: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
} as unknown as ComponentMeta<typeof SliderRange>;

const Template1: ComponentStory<typeof SliderRange> = ({ defaultValue, onChange, ...args }) => {
  const handleChange = (value: any) => console.log(value);

  function swapBorder(theme: Theme): Theme {
    theme.shape.borderRadiusKind = (args as any).themeBorderKind || theme.shape.borderRadiusKind;
    return theme;
  }

  return (
    <ThemeProvider theme={swapBorder}>
      <SliderRange defaultValue={defaultValue || ['2', '6']} onChange={onChange || handleChange} {...args} />
    </ThemeProvider>
  );
};

const Template2: ComponentStory<typeof SliderRange> = () => {
  return (
    <>
      <SliderRange
        onChange={(value: any) => console.log(value)}
        minValue={10}
        maxValue={100}
        prefix={['From', 'To']}
        suffix="$"
      />
    </>
  );
};

const Template3: ComponentStory<typeof SliderRange> = () => {
  const [value, setValue] = React.useState<[string, string]>(['2', '5']);
  return (
    <>
      <SliderRange
        value={value}
        onChange={(value: any) => {
          console.log(value);
          setValue([value[0].str, value[1].str]);
        }}
        prefix={['From', 'To']}
        suffix="$"
      />
    </>
  );
};

export const Playground = Template1.bind({});
Playground.args = {};
Playground.storyName = 'SliderRange. Playground';

export const Custom = Template2.bind({});
Custom.args = {};
Custom.storyName = 'SliderRange. Пример изменения настроек (prefix, suffix, minValue, maxValue)';

export const Controlled = Template3.bind({});
Controlled.args = {};
Controlled.storyName = 'SliderRange. Пример контролируемого компонента.';
