import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OtfMaster } from 'components/Sales/OTF/OtfMaster';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/otf/otf', () => ({
    otfDataActions: {
        fetchDetail: jest.fn().mockImplementation(() => {
            return {type: 'YOUR_ACTION_TYPE'};
        }),
        changeHistory: jest.fn().mockImplementation(() => {
            return {type: 'YOUR_ACTION_TYPE'};
        }),
    }
}));

jest.mock('store/actions/data/otf/vehicleDetails', () => ({
    otfvehicleDetailsDataActions: {}
}));

jest.mock('store/actions/data/vehicleAllotment/VehicleAllotment', () => ({
    vehicleAllotment: {}
}));

const mockStoreData={
    auth: { userId: 106 },
    data: {
        OTF: {
            OtfSearchList: {
                data: {
                    totalRecords: 1,
                    otfDetails: [{ otfNumber: '106', model: 'Model106', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                },
                filter: { current: 1 },
            },
        },
    },
};

describe('OtfMaster component render', () => {

    it('should render OtfMaster component', () => {
        customRender(<OtfMaster setFilterString={jest.fn()} resetData={jest.fn()} />);
    });

    it('Advance Filters and close button should work', () => {
        customRender(<OtfMaster setFilterString={jest.fn()} resetData={jest.fn()} />);
        const advancedFilters=screen.getByText('Advance Filters');
        fireEvent.click(advancedFilters);

        const closeBtn=screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeBtn);
    });

    it('view and close button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' })
        fireEvent.click(closeBtn[1]);

    });

    it('edit button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const editBtn=screen.getByRole('button', { name: 'Edit' })
        fireEvent.click(editBtn);

    });

    it('next button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const nextBtn=screen.getByRole('button', { name: 'Next' })
        fireEvent.click(nextBtn);
    });

    it('allot button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} fetchVehicleAllotmentSearchedList={jest.fn()} updateVehicleAllotmentStatus={jest.fn()} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const allotBtn=screen.getByRole('button', { name: 'Allot' })
        fireEvent.click(allotBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });

    it('un-allot button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfId: 106, otfNumber: '106', model: 'Model106', orderStatus: 'A', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { current: 1 },
                    },
                },
            },
        });

        const fetchOTFSearchedList=jest.fn();
        const fetchVehicleDetail=jest.fn();
        const onSubmitAction=jest.fn();
        const updateVehicleAllotmentStatus=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster setIsLoading={jest.fn()} onSubmitAction={onSubmitAction} updateVehicleAllotmentStatus={updateVehicleAllotmentStatus} fetchVehicleDetail={fetchVehicleDetail} fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const unAllotBtn=screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllotBtn);

        await waitFor(() => { expect(fetchVehicleDetail).toHaveBeenCalled() });

        fetchVehicleDetail.mock.calls[0][0].onErrorAction();
        fetchVehicleDetail.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Yes')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('Yes'));

        await waitFor(() => { expect(updateVehicleAllotmentStatus).toHaveBeenCalled() });

        updateVehicleAllotmentStatus.mock.calls[0][0].onSuccess();

    });

    it('change history button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const changeHistory=screen.getByRole('button', { name: 'Change History' })
        fireEvent.click(changeHistory);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[0]);

    });

    it('transfer booking button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const transferBooking=screen.getByRole('button', { name: 'Transfer Booking' })
        fireEvent.click(transferBooking);

    });

    it('cancel booking button should work', async () => {
        const mockStore = createMockStore(mockStoreData);

        const fetchOTFSearchedList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfMaster fetchOTFSearchedList={fetchOTFSearchedList} setFilterString={jest.fn()} resetData={jest.fn()} fetchOTFDetail={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(fetchOTFSearchedList).toHaveBeenCalled() });

        fetchOTFSearchedList.mock.calls[0][0].onSuccessAction();
        fetchOTFSearchedList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelBooking=screen.getByRole('button', { name: 'Cancel Booking' })
        fireEvent.click(cancelBooking);

    });

    it('clear button should work 1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: '106', model: 'Model106', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true },
                    },
                },
            },
        });
        
        customRender(
            <Provider store={mockStore}>
                <OtfMaster setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const clearButton = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearButton);

    });

    it('remove button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        OTF_SER: [{ key: 'customerName' }],
                    },
                },
                OTF: {
                    OtfSearchList: {
                        data: {
                            totalRecords: 1,
                            otfDetails: [{ otfNumber: 'OTF1690806027258', model: 'THRNMM8395642778', orderStatus: 'O', customerName: 'Kai', mobileNumber: '8000666345', otfDate: 'null', cpd: null, customerType: 'IND', userProfilePicDocId: '' }],
                        },
                        filter: { searchType: 'customerName', searchParam: 'Kai', advanceFilter: true, key: 'hello' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfMaster setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const removeButton = screen.getByTestId('removeBtn');
        fireEvent.click(removeButton);
    });

});

