import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { BiReportPage } from '@pages/report/BiReport/BiReportPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('BiReportPage Components', () => {
    it('should render BiReportPage components', () => {
        customRender(<BiReportPage />);
    });
});
