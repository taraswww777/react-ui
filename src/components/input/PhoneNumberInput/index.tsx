import * as React from 'react';
import type { DefaultTheme, FlattenInterpolation, ThemeProps } from 'styled-components';
import styled, { css } from 'styled-components';
import { changeInputData } from '#src/components/common/dom/changeInputData';
import { refSetter } from '#src/components/common/utils/refSetter';
import type { TextInputProps } from '#src/components/input/TextInput';
import { TextInput } from '#src/components/input/TextInput';
import { ReactComponent as SmallArrowDownOutline } from '@admiral-ds/icons/build/system/SmallArrowDownOutline.svg';
import { CountryCodes } from '#src/components/input/PhoneNumberInput/constants';
import { Flag } from '#src/components/input/PhoneNumberInput/Flag';
import type { Dimension } from '#src/components/input/PhoneNumberInput/utils';
import {
  clojureHandler,
  defaultPhoneNumberInputHandler,
} from '#src/components/input/PhoneNumberInput/defaultPhoneNumberInputHandle';
import type { CountryInfo } from '#src/components/input/PhoneNumberInput/CountriesList';
import { CountriesList } from '#src/components/input/PhoneNumberInput/CountriesList';
import { uid } from '#src/components/common/uid';
import type {
  CountryPhoneCode,
  findCountryFunction,
} from '#src/components/input/PhoneNumberInput/findCoutryWithPriority';
import getFindCountryFunction from '#src/components/input/PhoneNumberInput/findCoutryWithPriority';
import type { ComponentName, CountryAlpha3Code } from '@admiral-ds/flags';
import { ComponentsNames, CountriesRusNames, FlagsPack } from '@admiral-ds/flags';
import { StyledDropdownContainer } from '#src/components/DropdownContainer';
import type { MenuDimensions } from '#src/components/Menu';
import { keyboardKey } from '#src/components/common/keyboardKey';

const Chevron = styled(SmallArrowDownOutline)<{ disabled?: boolean }>`
  transition: transform 0.3s;
  flex-shrink: 0;
  margin-left: 1px;

  & path {
    fill: ${(p) => (p.disabled ? p.theme.color['Neutral/Neutral 30'] : p.theme.color['Neutral/Neutral 50'])};
  }
  ${(p) => p.disabled && 'pointer-events: none;'}
`;

const disabledStyles = css`
  & svg {
    opacity: 0.4;
  }
`;

const PhoneContainer = styled.div<{ dimension: Dimension; disabled?: boolean; readOnly?: boolean }>`
  position: relative;

  & ${Chevron} {
    width: ${(p) => (p.dimension === 's' ? '20px' : '24px')};
    height: ${(p) => (p.dimension === 's' ? '20px' : '24px')};
  }

  & input {
    padding-left: ${(p) => (p.dimension === 's' ? (p.readOnly ? '40px' : '60px') : p.readOnly ? '48px' : '72px')};
  }
`;

const CountryContainer = styled.div<{
  dimension: Dimension;
  isOpened?: boolean;
  disabled?: boolean;
  skeleton?: boolean;
}>`
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  display: flex;

  & ${Chevron} {
    & *[fill^='#'] {
      stroke: none;
    }

    transform: ${(p) => (p.isOpened && !p.disabled ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  ${(p) => p.disabled && disabledStyles};
  visibility: ${(p) => (p.skeleton ? 'hidden' : 'visible')};
`;

const PhoneInputDropContainer = styled(StyledDropdownContainer)`
  width: 100%;
`;

export interface PhoneNumberInputProps extends Omit<TextInputProps, 'value'> {
  value?: string;
  /** Код ISO A3 страны для определния префикса номера по умолчанию */
  defaultCountry?: CountryAlpha3Code;
  /** Список стран для выпадающего списка. Отмечается кодом ISO A3 страны */
  onlyCountries?: Array<CountryAlpha3Code>;
  /** Позволяет добавлять миксин для выпадающих меню, созданный с помощью styled css  */
  dropContainerCssMixin?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const AVAILABLE_ALPHA3_CODES = Object.keys(ComponentsNames);

export const PhoneNumberInput = React.forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      value = '',
      disabled = false,
      dimension = 'xl',
      defaultCountry = 'RUS',
      onlyCountries = AVAILABLE_ALPHA3_CODES,
      handleInput,
      skeleton = false,
      dropContainerCssMixin,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = React.useState<number>(-1);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
    const inputContainerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = React.useState<boolean>(false);

    const menuDimension: MenuDimensions = React.useMemo(() => {
      return dimension === 'xl' ? 'l' : dimension;
    }, [dimension]);

    const countryList = React.useMemo<CountryInfo[]>(() => {
      return onlyCountries
        .reduce((acc: CountryPhoneCode[], iso3) => {
          const codes = CountryCodes[iso3];
          if (codes) {
            codes.forEach((code) => acc.push({ iso3, code }));
          }
          return acc;
        }, [])
        .map((item) => {
          const { iso3, code } = item;
          return {
            ...item,
            rusName: CountriesRusNames[iso3],
            name: ComponentsNames[iso3],
            uid: uid(),
            handleInput: handleInput ? handleInput : clojureHandler(code),
          };
        })
        .sort((a, b) => a.rusName.localeCompare(b.rusName, 'ru'));
    }, [onlyCountries]);

    const findCountry = React.useMemo<findCountryFunction>(() => getFindCountryFunction(countryList), [countryList]);

    const currentCountry = React.useMemo<CountryPhoneCode | null>(() => findCountry(value), [value]);
    const currentCountryIndex = currentCountry
      ? countryList.findIndex((item) => item.iso3 === currentCountry.iso3 && item.code === currentCountry.code)
      : -1;
    const selectedCountryCode = selectedIndex > -1 ? countryList[selectedIndex].code : null;
    const sameCountryCode = currentCountry?.code === selectedCountryCode;

    if (currentCountryIndex !== selectedIndex && !sameCountryCode) setSelectedIndex(currentCountryIndex);

    const handleInputRef =
      currentCountryIndex > -1 ? countryList[currentCountryIndex].handleInput : defaultPhoneNumberInputHandler;

    React.useEffect(() => {
      if (defaultCountry && selectedIndex === -1) {
        const index = countryList.findIndex((country) => country.iso3 === defaultCountry);
        if (index > -1) {
          selectCountry(index);
        }
      }
    }, [defaultCountry]);

    const handleButtonClick = () => {
      setIsOpened((prev) => !prev);
    };

    const selectCountry = (indexNumber: number) => {
      if (!inputRef.current || indexNumber === selectedIndex) return;

      const hasOldSelected = selectedIndex > -1;

      const oldCode = hasOldSelected ? countryList[selectedIndex].code.replace(/[^0-9+]/g, '') : '';
      const newCode = countryList[indexNumber].code.replace(/[^0-9+]/g, '');

      const oldCodeLength = oldCode.length;
      const newCodeLength = newCode.length;
      const selStart = (inputRef.current?.selectionStart || 0) + (newCodeLength - oldCodeLength);
      const selEnd = (inputRef.current?.selectionEnd || 0) + (newCodeLength - oldCodeLength);

      changeInputData(inputRef.current, {
        value: hasOldSelected
          ? value.replace(/\s+/g, '').replace(oldCode, newCode)
          : newCode + value.replace(/\s+/g, ''),
        selectionStart: selStart > 0 ? selStart : 1,
        selectionEnd: selEnd > 0 ? selEnd : 1,
      });

      setSelectedIndex(indexNumber);
      setIsOpened(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      const code = keyboardKey.getCode(e);

      switch (code) {
        case keyboardKey[' ']:
        case keyboardKey.Enter: {
          if (isOpened) {
            e.preventDefault();
            if (selectedIndex !== activeIndex) {
              selectCountry(activeIndex);
            }
          }
          break;
        }
        case keyboardKey.ArrowDown: {
          if (!isOpened) {
            setIsOpened(true);
            e.preventDefault();
            break;
          }
          if (activeIndex >= countryList.length - 1) {
            setActiveIndex(0);
          } else {
            setActiveIndex(activeIndex + 1);
          }
          e.preventDefault();
          break;
        }
        case keyboardKey.ArrowUp: {
          if (!isOpened) {
            setIsOpened(true);
            e.preventDefault();
            break;
          }

          if (activeIndex <= 0) {
            setActiveIndex(countryList.length - 1);
          } else {
            setActiveIndex(activeIndex - 1);
          }
          e.preventDefault();
          break;
        }
        case keyboardKey.Escape: {
          if (isOpened) {
            setIsOpened(false);
            e.preventDefault();
          }
          break;
        }
      }
    };

    const clickOutside = (e: Event) => {
      if (e.target && containerRef.current?.contains(e.target as Node)) {
        return;
      }
      setIsOpened(false);
    };

    const IconComponent = React.useMemo<JSX.Element | null>(() => {
      if (selectedIndex > -1) {
        const SvgComponent = (FlagsPack as { [key: ComponentName]: React.ElementType })[
          countryList[selectedIndex].name
        ];
        return SvgComponent ? <Flag dimension={menuDimension} Component={SvgComponent} /> : null;
      }
      return null;
    }, [selectedIndex]);

    React.useEffect(() => {
      setActiveIndex(isOpened ? selectedIndex : -1);
    }, [isOpened]);

    React.useEffect(() => {
      if (isOpened) {
        setActiveIndex(selectedIndex);
      }
    }, [selectedIndex]);

    const handleHoverCountry = (id?: string) => {
      const index = countryList.findIndex((item) => item.uid === id);
      setActiveIndex(index);
    };

    const handleSelectCountry = (id?: string) => {
      const index = countryList.findIndex((item) => item.uid === id);
      selectCountry(index);
    };

    return (
      <PhoneContainer ref={containerRef} dimension={dimension} disabled={disabled} readOnly={props.readOnly}>
        <TextInput
          {...props}
          type="tel"
          ref={refSetter(ref, inputRef)}
          handleInput={handleInputRef}
          containerRef={inputContainerRef}
          value={value}
          disabled={disabled}
          dimension={dimension}
          skeleton={skeleton}
          onKeyDown={(...p) => {
            props.onKeyDown?.(...p);
            handleKeyDown(...p);
          }}
        >
          {isOpened && !disabled && !skeleton && (
            <PhoneInputDropContainer
              targetRef={inputRef}
              onClickOutside={clickOutside}
              alignSelf="stretch"
              dropContainerCssMixin={dropContainerCssMixin}
            >
              <CountriesList
                countries={countryList}
                selected={selectedIndex > -1 ? countryList[selectedIndex].uid : undefined}
                active={activeIndex > -1 ? countryList[activeIndex].uid : undefined}
                onActivateItem={handleHoverCountry}
                onSelectItem={handleSelectCountry}
                dimension={menuDimension}
              />
            </PhoneInputDropContainer>
          )}
        </TextInput>
        <CountryContainer
          skeleton={skeleton}
          dimension={dimension}
          isOpened={isOpened}
          disabled={disabled}
          onClick={handleButtonClick}
        >
          {IconComponent}
          {!props.readOnly && <Chevron disabled={disabled || props.readOnly} />}
        </CountryContainer>
      </PhoneContainer>
    );
  },
);

PhoneNumberInput.displayName = 'PhoneNumberInput';
