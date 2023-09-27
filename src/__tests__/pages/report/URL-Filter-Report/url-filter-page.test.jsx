import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { URLFilterReportPage } from '@pages/report/URLFilterReport/URLFilterReportPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('URL Filter page Components', () => {
    it('should render URL components', () => {
        customRender(<URLFilterReportPage />);
    });
});
