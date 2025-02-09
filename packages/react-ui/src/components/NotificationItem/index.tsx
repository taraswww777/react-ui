import * as React from 'react';
import type { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as InfoIcon } from '@admiral-ds/icons/build/service/InfoSolid.svg';
import { ReactComponent as WarningIcon } from '@admiral-ds/icons/build/service/ErrorSolid.svg';
import { ReactComponent as SuccessIcon } from '@admiral-ds/icons/build/service/CheckSolid.svg';
import { ReactComponent as ErrorIcon } from '@admiral-ds/icons/build/service/CloseSolid.svg';

import { LIGHT_THEME as DEFAULT_THEME } from '#src/components/themes';
import { typography } from '#src/components/Typography';
import { mediumGroupBorderRadius } from '#src/components/themes/borderRadius';
import { CloseIconPlacementButton } from '#src/components/IconPlacement';

export type NotificationItemStatus = 'info' | 'error' | 'success' | 'warning';

export interface NotificationItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'id'> {
  /** Статус notification */
  status?: NotificationItemStatus;
  /** Переключатель видимости иконки "Close" */
  isClosable?: boolean;
  /** Закрытие notification */
  onClose?: () => void;
  /** Переключатель видимости статусных иконок */
  displayStatusIcon?: boolean;
}

const getIcon = (status: NotificationItemStatus) => {
  switch (status) {
    case 'info':
      return InfoIcon;
    case 'error':
      return ErrorIcon;
    case 'success':
      return SuccessIcon;
    case 'warning':
    default:
      return WarningIcon;
  }
};

const backGroundColorMixin = css<{ status?: NotificationItemStatus }>`
  background-color: ${({ theme, status }) => {
    if (status === 'warning') return theme.color['Warning/Warning 10'];
    if (status === 'error') return theme.color['Error/Error 10'];
    if (status === 'success') return theme.color['Success/Success 10'];
    return theme.color['Primary/Primary 10'];
  }};
`;

const borderColorMixin = css<{ status?: NotificationItemStatus }>`
  border-color: ${({ theme, status }) => {
    if (status === 'warning') return theme.color['Warning/Warning 50 Main'];
    if (status === 'error') return theme.color['Error/Error 60 Main'];
    if (status === 'success') return theme.color['Success/Success 50 Main'];
    return theme.color['Primary/Primary 60 Main'];
  }};
`;

const NotificationItemWrapper = styled.div<{
  status?: NotificationItemStatus;
  displayStatusIcon: boolean;
  isClosable: boolean;
}>`
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  border-radius: ${(p) => mediumGroupBorderRadius(p.theme.shape)};
  padding: 12px 44px 12px 52px;
  ${(p) => (p.displayStatusIcon ? '' : 'padding-left: 16px;')}
  ${(p) => (p.isClosable ? '' : 'padding-right: 16px;')}
  border-width: 1px;
  border-style: solid;
  ${borderColorMixin};
  ${backGroundColorMixin};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 0;
`;

const Title = styled.div`
  ${typography['Subtitle/Subtitle 3']}
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
  margin-bottom: 4px;
`;

const CustomBody = styled.div`
  ${typography['Body/Body 2 Long']}
  color: ${({ theme }) => theme.color['Neutral/Neutral 90']};
`;

const ButtonPanel = styled.div`
  display: flex;
  margin-top: 4px;
  gap: 16px;
`;

const CloseButton = styled(CloseIconPlacementButton)`
  position: absolute;
  top: 10px;
  right: 8px;
`;

const IconWrapper = styled.div<{ status?: NotificationItemStatus }>`
  position: absolute;
  top: 12px;
  left: 16px;
  width: 24px;
  height: 24px;
  & svg {
    width: 24px;
    height: 24px;
    & *[fill^='#'] {
      fill: ${({ theme, status }) => {
        if (status === 'warning') return theme.color['Warning/Warning 50 Main'];
        if (status === 'error') return theme.color['Error/Error 60 Main'];
        if (status === 'success') return theme.color['Success/Success 50 Main'];
        return theme.color['Primary/Primary 60 Main'];
      }};
    }
  }
`;

NotificationItemWrapper.defaultProps = {
  theme: DEFAULT_THEME,
};

export const NotificationItem = ({
  status = 'info',
  displayStatusIcon = false,
  isClosable = false,
  onClose,
  children,
  ...props
}: React.PropsWithChildren<NotificationItemProps>) => {
  const NotificationIcon = getIcon(status);

  const isAlert = status !== 'info';

  return (
    <NotificationItemWrapper
      role={isAlert ? 'alert' : 'status'}
      aria-live={isAlert ? 'assertive' : 'polite'}
      status={status}
      displayStatusIcon={displayStatusIcon}
      isClosable={isClosable}
      {...props}
    >
      {displayStatusIcon && (
        <IconWrapper status={status}>
          <NotificationIcon />
        </IconWrapper>
      )}
      <Content>{children}</Content>
      {isClosable && <CloseButton dimension="mSmall" highlightFocus={false} onClick={onClose} />}
    </NotificationItemWrapper>
  );
};

export const NotificationItemTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
  return <Title {...props}>{children}</Title>;
};

export const NotificationItemContent: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
  return <CustomBody {...props}>{children}</CustomBody>;
};

export const NotificationItemButtonPanel: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return <ButtonPanel {...props}>{children}</ButtonPanel>;
};

NotificationItem.displayName = 'NotificationItem';

export const StyledNotificationItem = styled(NotificationItem)`
  ${(props) => props.theme.shadow['Shadow 08']}
`;
