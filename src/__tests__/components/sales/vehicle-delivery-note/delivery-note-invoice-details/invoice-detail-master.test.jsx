import '@testing-library/jest-dom/extend-expect';
import { InvoiceDetailsMaster } from '@components/Sales/VehicleDeliveryNote/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Invoice Detail Master components', () => {
    it('should render components', () => {
        customRender(<InvoiceDetailsMaster />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<InvoiceDetailsMaster formActionType={formActionType} />);
    });
});
