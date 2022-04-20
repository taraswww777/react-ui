import { PhoneInputField } from '#src/components/form/PhoneInputField';
import { INPUT_DIMENSIONS_VALUES } from '#src/components/input';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Admiral-2.1/Form Field/PhoneInputField',
  component: PhoneInputField,
  decorators: [withDesign],
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61244',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61271',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A61297',
      },
    ],
  },
  argTypes: {
    dimension: {
      options: INPUT_DIMENSIONS_VALUES,
      control: { type: 'radio' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    displayStatusIcon: {
      control: { type: 'boolean' },
    },
    displayClearIcon: {
      control: { type: 'boolean' },
    },
    disableCopying: {
      control: { type: 'boolean' },
    },
    displayCharacterCounter: {
      control: { type: 'boolean' },
    },
    displayInline: {
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof PhoneInputField>;

const Template: ComponentStory<typeof PhoneInputField> = (props) => {
  const cleanProps = (Object.keys(props) as Array<keyof typeof props>).reduce((acc, key) => {
    if (props[key] !== undefined) acc[key] = props[key];

    return acc;
  }, {} as Record<any, any>);

  const [localValue, setValue] = React.useState<string>(props.value ?? '');

  React.useEffect(() => {
    if (props.value !== undefined) {
      setValue(String(props.value));
    }
  }, [props.value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setValue(inputValue);
    props.onChange?.(e);
  };

  return (
    <>
      <PhoneInputField {...cleanProps} value={localValue} defaultCountry="RUS" dimension="xl" onChange={handleChange} />
    </>
  );
};

export const InputFieldInput = Template.bind({});

InputFieldInput.args = {
  label: 'Введите номер телефона',
};

InputFieldInput.storyName = 'PhoneInputField example';
