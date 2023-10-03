import '@testing-library/jest-dom/extend-expect';
import { timeStampCheck } from '@components/Sales/VehicleInvoiceGeneration/utils/TimeStampCheck';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('utils components', () => {
    it('should render components', () => {
        const TimeStampCheck = timeStampCheck;
        customRender(<TimeStampCheck />);
    });
});
