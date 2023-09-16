import '@testing-library/jest-dom/extend-expect';
import BatteryInfoForm from '@components/Sales/VehicleDeliveryNote/VehicleDetails/BatteryInfoForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Battery form master components', () => {
    it('should render components', () => {
        customRender(<BatteryInfoForm />);
    });
});
