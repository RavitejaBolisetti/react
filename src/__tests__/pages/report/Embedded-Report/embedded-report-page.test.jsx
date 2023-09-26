import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { EmbeddedReportPage } from '@pages/report/EmbeddedReport/EmbeddedReportPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Embedded Report page Components', () => {
    it('should render Embedded components', () => {
        customRender(<EmbeddedReportPage />);
    });
});
