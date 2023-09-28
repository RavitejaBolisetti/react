import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/VehicleDeliveryNote/VehicleDetails/AddEditForm';
import customRender from '@utils/test-utils';

import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AddEdit form master components', () => {
    it('should render components', () => {
        const activeKey=[3];
        const formData={
            batteryDetail: [{ id: 106 }]
        }
        customRender(<AddEditForm activeKey={activeKey} setActiveKey={jest.fn()} formData={formData} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
        fireEvent.click(plusImg[1]);
    });

    it('should render components with activeKey', () => {
        const activeKey=[1, 2, 3];
        customRender(<AddEditForm activeKey={activeKey} setActiveKey={jest.fn()} />);

        const minusImg = screen.getAllByRole('img', { name: /minus/i });
        fireEvent.click(minusImg[0]);
        fireEvent.click(minusImg[1]);
    });
});
