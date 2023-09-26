import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleTrackingPage } from '@pages/Sales/VehicleTracking/VehicleTrackingPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleTracking Page Components', () => {
    it('should render VehicleTracking components', () => {
        customRender(<VehicleTrackingPage />);
    });
});
