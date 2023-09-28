import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { VehicleTrackingMaster } from 'components/Sales';
import customRender from '@utils/test-utils';

jest.mock('store/actions/data/sales/vehicleTracking', () => ({
    vehicleTrackingDataActions: {}
}));

describe('Vehicle Tracking Component', () => {

    it('should render vehicle tracking component UI', () => {
        customRender(<VehicleTrackingMaster />)
    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        const fetchList = jest.fn();
        const res={ data: { vehicleTrackingDeliveryStatus: [{ vehicleTrackingLocationResponse: [{ latitude: 106, longitude: 106 }]} ] } }

        customRender(
            <Provider store={mockStore}>
                <VehicleTrackingMaster fetchList={fetchList} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: 'Search' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        fireEvent.change(searchBox, { target: { value: 'Kai' } });
        fireEvent.click(searchBtn);

        await waitFor(() => expect(fetchList).toHaveBeenCalled());

        fetchList.mock.calls[0][0].onSuccessAction(res);
        fetchList.mock.calls[0][0].onErrorAction();

    });

});