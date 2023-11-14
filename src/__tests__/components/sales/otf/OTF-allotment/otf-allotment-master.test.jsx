/* eslint-disable jest/no-mocks-import */
import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { OTFAllotmentMaster } from 'components/Sales/OTF/OTFAllotment/OTFAllotmentMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicleAllotment/VehicleAllotment', () => ({
    vehicleAllotment: {},
}));

describe('OTFAllotmentMaster Component', () => {
    it('should render OTFAllotmentMaster component UI', () => {
        customRender(<OTFAllotmentMaster setFilterString={jest.fn()} />);
    });

    it('allot should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { ALT_ACTN: [{ id: 106 }], VEHCL_STATS: [{ id: 106 }], PD_DONE: [{ id: 106 }] } },
                ProductHierarchy: { filteredListData: [{ prodctCode: 106 }] },
                vehicleAllotmentData: {
                    vehicleAllotment: { data: { paginationData: [{ vehicleIdentificationNumber: 106, modelCode: 106, ageInDays: 106, pdiIndicator: 'PDI Indicator Done', invoiceId: 106, vehicleStatus: 'Actove' }] }, filter: { current: 10 } },
                },
            },
        });

        const fetchVehicleAllotmentSearchedList = jest.fn();
        const saveData = jest.fn();
        const selectedOrder = { otfId: 106, otfNumber: 106 };
        const setShowOTFDataLoading = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <OTFAllotmentMaster isVisible={true} setIsAllotVisible={true} setShowOTFDataLoading={setShowOTFDataLoading} fetchVehicleAllotmentSearchedList={fetchVehicleAllotmentSearchedList} saveData={saveData} setFilterString={jest.fn()} selectedOrder={selectedOrder} setIsAllotVisible={jest.fn()} setIsFormVisible={jest.fn()} setRefreshData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onSuccessAction();
        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('PDI Indicator Done')).toBeInTheDocument();
        });

        const selectVin = screen.getByRole('radio', { name: '' });
        fireEvent.click(selectVin);

        const allotBtn = screen.getByRole('button', { name: 'Allot' });
        fireEvent.click(allotBtn);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});
