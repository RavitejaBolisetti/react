import '@testing-library/jest-dom/extend-expect';
import { OtfReportsMaster } from '@components/common/OTFReports/OtfReportsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('OTF Reports components', () => {
    it('should render OTFReports components', () => {
        customRender(<OtfReportsMaster/>)
    });
});