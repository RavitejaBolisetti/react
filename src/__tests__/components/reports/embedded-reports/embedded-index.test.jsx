import '@testing-library/jest-dom/extend-expect';

import { EmbeddedReportMaster } from '@components/Reports/EmbeddedReport/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<EmbeddedReportMaster />);
    });
});
