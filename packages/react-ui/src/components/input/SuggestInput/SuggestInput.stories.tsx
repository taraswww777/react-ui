import * as React from 'react';
import type { ChangeEvent } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import {
  SuggestInput,
  INPUT_DIMENSIONS_VALUES,
  INPUT_STATUS_VALUES,
  getTextHighlightMeta,
  ALL_BORDER_RADIUS_VALUES,
} from '@admiral-ds/react-ui';
import type { Theme } from '@admiral-ds/react-ui';
import { ReactComponent as SearchSolidSVG } from '@admiral-ds/icons/build/system/SearchSolid.svg';

export default {
  title: 'Admiral-2.1/Input/SuggestInput',
  component: SuggestInput,
  decorators: [withDesign],
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/CC0WL5u9TPtZpyLbbAGFGt/Admiral-2.0-UI-Kit?node-id=39%3A60520',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/CC0WL5u9TPtZpyLbbAGFGt/Admiral-2.0-UI-Kit?node-id=39%3A60826',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/CC0WL5u9TPtZpyLbbAGFGt/Admiral-2.0-UI-Kit?node-id=39%3A60855',
      },
    ],
  },
  argTypes: {
    dimension: {
      options: INPUT_DIMENSIONS_VALUES,
      control: { type: 'radio' },
    },
    status: {
      options: INPUT_STATUS_VALUES,
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    disableCopying: {
      control: { type: 'boolean' },
    },
    displayClearIcon: {
      control: { type: 'boolean' },
    },
    alignDropdown: {
      options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      control: { type: 'radio' },
    },
    placeholder: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    onChange: {
      action: 'onChange',
    },
    themeBorderKind: {
      options: ALL_BORDER_RADIUS_VALUES,
      control: { type: 'radio' },
    },
    skeleton: {
      control: { type: 'boolean' },
    },
    showTooltip: {
      control: { type: 'boolean' },
    },
    options: {
      control: false,
    },
    portalTargetRef: {
      control: false,
    },
    onSearchButtonClick: {
      control: false,
    },
    dropMaxHeight: {
      control: false,
    },
    icon: {
      control: false,
    },
    icons: {
      control: false,
    },
    locale: {
      control: false,
    },
    dropContainerCssMixin: {
      control: false,
    },
    dropContainerClassName: {
      control: false,
    },
    dropContainerStyle: {
      control: false,
    },
    containerRef: {
      control: false,
    },
    handleInput: {
      control: false,
    },
  },
} as ComponentMeta<typeof SuggestInput>;

const OPTIONS = [
  'text 1',
  'text 2 text text 2 text text 2 text text 2 text text 2 text text 2 text text 2 text ',
  'text 3',
  'text 4',
  'text 5',
  'text 6',
  'text 7',
  'text 8 text text 2 text text 2 text text 2 text text 2 text text 2 text text 2 text ',
  'text 9',
  'text 10',
  'text 11',
  'text 12',
];

const Template: ComponentStory<typeof SuggestInput> = (props) => {
  const cleanProps = (Object.keys(props) as Array<keyof typeof props>).reduce((acc, key) => {
    if (props[key] !== undefined) acc[key] = props[key];

    return acc;
  }, {} as Record<any, any>);

  const [localValue, setValue] = React.useState<string>(props.value ? String(props.value) : '');
  const [isLoading, setIsLoading] = React.useState(false);
  const [options, setOptions] = React.useState<string[] | undefined>();

  const handleSelectOption = (option: string) => {
    setValue(option);
    console.log(`Selected option - ${option}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    // Если в инпуте больше 3х символов производим запрос на поиск совпадений
    if (localValue?.length < 3 && inputValue?.length > 2) {
      setIsLoading(true);
      setOptions([]);
    }
    setValue(inputValue);
    props.onChange?.(e);
  };

  // Имитация запросов на бакэнд
  React.useEffect(() => {
    if (isLoading) {
      const timeout = window.setTimeout(() => {
        setIsLoading(false);
        setOptions([...OPTIONS]);
      }, 3000);
      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [isLoading]);

  function swapBorder(theme: Theme): Theme {
    theme.shape.borderRadiusKind = (props as any).themeBorderKind || theme.shape.borderRadiusKind;
    return theme;
  }

  return (
    <ThemeProvider theme={swapBorder}>
      <SuggestInput
        className="suggest"
        {...cleanProps}
        value={localValue}
        onInput={handleChange}
        onOptionSelect={handleSelectOption}
        options={options}
        isLoading={isLoading}
        onSearchButtonClick={() => {
          console.log('search button click');
        }}
        displayClearIcon
        dropContainerClassName="dropContainerClass"
      />
    </ThemeProvider>
  );
};

const options = ['one', 'two', 'three'];
const TemplateUncontrolled: ComponentStory<typeof SuggestInput> = (props) => {
  return <SuggestInput options={options} placeholder="numbers" dimension={props.dimension} />;
};

const optionsNoMatch: string[] = [];
const TemplateNoMatch: ComponentStory<typeof SuggestInput> = (props) => {
  return <SuggestInput options={optionsNoMatch} placeholder="numbers" dimension={props.dimension} />;
};

const TemplateFilter: ComponentStory<typeof SuggestInput> = (props) => {
  const cleanProps = (Object.keys(props) as Array<keyof typeof props>).reduce((acc, key) => {
    if (props[key] !== undefined) acc[key] = props[key];

    return acc;
  }, {} as Record<any, any>);

  const [localValue, setValue] = React.useState<string>(props.value ? String(props.value) : '');
  const [options, setOptions] = React.useState<string[] | undefined>([...OPTIONS]);

  const handleSelectOption = (option: string) => {
    setValue(option);
    console.log(`Selected option - ${option}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    setValue(inputValue);
    props.onChange?.(e);
  };

  React.useEffect(() => {
    const filteredOptions: string[] = OPTIONS.filter(
      (option) => getTextHighlightMeta(option, localValue, 'wholly').shouldHighlight,
    );
    setOptions(filteredOptions);
  }, [localValue]);

  return (
    <SuggestInput
      className="suggest"
      {...cleanProps}
      value={localValue}
      onInput={handleChange}
      onOptionSelect={handleSelectOption}
      options={options}
      onSearchButtonClick={() => {
        console.log('search button click');
      }}
      displayClearIcon
    />
  );
};

export const SuggestInputStory = Template.bind({});
SuggestInputStory.args = {
  placeholder: 'Начните набирать text',
};
SuggestInputStory.storyName = 'Suggest Input компонент';

export const SuggestInputStory2 = Template.bind({});
SuggestInputStory2.args = {
  placeholder: 'Начните набирать text',
  icon: SearchSolidSVG,
};
SuggestInputStory2.storyName = 'Suggest Input альтернативная иконка';

export const SuggestInputUncontrolled = TemplateUncontrolled.bind({});
SuggestInputUncontrolled.storyName = 'Suggest Input неконтроллируемый';

export const SuggestInputNoMatch = TemplateNoMatch.bind({});
SuggestInputNoMatch.storyName = 'Suggest Input "Нет совпадений"';

export const SuggestInputFilter = TemplateFilter.bind({});
SuggestInputFilter.storyName = 'Suggest Input с фильтрацией';
