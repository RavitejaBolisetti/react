import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleDeliveryNoteMasterPage } from '@pages/Sales/VehicleDeliveryNote/VehicleDeliveryNoteMasterPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleDeliveryNoteMaster Page Components', () => {
    it('should render VehicleDeliveryNoteMaster components', () => {
        customRender(<VehicleDeliveryNoteMasterPage />);
    });
});
