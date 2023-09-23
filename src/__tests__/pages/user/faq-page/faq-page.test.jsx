import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { FaqPage } from '@pages/user/FaqPage/FaqPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('FaqPage Component', () => {
    it('should check FaqPage is working', async () => {
        customRender(<FaqPage />);
    });
});
