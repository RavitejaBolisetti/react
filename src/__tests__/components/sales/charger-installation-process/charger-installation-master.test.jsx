import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { ChargerInstallationMaster } from 'components/Sales/ChargerInstallationProcess/ChargerInstallationMaster';

jest.mock('store/actions/data/chargerInstallation/chargerInstallation', () => ({
    chargerInstallationDataActions: {}
}));

jest.mock('store/actions/data/crmCustomerVehicle', () => ({
    crmCustomerVehicleDataActions: {}
}));

jest.mock('components/Sales/ChargerInstallationProcess/InstallationAddressDetails', () => {
    const InstallationAddressDetailsMaster = ({onChargerInstallationFinish}) => <div><button onClick={onChargerInstallationFinish}>Submit</button></div>;
    return {
        __esModule: true,
        InstallationAddressDetailsMaster,
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Charger Installation Master Component', () => {

    it('should render charger installation master component', () => {
        customRender(<ChargerInstallationMaster />);
    });

    it('search vehicle should work on new add', async () => {
        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                ChargerInstallation: {
                    ChargerInstallationList: { isLoaded: true, data: { paginationData: [{bookingNumber: 106, requestNumber: 107, requestStatus: 'In-Progress'}] } },
                },
            },
        });

        const fetchList=jest.fn();
        const fetchCustomerVehicleList=jest.fn();
        const res={data: { vehicleDetails: { fuel: 'ELECTR' }}};

        customRender(
            <Provider store={mockStore}>
                <ChargerInstallationMaster fetchList={fetchList} fetchCustomerVehicleList={fetchCustomerVehicleList} />
            </Provider>
        );    

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const bookingNumber=screen.getByRole('textbox', { name: 'Booking Number' });
        fireEvent.change(bookingNumber, { target: { value: '106' } });

        const searchBtn=screen.getAllByRole('button', { name: 'search' });
        fireEvent.click(searchBtn[1]);

        await waitFor(() => { expect(fetchCustomerVehicleList).toHaveBeenCalled() });

        fetchCustomerVehicleList.mock.calls[0][0].onSuccessAction(res);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });

    it('view installation should work', async () => {
        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                ChargerInstallation: {
                    ChargerInstallationList: { isLoaded: true, data: { paginationData: [{bookingNumber: 106, requestNumber: 107, requestStatus: 'Success'}] } },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ChargerInstallationMaster fetchList={fetchList} />
            </Provider>
        );    

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('106')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const nextBtn=screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        
    });

    it('Advance Filters should work', async () => {
        customRender(<ChargerInstallationMaster setFilterString={jest.fn()} />);

        const advancedFilters=screen.getByText('Advance Filters');
        fireEvent.click(advancedFilters);

        const resetBtn=screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);

        const fromDate=screen.getByRole('textbox', { name: 'From Date' });
        fireEvent.click(fromDate);
        await waitFor(() => { expect(screen.getByText('Today')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('Today'));

        const toDate=screen.getByRole('textbox', { name: 'To Date' });
        fireEvent.click(toDate);
        await waitFor(() => { expect(screen.getAllByText('Today')[1]).toBeInTheDocument() });
        fireEvent.click(screen.getAllByText('Today')[1]);

        const applyBtn=screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

    it('Advance Filters with close button should work', async () => {
        customRender(<ChargerInstallationMaster setFilterString={jest.fn()} />);

        const advancedFilters=screen.getByText('Advance Filters');
        fireEvent.click(advancedFilters);

        const closeBtn=screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeBtn);
    });

    it('add new charger installation should work', async () => {
        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                ChargerInstallation: {
                    ChargerInstallationList: { isLoaded: true, data: { paginationData: [{bookingNumber: 106, requestNumber: 107, requestStatus: 'Failed'}] } },
                },
            },
        });

        const fetchList=jest.fn();
        const fetchCustomerVehicleList=jest.fn();
        const saveData=jest.fn();
        const res={data: { vehicleDetails: { fuel: 'ELECTR' }}};

        customRender(
            <Provider store={mockStore}>
                <ChargerInstallationMaster fetchList={fetchList} fetchCustomerVehicleList={fetchCustomerVehicleList} saveData={saveData} />
            </Provider>
        );    

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('106')).toBeInTheDocument() });

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const bookingNumber=screen.getByRole('textbox', { name: 'Booking Number' });
        fireEvent.change(bookingNumber, { target: { value: '106' } });

        const searchBtn=screen.getAllByRole('button', { name: 'search' });
        fireEvent.click(searchBtn[1]);

        await waitFor(() => { expect(fetchCustomerVehicleList).toHaveBeenCalled() });

        fetchCustomerVehicleList.mock.calls[0][0].onSuccessAction(res);

        await waitFor(() => { expect(screen.getByText('Add Request')).toBeInTheDocument() });

        const addRequest=screen.getAllByRole('button', { name: 'plus Add' });
        fireEvent.click(addRequest[1]);

        const preferredDate=screen.getByRole('textbox', { name: 'Preferred Date & Time 1' });
        fireEvent.click(preferredDate);

        await waitFor(() => { expect(screen.getByText('Today')).toBeInTheDocument() });

        fireEvent.click(screen.getByText('Today'));

        const addSubmit=screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addSubmit);

        fireEvent.click(screen.getByText('Installation Address Details'));
    
        const submitBtn=screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

    });
});