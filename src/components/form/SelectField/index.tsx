import type { SelectProps } from '#src/components/input/Select';
import { Select as BaseSelect } from '#src/components/input/Select';
import * as React from 'react';
import { Field, FieldOwnProps } from '#src/components/Field';
import styled from 'styled-components';
import { uid } from '#src/components/common/uid';

const Select = styled(BaseSelect)`
  [data-status='error'] & {
    border-color: ${(props) => props.theme.color['Error/Error 60 Main']};
  }
`;

export interface SearchSelectFieldProps
  extends SelectProps,
    Omit<FieldOwnProps, 'inputRef' | 'onChange' | 'displayCharacterCounter' | 'maxLength'> {}

export const SelectField = React.forwardRef<HTMLSelectElement, SearchSelectFieldProps>((props, ref) => {
  const fieldRef = React.useRef(null);
  const { className, displayInline, status, required, extraText, label, id = uid(), disabled, ...restProps } = props;
  const fieldContainerProps = {
    className,
    extraText,
    status,
    required,
    label,
    id,
    displayInline,
    disabled,
    ref: fieldRef,
    'data-field-id': id,
    'data-field-name': restProps.name,
  } as Record<string, any>;

  (Object.keys(restProps) as Array<keyof typeof restProps>).forEach((key) => {
    if (key.startsWith('data-field')) {
      fieldContainerProps[key] = restProps[key];
    }
  });

  const selectProps = {
    ref,
    id,
    'aria-required': required,
    status,
    disabled,
    ...restProps,
    portalTargetRef: fieldRef,
  };
  return (
    <Field {...fieldContainerProps}>
      <Select {...selectProps} />
    </Field>
  );
});

SelectField.displayName = 'SelectField';
