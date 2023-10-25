/* eslint-disable jest/no-mocks-import */
import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { HoPriceMappingMaster } from 'components/Sales/HoPriceMappingDealer/HoPriceMappingMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/hoPriceMapping/hoPriceMapping', () => ({
    hoPriceMappingDataActions: {},
}));

jest.mock('store/actions/data/hoPriceMapping/hoPriceMappingDetails', () => ({
    hoPriceMappingDetailDataActions: {},
}));

jest.mock('store/actions/data/productHierarchy', () => ({
    productHierarchyDataActions: {},
}));

jest.mock('@components/Sales/HoPriceMappingDealer/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onFinish}>Edit</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

describe('HoPriceMappingMaster Component', () => {
    it('should render HoPriceMappingMaster component UI', () => {
        customRender(<HoPriceMappingMaster />);
    });

    it('should render component with data', () => {
        const data = {
            paginationData: [{ receiptNumber: '106', dealerName: 'Kai', receiptDate: '2009-01-18T00:00:00.000+00:00', customerName: null, partySegment: 'MASTER', receiptType: 'Advance', receiptStatus: 'Cancelled', id: '106' }],
            totalRecords: 1,
        };
        const typeData = {
            OTF_SER: ['Customer Name'],
        };
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: { filteredListData: typeData },
                Receipt: {
                    ReceiptSearchList: { isLoaded: true, data: data, filter: { fromDate: '01/01/2001', toDate: '01/01/2023' } },
                },
            },
        });
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster fetchList={fetchList} fetchProductList={jest.fn()} />
            </Provider>
        );
    });

    it('advanced filters and close button should work', async () => {
        customRender(<HoPriceMappingMaster />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('advanced filters and reset button should work', async () => {
        customRender(<HoPriceMappingMaster setFilterString={jest.fn()} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('advanced filters and apply button should work', async () => {
        const value = '';
        const handleFilterChange = jest.fn('stateCode', value);
        customRender(<HoPriceMappingMaster handleFilterChange={handleFilterChange} />);
        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);

        const rsoPlantBtn = screen.getByRole('button', { name: 'RSO Plant (Non-eDCM)' });
        fireEvent.click(rsoPlantBtn);

        const exlantBtn = screen.getByRole('button', { name: 'Explant (eDCM)' });
        fireEvent.click(exlantBtn);

        const resetBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(resetBtn);
    });

    it('remove filter button should work', async () => {
        const res = [
            {
                id: '4a50fd6d-a788-4313-96dc-8b4fe9b8d7d1',
                state: 'Uttar Pradesh',
                city: 'KURNOOL',
                enabledDate: '2017-07-01T00:00:00.000+00:00',
                enabledBy: 'Sakshi',
                dealerBranch: 'AM02',
                dealerParent: 'SUPREME MOBILES PVT LTD.',
                dealerSelectOnRoadPrice: true,
                modelDealerMapResponse: null,
            },
        ];

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceMappingSearchList: { isLoaded: true, data: res, filter: { advanceFilter: true, dealerParent: 'test', stateCode: 'test123', cityCode: 'test23', modelCode: 'Toyo23' }, key: 'searchParam' },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchProductList = jest.fn();
        const removeFilter = jest.fn('stateCode');

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster fetchList={fetchList} removeFilter={removeFilter} generateList={jest.fn()} setFilterString={jest.fn()} fetchProductList={fetchProductList} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
        fireEvent.change(advanceFilter, { target: { value: 'stateCode' } });

        const removeFilterBtn = screen.getAllByTestId('removeBtn');
        fireEvent.click(removeFilterBtn[0]);

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
        fetchProductList.mock.calls[0][0].onCloseAction();
    });

    it('Should render search dealer parent', () => {
        customRender(<HoPriceMappingMaster setFilterString={jest.fn()} resetFields={jest.fn()} />);

        const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('Should render search close circle dealer parent', () => {
        customRender(<HoPriceMappingMaster setFilterString={jest.fn()} resetFields={jest.fn()} />);

        const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const closeCircleBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircleBtn);
    });

    it('Should render addeditform component', async () => {
        const res = [
            {
                id: '4a50fd6d-a788-4313-96dc-8b4fe9b8d7d1',
                state: 'Uttar Pradesh',
                city: 'KURNOOL',
                enabledDate: '2017-07-01T00:00:00.000+00:00',
                enabledBy: 'Sakshi',
                dealerBranch: 'AM02',
                dealerParent: 'SUPREME MOBILES PVT LTD.',
                dealerSelectOnRoadPrice: true,
                modelDealerMapResponse: null,
            },
        ];

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceMappingSearchList: { isLoaded: true, data: res, filter: { advanceFilter: true, dealerParent: 'test', stateCode: 'test123', cityCode: 'test23', modelCode: 'Toyo23' }, key: 'searchParam' },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const buttonData = { editBtn: true };

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster isVisible={true} setButtonData={jest.fn()} setIsFormVisible={jest.fn()} showGlobalNotification={jest.fn()} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} buttonData={buttonData} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

    it('Should render addeditform fail component', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceMappingSearchList: { isLoaded: true, data: [] },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const buttonData = { editBtn: true };

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster isVisible={true} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} buttonData={buttonData} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });

    it('Should render addeditform close component', async () => {
        const res = [
            {
                id: '4a50fd6d-a788-4313-96dc-8b4fe9b8d7d1',
                state: 'Uttar Pradesh',
                city: 'KURNOOL',
                enabledDate: '2017-07-01T00:00:00.000+00:00',
                enabledBy: 'Sakshi',
                dealerBranch: 'AM02',
                dealerParent: 'SUPREME MOBILES PVT LTD.',
                dealerSelectOnRoadPrice: true,
                modelDealerMapResponse: [{ key: 1, status: true, id: 1 }],
            },
        ];

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceDetailList: { isLoaded: true, data: res },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const formActionType = { viewMode: true };

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster isVisible={true} formActionType={formActionType} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );
    });

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceMappingSearchList: { isLoaded: true, data: { paginationData: [{ city: 'JAGRA', dealerBranch: 'CHOWPATTY', dealerParent: 'GARG MOTORS', dealerSelectOnRoadPrice: true, enabledBy: 'Vimal', enabledDate: '2017-07-03T00:00:00.000+00:00', id: 'a75c676e-dd7e-4f05-ad12-aa4f9ded8fa5', modelDealerMapResponse: null, state: 'Jammu and Kashmir' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchDetail = jest.fn();
        const buttonData = { editBtn: true };

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster isVisible={true} fetchDetail={fetchDetail} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} buttonData={buttonData} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('JAGRA')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /fa-edit/i });

        fireEvent.click(viewBtn);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });

    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HoPriceMapping: {
                    HoPriceMappingSearchList: { isLoaded: true, data: { paginationData: [{ city: 'JAGRA', dealerBranch: 'CHOWPATTY', dealerParent: 'GARG MOTORS', dealerSelectOnRoadPrice: true, enabledBy: 'Vimal', enabledDate: '2017-07-03T00:00:00.000+00:00', id: 'a75c676e-dd7e-4f05-ad12-aa4f9ded8fa5', modelDealerMapResponse: null, state: 'Jammu and Kashmir' }] } },
                },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();
        const fetchDetail = jest.fn();
        const buttonData = { editBtn: true };

        customRender(
            <Provider store={mockStore}>
                <HoPriceMappingMaster isVisible={true} fetchDetail={fetchDetail} fetchProductList={jest.fn()} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} buttonData={buttonData} saveData={saveData} setFilterString={jest.fn()} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();

        fetchList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('JAGRA')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const editBtn = screen.getAllByRole('button', { name: /edit/i });
        fireEvent.click(editBtn[0]);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });
});
