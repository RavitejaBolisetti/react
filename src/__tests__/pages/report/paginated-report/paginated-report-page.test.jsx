import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { PaginatedReportPage } from '@pages/report/PaginatedReport/PaginatedReportPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('PaginatedReportPage Components', () => {
    it('should render PaginatedReportPage components', () => {
        customRender(<PaginatedReportPage />);
    });
});
