import React from 'react';
import { ShieldSchemeRegistrationMaster } from 'components/Services/ShieldSchemeRegistartion/ShieldSchemeRegistrationMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/services/shieldSchemeSearch', () => ({
    shieldSchemeSearchDataAction: {},
}));

jest.mock('store/actions/data/amcRegistration/employeeSearch', () => ({
    employeeSearchDataAction: {},
}));

jest.mock('store/actions/data/dealer/dealerParentsLov', () => ({
    dealerParentLovDataActions: {},
}));

jest.mock('store/actions/data/applicationMaster', () => ({
    applicationMasterDataActions: {},
}));

describe('Master Component', () => {
    it('should render sheild scheme master component UI', () => {
        customRender(<ShieldSchemeRegistrationMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const searchBox = screen.getByPlaceholderText('Search');
        fireEvent.change(searchBox, { target: { value: 'Test' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });
    it('reset button should work', () => {
        customRender(<ShieldSchemeRegistrationMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });
    it('test for closing the advance filter', () => {
        customRender(<ShieldSchemeRegistrationMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('close circle button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '07/06/2022', key: 'searchParam' } },
                    SchemeDescription: { data: [{ id: '1', value: 'kai' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDealerParentsLovList={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText('Search');
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });
    it('clear button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '07/06/2022', key: 'searchParam' } },
                    SchemeDescription: { data: [{ id: '1', value: 'kai' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDealerParentsLovList={jest.fn()} fetchList={jest.fn()} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText('Search');
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: /Clear/i });
        fireEvent.click(clearBtn);
    });
    it('test for apply button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { filter: { advanceFilter: 'Test', fromDate: '06/06/2022', toDate: '07/06/2022', key: 'searchParam' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDealerParentsLovList={jest.fn()} fetchList={fetchList} setFilterString={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByRole('button', { name: /Advance Filters/i });
        fireEvent.click(advanceFilter);

        const fromDate = screen.getByRole('textbox', { name: 'Scheme Registration From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Scheme Registration To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);

        const resetBtn = screen.getByRole('button', { name: /apply/i });
        fireEvent.click(resetBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { AMC_REG_APRVL_STAT: [{ name: 'Kai' }] } },
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { isLoaded: true, data: { paginationData: [{ dealerLocation: 'kai', id: '106', shieldRegistrationNumber: 'SHL24D010065', status: 'Pending', vin: 'MA1NE2ZTFP6D10779' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchEmployeeList = jest.fn();
        const fetchSchemeDescription = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDetail={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeDescription={fetchSchemeDescription} fetchDealerParentsLovList={jest.fn()} fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} fetchManagerList={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('kai')).toBeInTheDocument() });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel scheme/i });
        fireEvent.click(cancelBtn);

        const cancelrecipt = screen.getByRole('button', { name: /no/i });
        fireEvent.click(cancelrecipt);
    });
    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { AMC_REG_APRVL_STAT: [{ name: 'Kai' }] } },
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { isLoaded: true, data: { paginationData: [{ dealerLocation: 'kai', id: '106', shieldRegistrationNumber: 'SHL24D010065', status: 'Pending', vin: 'MA1NE2ZTFP6D10779' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchEmployeeList = jest.fn();
        const fetchSchemeDescription = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDetail={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeDescription={fetchSchemeDescription} fetchDealerParentsLovList={jest.fn()} fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} fetchManagerList={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel scheme/i });
        fireEvent.click(cancelBtn);

        const cancelrecipt = screen.getAllByRole('img', { name: /close/i });
        fireEvent.click(cancelrecipt[1]);
    });
    it('test3', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { AMC_REG_APRVL_STAT: [{ name: 'Kai' }] } },
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { isLoaded: true, data: { paginationData: [{ dealerLocation: 'kai', id: '106', shieldRegistrationNumber: 'SHL24D010065', status: 'Pending', vin: 'MA1NE2ZTFP6D10779' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchEmployeeList = jest.fn();
        const fetchSchemeDescription = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster fetchDetail={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeDescription={fetchSchemeDescription} fetchDealerParentsLovList={jest.fn()} fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} fetchManagerList={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelBtn = screen.getByRole('button', { name: /cancel scheme/i });
        fireEvent.click(cancelBtn);

        const cancelrecipt = screen.getByRole('button', { name: /yes, cancel/i });
        fireEvent.click(cancelrecipt);

        const reason = screen.getByRole('combobox', { name: 'Reason for Rejection' });
        fireEvent.change(reason, { target: { value: 'Test' } });

        const yesCancel = screen.getByRole('button', { name: /yes, cancel/i });
        fireEvent.click(yesCancel);
    });

    it('test4', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { AMC_REG_APRVL_STAT: [{ name: 'Kai' }] } },
                ShieldSchemeRegistration: {
                    ShieldSchemeSearch: { isLoaded: true, data: { paginationData: [{ dealerLocation: 'kai', id: '106', shieldRegistrationNumber: 'SHL24D010065', status: 'Pending', vin: 'MA1NE2ZTFP6D10779' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchEmployeeList = jest.fn();
        const fetchSchemeDescription = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ShieldSchemeRegistrationMaster resetDetail={jest.fn()} fetchDetail={jest.fn()} fetchEmployeeList={fetchEmployeeList} fetchSchemeDescription={fetchSchemeDescription} fetchDealerParentsLovList={jest.fn()} fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} resetData={jest.fn()} fetchManagerList={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[1]);
    });
});
