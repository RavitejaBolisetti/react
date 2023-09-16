import '@testing-library/jest-dom/extend-expect';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDeliveryNote/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Customer Detail Master components', () => {
    it('should render components', () => {
        customRender(<CustomerDetailsMaster />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<CustomerDetailsMaster formActionType={formActionType} />);
    });
});
