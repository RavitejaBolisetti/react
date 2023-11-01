import React from 'react';
import { VehicleAllotmentMaster } from 'components/Sales/VehicleAllotment/VehicleAllotmentMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { all } from 'axios';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/otf/otf', () => ({
    otfDataActions: {},
}));

jest.mock('store/actions/data/vehicleAllotment/VehicleAllotment', () => ({
    vehicleAllotment: {},
}));

jest.mock('store/actions/data/productHierarchy', () => ({
    productHierarchyDataActions: {},
}));

describe('Vehicle Allotment Master Component', () => {
    it('should render Vehicle Allotment Master component UI', () => {
        customRender(<VehicleAllotmentMaster setFilterString={jest.fn()} resetData={jest.fn()} />);
    });

    it('should render Vehicle Allotment Master tab bars component UI', () => {
        customRender(<VehicleAllotmentMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const unAllotted = screen.getByRole('button', { name: 'Un-Allotted' });
        fireEvent.click(unAllotted);

        const allotted = screen.getByRole('button', { name: 'Allotted' });
        fireEvent.click(allotted);
    });

    it('should render Vehicle Allotment Master search component UI', () => {
        const data = [
            { key: 1, value: 'test', id: 1 },
            { key: 2, value: 'test', id: 2 },
        ];
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { isLoaded: false, isSearchDataLoaded: false, isLoading: false, isOTFSearchLoading: false, data: data, isDetailLoaded: false },
                },
                vehicleAllotmentData: {
                    vehicleAllotment: { detailData: data, allotmentSummaryDetails: data, data: data, allotmentSearchedList: data, filter: data, filterString: data },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster setFilterString={jest.fn()} fetchModelList={jest.fn()} resetData={jest.fn()} fetchVehicleAllotmentSearchedList={jest.fn()} />
            </Provider>
        );

        const search = screen.getByPlaceholderText('Search by VIN');
        fireEvent.change(search, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const closeBtn = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeBtn);
    });

    it('should render Vehicle Allotment Master filter  component UI', () => {
        const data = [
            { key: 1, value: 'test', id: 1 },
            { key: 2, value: 'test', id: 2 },
        ];
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    OtfSearchList: { isLoaded: false, isSearchDataLoaded: false, isLoading: false, isOTFSearchLoading: false, data: data, isDetailLoaded: false },
                },
                vehicleAllotmentData: {
                    vehicleAllotment: { detailData: data, allotmentSummaryDetails: data, data: data, allotmentSearchedList: data, filter: data, filterString: data },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster setFilterString={jest.fn()} fetchModelList={jest.fn()} resetData={jest.fn()} fetchVehicleAllotmentSearchedList={jest.fn()} />
            </Provider>
        );

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const vehicleStatus = screen.getByRole('combobox', { name: 'Vehicle Status' });
        fireEvent.change(vehicleStatus, { target: { value: 'test' } });

        const pdiDone = screen.getByRole('combobox', { name: 'PDI Done' });
        fireEvent.change(pdiDone, { target: { value: 'test' } });

        const applyFilter = screen.getByRole('button', { name: 'Apply Filter' });
        fireEvent.click(applyFilter);
    });

    it('should render Vehicle Allotment Master filter reset button component UI', () => {
        customRender(<VehicleAllotmentMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const reset = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(reset);
    });

    it('should render Vehicle Allotment Master filter close button component UI', () => {
        customRender(<VehicleAllotmentMaster setFilterString={jest.fn()} resetData={jest.fn()} />);

        const filter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(filter);

        const close = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(close);
    });

    it('clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                vehicleAllotmentData: {
                    vehicleAllotment: { filter: { advanceFilter: 'Test', vehicleStatus: true, pdDone: 'test' } },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster setFilterString={jest.fn()} fetchModelList={jest.fn()} resetData={jest.fn()} fetchVehicleAllotmentSearchedList={jest.fn()} />
            </Provider>
        );

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                vehicleAllotmentData: {
                    vehicleAllotment: { filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster setFilterString={jest.fn()} fetchModelList={jest.fn()} resetData={jest.fn()} fetchVehicleAllotmentSearchedList={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText('Search by VIN');
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);
    });

    it('Should render list data table components', () => {
        const formData = { allotmentStatus: '', vehicleOTFDetails: {} };
        const tableDataItem = [];

        customRender(<VehicleAllotmentMaster resetData={jest.fn()} setFilterString={jest.fn()} showAddButton={true} isVisible={true} handleButtonClick={jest.fn()} tableData={tableDataItem} formData={formData} />);

        const unAllotted = screen.getByRole('button', { name: 'Un-Allotted' });
        fireEvent.click(unAllotted);
    });

    it('Should click on view button and allot', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { OTF_SER: [{ name: 'Kai', key: 106 }] } },
                vehicleAllotmentData: {
                    vehicleAllotment: {
                        data: {
                            paginationData: [
                                {
                                    ageInDays: '72',
                                    bookingNumber: null,
                                    engineNumber: 'ZEP4H36940',
                                    grnDate: '2023-08-18T00:00:00.000+00:00',
                                    grnNumber: 'GRN24D000465',
                                    invoiceDate: null,
                                    invoiceId: '7501148668',
                                    invoiceNumber: null,
                                    modelCode: 'XUV700',
                                    netDealerPrice: 1933278,
                                    oemInvoiceDate: '2023-08-16',
                                    otfNumber: null,
                                    pdiIndicator: 'No',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1NE2ZEAP6H18854',
                                    vehicleStatus: 'RCV',
                                },
                            ],
                        },
                        detailData: { allotmentStatus: 'A' },
                        filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' },
                    },
                },
            },
        });

        const fetchOTFSearchedList = jest.fn();
        const fetchVehicleAllotmentSearchedList = jest.fn();
        const fetchVehicleAllotmentDetails = jest.fn();
        const fetchModelList = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster resetOTFSearchedList={jest.fn()} fetchModelList={fetchModelList} fetchOTFSearchedList={fetchOTFSearchedList} fetchVehicleAllotmentSearchedList={fetchVehicleAllotmentSearchedList} fetchVehicleAllotmentDetails={fetchVehicleAllotmentDetails} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onErrorAction();

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('XUV700')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const AllotBtn = screen.getAllByRole('button', { name: /Un-Allot/i });
        fireEvent.click(AllotBtn[1]);

        const yesBtn = screen.getByRole('button', { name: /yes/i });
        fireEvent.click(yesBtn);
    });

    it('test for cancel model of un-allot', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { OTF_SER: [{ name: 'Kai', key: 106 }] } },
                vehicleAllotmentData: {
                    vehicleAllotment: {
                        data: {
                            paginationData: [
                                {
                                    ageInDays: '72',
                                    bookingNumber: null,
                                    engineNumber: 'ZEP4H36940',
                                    grnDate: '2023-08-18T00:00:00.000+00:00',
                                    grnNumber: 'GRN24D000465',
                                    invoiceDate: null,
                                    invoiceId: '7501148668',
                                    invoiceNumber: null,
                                    modelCode: 'XUV700',
                                    netDealerPrice: 1933278,
                                    oemInvoiceDate: '2023-08-16',
                                    otfNumber: null,
                                    pdiIndicator: 'No',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1NE2ZEAP6H18854',
                                    vehicleStatus: 'RCV',
                                },
                            ],
                        },
                        detailData: { allotmentStatus: 'A' },
                        filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' },
                    },
                },
            },
        });

        const fetchOTFSearchedList = jest.fn();
        const fetchVehicleAllotmentSearchedList = jest.fn();
        const fetchVehicleAllotmentDetails = jest.fn();
        const fetchModelList = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster resetOTFSearchedList={jest.fn()} fetchModelList={fetchModelList} fetchOTFSearchedList={fetchOTFSearchedList} fetchVehicleAllotmentSearchedList={fetchVehicleAllotmentSearchedList} fetchVehicleAllotmentDetails={fetchVehicleAllotmentDetails} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onErrorAction();

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('XUV700')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const AllotBtn = screen.getAllByRole('button', { name: /Un-Allot/i });
        fireEvent.click(AllotBtn[1]);

        const yesBtn = screen.getAllByRole('img', { name: /close/i });
        fireEvent.click(yesBtn[1]);
    });

    it('test for close actions', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { OTF_SER: [{ name: 'Kai', key: 106 }] } },
                vehicleAllotmentData: {
                    vehicleAllotment: {
                        data: {
                            paginationData: [
                                {
                                    ageInDays: '72',
                                    bookingNumber: null,
                                    engineNumber: 'ZEP4H36940',
                                    grnDate: '2023-08-18T00:00:00.000+00:00',
                                    grnNumber: 'GRN24D000465',
                                    invoiceDate: null,
                                    invoiceId: '7501148668',
                                    invoiceNumber: null,
                                    modelCode: 'XUV700',
                                    netDealerPrice: 1933278,
                                    oemInvoiceDate: '2023-08-16',
                                    otfNumber: null,
                                    pdiIndicator: 'No',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1NE2ZEAP6H18854',
                                    vehicleStatus: 'RCV',
                                },
                            ],
                        },
                        detailData: { allotmentStatus: 'A' },
                        filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' },
                    },
                },
            },
        });

        const fetchOTFSearchedList = jest.fn();
        const fetchVehicleAllotmentSearchedList = jest.fn();
        const fetchVehicleAllotmentDetails = jest.fn();
        const fetchModelList = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster resetOTFSearchedList={jest.fn()} fetchModelList={fetchModelList} fetchOTFSearchedList={fetchOTFSearchedList} fetchVehicleAllotmentSearchedList={fetchVehicleAllotmentSearchedList} fetchVehicleAllotmentDetails={fetchVehicleAllotmentDetails} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onErrorAction();

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('XUV700')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });

        fireEvent.click(viewBtn);

        const yesBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(yesBtn);
    });

    it('test for allot search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                ConfigurableParameterEditing: { filteredListData: { OTF_SER: [{ name: 'Kai', key: 106 }] } },
                vehicleAllotmentData: {
                    vehicleAllotment: {
                        data: {
                            paginationData: [
                                {
                                    ageInDays: '72',
                                    bookingNumber: null,
                                    engineNumber: 'ZEP4H36940',
                                    grnDate: '2023-08-18T00:00:00.000+00:00',
                                    grnNumber: 'GRN24D000465',
                                    invoiceDate: null,
                                    invoiceId: '7501148668',
                                    invoiceNumber: null,
                                    modelCode: 'XUV700',
                                    netDealerPrice: 1933278,
                                    oemInvoiceDate: '2023-08-16',
                                    otfNumber: null,
                                    pdiIndicator: 'No',
                                    status: null,
                                    vehicleIdentificationNumber: 'MA1NE2ZEAP6H18854',
                                    vehicleStatus: 'RCV',
                                },
                            ],
                        },
                        detailData: { allotmentStatus: 'C' },
                        filter: { advanceFilter: 'Test', pdDone: 'Yes', vehicleStatus: 'In-Transit', model: 'ALTURAS G4 2WD BSVI DSAT SILVER', key: 'searchParam' },
                    },
                },
            },
        });

        const fetchOTFSearchedList = jest.fn();
        const fetchVehicleAllotmentSearchedList = jest.fn();
        const fetchVehicleAllotmentDetails = jest.fn();
        const fetchModelList = jest.fn();
        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentMaster resetOTFSearchedList={jest.fn()} fetchModelList={fetchModelList} fetchOTFSearchedList={fetchOTFSearchedList} fetchVehicleAllotmentSearchedList={fetchVehicleAllotmentSearchedList} fetchVehicleAllotmentDetails={fetchVehicleAllotmentDetails} setFilterString={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onErrorAction();

        fetchVehicleAllotmentSearchedList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('XUV700')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });
        fireEvent.click(viewBtn);

        const textBox = screen.getAllByPlaceholderText(/Search/i);
        fireEvent.change(textBox[1], { target: { value: 'test' } });

        const searchBox = screen.getAllByRole('img', { name: /search/i });
        fireEvent.click(searchBox[1]);

        const yesBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(yesBtn);
    });
});
