import '@testing-library/jest-dom/extend-expect';
import { AddOnDetailsMaster } from '@components/Sales/VehicleDeliveryNote/AddOnDetails/AddOnDetailsMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddOn Detail Master components', () => {
    it('should render components', () => {
        customRender(<AddOnDetailsMaster />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<AddOnDetailsMaster formActionType={formActionType} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
        fireEvent.click(plusImg[2]);
    });
});
