import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CMSPage } from '@pages/cms/CMSPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('CMSPage Component', () => {
    it('should check CMSPage is working', async () => {
        customRender(<CMSPage />);
    });
});
