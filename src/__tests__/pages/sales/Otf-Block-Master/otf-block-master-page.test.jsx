import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OtfBlockMasterPage } from '@pages/Sales/OtfBlockMaster/OtfBlockMasterPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('OtfBlockMaster Page  Components', () => {
    it('should render OtfBlockMaster components', () => {
        customRender(<OtfBlockMasterPage />);
    });
});
