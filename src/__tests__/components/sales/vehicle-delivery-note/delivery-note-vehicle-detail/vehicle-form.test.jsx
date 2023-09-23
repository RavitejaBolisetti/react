import '@testing-library/jest-dom/extend-expect';
import VehicleInfoForm from '@components/Sales/VehicleDeliveryNote/VehicleDetails/VehicleInfoForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle form master components', () => {
    it('should render components', () => {
        customRender(<VehicleInfoForm />);
    });
 
});
