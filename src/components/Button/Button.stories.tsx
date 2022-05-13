import * as React from 'react';
import styled from 'styled-components';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ReactComponent as StarSolid } from '@admiral-ds/icons/build/system/StarSolid.svg';
import { Button } from './index';
import { PseudoText } from '#src/components/skeleton/PseudoText';
import { PseudoIcon } from '#src/components/skeleton/PseudoIcon';
import { T } from '#src/components/T';
import { Spinner } from '#src/components/Spinner';
import { withDesign } from 'storybook-addon-designs';
import { filterKeysWithUndefinedValues } from '#src/components/common/utils/filterKeysWithUndefinedValues';

const WrapperButton = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 8px;
    flex-basis: 170px;
  }

  justify-content: space-between;
  align-items: center;
`;
const WrapperVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Separator = styled.div`
  height: 20px;
  width: 20px;
`;
const DarkDiv = styled.div`
  background-color: ${({ theme }) => theme.color['Special/Dark Static Neutral 00']};
  padding: 2px;
`;

export default {
  title: 'Admiral-2.1/Button',
  component: Button,
  decorators: [withDesign],
  parameters: {
    design: [
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A19734',
      },
      {
        type: 'figma',
        url: 'https://www.figma.com/file/EGEGZsx8WhdxpmFKu8J41G/Admiral-2.1-UI-Kit?node-id=39%3A16209',
      },
    ],
  },
  argTypes: {
    dimension: {
      control: {
        type: 'radio',
        options: ['xl', 'l', 'm', 's'],
      },
    },
    appearance: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'success', 'ghost', 'white'],
      },
    },
    onClick: { action: 'clicked' },

    type: {
      control: {
        type: 'radio',
        options: ['button', 'submit', 'reset'],
      },
    },
  },
} as ComponentMeta<typeof Button>;

const ButtonContainer = styled.div`
  padding: 24px;
  position: relative;
  display: block;

  > * {
    margin: 8px 16px 0 0;
  }
`;

const ButtonWithIconDemo: ComponentStory<typeof Button> = () => (
  <>
    <WrapperButton>
      <div>
        <T font="Body/Body 1 Long" as="div">
          {' '}
          Dimension - xl
        </T>
        <Button dimension="xl" appearance="primary">
          Button 56
          <StarSolid />
        </Button>
      </div>
      <div>
        <T font="Body/Body 1 Long" as="div">
          {' '}
          Dimension - l
        </T>
        <Button dimension="l" appearance="secondary">
          <StarSolid />
          Button 48
        </Button>
      </div>
      <div>
        <T font="Body/Body 1 Long" as="div">
          {' '}
          Dimension - m
        </T>
        <Button dimension="m" appearance="danger">
          Button 40
          <StarSolid />
        </Button>
      </div>
      <div>
        <T font="Body/Body 1 Long" as="div">
          {' '}
          Ghost - xl
        </T>
        <Button dimension="xl" appearance="ghost">
          Button 56
          <StarSolid />
        </Button>
      </div>
      <>
        <DarkDiv>
          <T font="Body/Body 1 Long" as="div">
            {' '}
            White - l
          </T>
          <Button dimension="l" appearance="white">
            Button 48
            <StarSolid />
          </Button>
        </DarkDiv>
      </>
      <div>
        <T font="Body/Body 1 Long" as="div">
          {' '}
          Dimension - s
        </T>
        <Button dimension="s" appearance="success">
          <StarSolid />
          Button 32
        </Button>
      </div>
    </WrapperButton>
    <Separator />
    <div>
      <T font="Body/Body 1 Long" as="div">
        Button with icon stretch
      </T>
      <Button dimension="l" appearance="primary" style={{ width: '100%' }}>
        <StarSolid />
        Button
      </Button>
    </div>
  </>
);

const ButtonLoaderDemo: ComponentStory<typeof Button> = () => (
  <>
    {/* <T font="Body/Body 1 Long" as="div">
        Button with loader
      </T> */}
    <Wrapper>
      <WrapperVertical>
        <T font="Body/Body 1 Long" as="div">
          Size XL
        </T>
        <Separator />
        <Button dimension="xl">Button 48</Button>
        <Separator />
        <Button dimension="xl" appearance="primary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="xl" appearance="secondary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="xl" appearance="ghost" loading>
          Button 48
        </Button>
        <Separator />
        <DarkDiv>
          <Button dimension="xl" appearance="white" loading>
            Button 48
          </Button>
        </DarkDiv>
        <Separator />
        <Button dimension="xl" appearance="danger" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="xl" appearance="success" loading>
          Button 48
        </Button>
      </WrapperVertical>
      <Separator />
      <WrapperVertical>
        <T font="Body/Body 1 Long" as="div">
          Size L
        </T>
        <Separator />
        <Button dimension="l">Button 48</Button>
        <Separator />
        <Button dimension="l" appearance="primary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="l" appearance="secondary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="l" appearance="ghost" loading>
          Button 48
        </Button>
        <Separator />
        <DarkDiv>
          <Button dimension="l" appearance="white" loading>
            Button 48
          </Button>
        </DarkDiv>
        <Separator />
        <Button dimension="l" appearance="danger" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="l" appearance="success" loading>
          Button 48
        </Button>
      </WrapperVertical>
      <Separator />
      <WrapperVertical>
        <T font="Body/Body 1 Long" as="div">
          Size M
        </T>
        <Separator />
        <Button dimension="m">Button 48</Button>
        <Separator />
        <Button dimension="m" appearance="primary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="m" appearance="secondary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="m" appearance="ghost" loading>
          Button 48
        </Button>
        <Separator />
        <DarkDiv>
          <Button dimension="m" appearance="white" loading>
            Button 48
          </Button>
        </DarkDiv>
        <Separator />
        <Button dimension="m" appearance="danger" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="m" appearance="success" loading>
          Button 48
        </Button>
      </WrapperVertical>
      <Separator />
      <WrapperVertical>
        <T font="Body/Body 1 Long" as="div">
          Size S
        </T>
        <Separator />
        <Button dimension="s">Button 48</Button>
        <Separator />
        <Button dimension="s" appearance="primary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="s" appearance="secondary" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="s" appearance="ghost" loading>
          Button 48
        </Button>
        <Separator />
        <DarkDiv>
          <Button dimension="s" appearance="white" loading>
            Button 48
          </Button>
        </DarkDiv>
        <Separator />
        <Button dimension="s" appearance="danger" loading>
          Button 48
        </Button>
        <Separator />
        <Button dimension="s" appearance="success" loading>
          Button 48
        </Button>
      </WrapperVertical>
    </Wrapper>
    <Separator />
    <div>
      <T font="Body/Body 1 Long" as="div">
        Button with loader stretch
      </T>
      <Separator />
      <Button disabled loading style={{ width: '100%' }}></Button>
    </div>
  </>
);

const ButtonSkeleton: ComponentStory<typeof Button> = ({ appearance = 'primary', dimension = 'xl', ...args }) => (
  <>
    <WrapperButton>
      <Button disabled dimension={dimension} appearance={appearance} {...args}>
        <PseudoText dimension={dimension} appearance={appearance} />
      </Button>
      <Button disabled dimension={dimension} appearance={appearance} {...args}>
        <PseudoIcon dimension={dimension} appearance={appearance} />
        <PseudoText dimension={dimension} appearance={appearance} />
      </Button>
      <Button disabled dimension={dimension} appearance={appearance} {...args}>
        <PseudoText dimension={dimension} appearance={appearance} />
        <PseudoIcon dimension={dimension} appearance={appearance} />
      </Button>
      <div style={{ marginLeft: 10 }}>
        <Button disabled displayAsSquare dimension={dimension} appearance={appearance} {...args}>
          <PseudoIcon dimension={dimension} appearance={appearance} />
        </Button>
      </div>
    </WrapperButton>
  </>
);

const ButtonPlaygroundDemo: ComponentStory<typeof Button> = ({ children, ...args }) => {
  const cleanProps = filterKeysWithUndefinedValues(args);
  return (
    <>
      <ButtonContainer>
        <Button {...cleanProps}>Button 56</Button>

        <Button {...cleanProps}>
          <StarSolid />
          Button 56
        </Button>

        <Button {...cleanProps}>Button 56</Button>

        <Button {...cleanProps}>
          Button 56
          <StarSolid />
        </Button>

        <Button {...cleanProps}>
          <StarSolid />
        </Button>

        <Button {...cleanProps} displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button dimension="xl">Button 56</Button>

        <Button dimension="xl">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl">Button 56</Button>

        <Button dimension="xl">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl">
          <StarSolid />
        </Button>

        <Button dimension="xl" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button dimension="xl" appearance="secondary">
          Button 56
        </Button>

        <Button dimension="xl" appearance="secondary">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl" appearance="secondary">
          Button 56
        </Button>

        <Button dimension="xl" appearance="secondary">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="secondary">
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="secondary" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button dimension="xl" appearance="ghost">
          Button 56
        </Button>

        <Button dimension="xl" appearance="ghost">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl" appearance="ghost">
          Button 56
        </Button>

        <Button dimension="xl" appearance="ghost">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="ghost">
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="ghost" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button dimension="xl" appearance="danger">
          Button 56
        </Button>

        <Button dimension="xl" appearance="danger">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl" appearance="danger">
          Button 56
        </Button>

        <Button dimension="xl" appearance="danger">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="danger">
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="danger" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button dimension="xl" appearance="success">
          Button 56
        </Button>

        <Button dimension="xl" appearance="success">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl" appearance="success">
          Button 56
        </Button>

        <Button dimension="xl" appearance="success">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="success">
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="success" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
      <ButtonContainer style={{ backgroundColor: '#2B313B' }}>
        <Button dimension="xl" appearance="white">
          Button 56
        </Button>

        <Button dimension="xl" appearance="white">
          <StarSolid />
          Button 56
        </Button>

        <Button dimension="xl" appearance="white">
          Button 56
        </Button>

        <Button dimension="xl" appearance="white">
          Button 56
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="white">
          <StarSolid />
        </Button>

        <Button dimension="xl" appearance="white" displayAsSquare>
          <StarSolid />
        </Button>
      </ButtonContainer>
    </>
  );
};

export const ButtonWithIcon = ButtonWithIconDemo.bind({});
export const ButtonLoader = ButtonLoaderDemo.bind({});
// export const Skeleton = ButtonSkeleton.bind({});

export const Playground = ButtonPlaygroundDemo.bind({});
Playground.args = {
  children: 'Нажми меня',
};
