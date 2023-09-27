import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { SplashPage } from '@pages/splash/SplashPage';
import { act } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.useFakeTimers();

describe('SplashPage Component', () => {

    it('should check SplashPage is working', async () => {
        customRender(<SplashPage />);

        act(() => {
            jest.runAllTimers();
        });
    });

});
