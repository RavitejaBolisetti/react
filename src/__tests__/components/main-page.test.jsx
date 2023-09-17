import '@testing-library/jest-dom/extend-expect';
import { MainPage } from '@components/MainPage';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Main Page components', () => {
    it('should render components', () => {
        customRender(<MainPage isLoggedIn={true} />);
    });
});
