import '@testing-library/jest-dom/extend-expect';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDeliveryNote/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vehicle Detail master components', () => {
    it('should render components', () => {
        customRender(<VehicleDetailsMaster />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<VehicleDetailsMaster formActionType={formActionType} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
    });
});
