import '@testing-library/jest-dom/extend-expect';
import { MainPage } from '@components/MainPage';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('MainPageBase', () => {
  it('renders AuthenticatedUserPage when isLoggedIn is true', () => {
    const notification = {
      visible: false,
      notificationType: 'success',
      title: 'Success',
      message: 'Authentication successful',
      placement: 'top',
      showTitle: true,
    };

    const localStorageMock = {
      getItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    localStorageMock.getItem.mockReturnValueOnce('access_token').mockReturnValueOnce('user_id');

    customRender(<MainPage notification={notification} />);
  });

  it('renders UnAuthenticatedUserPage when isLoggedIn is false', () => {
    const notification = {
      visible: false,
      notificationType: 'info',
      title: 'Info',
      message: 'Please log in',
      placement: 'bottom',
      showTitle: true,
    };

    const localStorageMock = {
      getItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    localStorageMock.getItem.mockReturnValueOnce(null).mockReturnValueOnce(null);

    customRender(<MainPage notification={notification} />);
  });
});
