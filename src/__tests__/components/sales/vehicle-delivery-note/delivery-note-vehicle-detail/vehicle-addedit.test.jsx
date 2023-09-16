import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/VehicleDeliveryNote/VehicleDetails/AddEditForm';
import customRender from '@utils/test-utils';

import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEdit form master components', () => {
    it('should render components', () => {
        customRender(<AddEditForm />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
    });
});
