import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleInvoiceMasterPage } from '@pages/Sales/VehicleInvoiceGeneration/VehicleInvoiceMasterPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleInvoiceMaster Page Components', () => {
    it('should render VehicleInvoiceMaster components', () => {
        customRender(<VehicleInvoiceMasterPage />);
    });
});
