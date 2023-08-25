import '@testing-library/jest-dom/extend-expect';
import { OTFReports } from '@components/common/OTFReports';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('OTF Reports components', () => {
    it('should render OTFReports components', () => {
        customRender(<OTFReports/>)
    });
});