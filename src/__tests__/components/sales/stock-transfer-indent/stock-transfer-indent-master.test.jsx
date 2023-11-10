/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import { StockTransferIndentMaster } from 'components/Sales/StockTransferIndent/StockTransferIndentMaster';
import customRender from '@utils/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};


jest.mock('components/Sales/StockTransferIndent/IssueIndent/IssueIndentMaster', () => {
    const IssueIndentMaster = ({ handleAdd, handlePrintDownload }) => {
        return (
            <>
                <div>
                    <button onClick={handleAdd}>ADD</button>
                </div>
                ;
                <div>
                    <button onClick={handlePrintDownload}>Print/Download</button>
                </div>
            </>
        );
    };
    return {
        __esModule: true,
        IssueIndentMaster,
    };
});

jest.mock('components/Sales/StockTransferIndent/ViewDetail', () => {
    const ViewDetail = ({ onCloseAction, updateVehicleDetails }) => {
        return (
            <>
                <div>
                    <button onClick={onCloseAction}>Cancel</button>
                </div>
                ;
                <div>
                    <button onClick={updateVehicleDetails}>Save</button>
                </div>
                ;
            </>
        );
    };
    return {
        __esModule: true,
        ViewDetail,
    };
});

jest.mock('components/Sales/StockTransferIndent/AddEditForm', () => {
    const AddEditForm = ({ onCloseAction, onFinish }) => {
        return (
            <>
                <div>
                    <button onClick={onCloseAction}>Cancel</button>
                </div>
                ;
                <div>
                    <button onClick={onFinish}>Save</button>
                </div>
                ;
            </>
        );
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/sales/stockTransfer/StockTransferIndent', () => ({
    stockTransferIndent: {},
}));

jest.mock('store/actions/data/sales/stockTransfer', () => ({
    StockIndentIssueDataAction: {},
}));

jest.mock('store/actions/data/userManagement/dealerBranchLocation', () => ({
    DealerBranchLocationDataActions: {},
}));

jest.mock('store/actions/data/otf/vehicleDetailsLov', () => ({
    otfvehicleDetailsLovDataActions: {},
}));

const resetData = jest.fn();
const fetchIndentList = jest.fn();
const saveData = jest.fn();

describe('StockTransferIndentMaster component', () => {
    it("productHierarchyData", ()=>{
        const tableDataItem = [{modelCode:'ALTSMM81813337450', modelDescription:"ALTURAS G4 2WD BSVI REGAL BLUE"}];

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    VehicleDetailsLov: { filteredListData: [{oemModelCode: "1Y4506PDTGNV7AASE",prodctCode: "ALTSMM81813337450",prodctShrtName: "ALTURAS G4 2WD BSVI DSAT SILVER",productDivision: "AL", modelGroupCode: "ALTS", familyCode: "787", }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster tableDataItem={tableDataItem} resetData={resetData} fetchIndentList={fetchIndentList} />
            </Provider>
        );
    });
    
    it("dealerLocations", ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            common: {
                Header: {
                    data: { dealerLocations:[{isDefault:true, locationCode:'NB04'}] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster fetchIndentList={fetchIndentList} resetData={resetData} />
            </Provider>
        );
        
    });

    it('Clear Button', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                stockTransferIndentData: { stockTransferIndent: { isLoading: false, filter: { advanceFilter: true, current: 1, pageSize: undefined, searchParam: 'STR1694606620526' } }, },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster resetData={jest.fn()} fetchIndentList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const searchIndentTextbox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchIndentTextbox, { target: { value: 'STR1694606620526' } });
        expect(searchIndentTextbox.value).toBe('STR1694606620526');

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('Remove Filter', () => {
        const extraParams = [{canRemove: true, filter: true, key: 'indentNo', name: 'STR1694606620526', title: 'Value', value: 'STR1694606620526'}];

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { isLoading: false, filter: { advanceFilter: true, current: 1, pageSize: undefined, searchParam: 'STR1694606620526' } },
                    IndentIssue: { isLoaded: false, isLoading: false, data: [] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster extraParams={extraParams} advanceFilter={true} resetData={jest.fn()} fetchIndentList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const searchIndentTextbox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchIndentTextbox, { target: { value: 'STR1694606620526' } });
        expect(searchIndentTextbox.value).toBe('STR1694606620526');

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);
    });

    it('IssueIndentFrom', async () => {
        const cancellationData = {
            balancedQuantity
            : 
            3,
            cancelledQuantity
            : 
            0,
            id
            : 
            "eb3dbb89-4682-4d8f-942c-4fe1a9c726f4",
            indentDate
            : 
            "2010-10-11T00:00:00.000+00:00",
            indentDetailId
            : 
            "847e5e0d-72cb-4360-b7c6-6fe2dbd8d1a4",
            indentNumber
            : 
            "STI11C000001",
            indentStatus
            : 
            "I",
            indentToLocation
            : 
            "CHOWPATTY",
            indentToParent
            : 
            "aman",
            issuedAndNotReceivedQuantity
            : 
            0,
            modelCode
            : 
            "MXMOMM171330841",
            modelDescription
            : 
            "MAXXIMO STD LOAD CARR 0.9L2CY CRDENA BS4",
            receivedQuantity
            : 
            0,
            remarks
            : 
            null,
            requestedBy
            : 
            "ANUF MULLA",
            requestedQuantity
            : 
            3,
            vehicleDetails:[{
                balancedQuantity
                : 
                3,
                cancelledQuantity
                : 
                0,
                id
                : 
                "847e5e0d-72cb-4360-b7c6-6fe2dbd8d1a4",
                issuedAndNotReceivedQuantity
                : 
                0,
                modelCode
                : 
                "MXMOMM171330841",
                modelDescription
                : 
                "MAXXIMO STD LOAD CARR 0.9L2CY CRDENA BS4",
                receivedQuantity
                : 
                0,
                requestedQuantity
                : 
                3
            }]
        };

        const modalProps = {
            reset: true,
            submit: true,
            resetName: 'Cancel',
            submitName: 'Submit',
        };

        const defaultVisibility = {
            canCancel: true,
            canReturn: false,
            canReceive: false,
            canPrint: true,
            canAdd: true,
        };

        const mockStore = createMockStore({
            auth: { userId: 106 },
            common: {
                Header: {
                    data: { parentGroupCode: 106 },
                },
            },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { data: {id
                        : 
                        "eb3dbb89-4682-4d8f-942c-4fe1a9c726f4",
                        indentDate
                        : 
                        "2010-10-11T00:00:00.000+00:00",
                        indentNumber
                        : 
                        "STI11C000001",
                        indentStatus
                        : 
                        "I",
                        indentToLocation
                        : 
                        "CHOWPATTY",
                        indentToParent
                        : 
                        "aman",
                        remarks
                        : 
                        null,
                        requestedBy
                        : 
                        "ANUF MULLA",
                        vehicleDetails:[{
                            balancedQuantity
: 
3,
cancelledQuantity
: 
0,
id
: 
"847e5e0d-72cb-4360-b7c6-6fe2dbd8d1a4",
issuedAndNotReceivedQuantity
: 
0,
modelCode
: 
"MXMOMM171330841",
modelDescription
: 
"MAXXIMO STD LOAD CARR 0.9L2CY CRDENA BS4",
receivedQuantity
: 
0,
requestedQuantity
: 
3
                        }]} },
                        IndentIssue: { data: [] },
                },
            },
        });

        const fetchIndentList = jest.fn();
        const fetchIndentDetails = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} fetchIndentList={fetchIndentList} fetchIndentDetails={fetchIndentDetails} saveData={saveData} modalProps={modalProps} cancellationData={cancellationData} defaultVisibility={defaultVisibility} toggleButton={'INDNT_RECV'}/>
            </Provider>
        );

        const printBtn = screen.getByRole('button', { name: 'Print/Download' });
        fireEvent.click(printBtn);
        
    });

    it('view, cancel, and save button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            common: {
                Header: {
                    data: { parentGroupCode: 106 },
                },
            },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { data: { paginationData: [{ indentNumber: 106, indentDate: '01/01/2000', fromLocation: 'Agra', toLocation: 'Noida', requestedBy: 'Kai', indentRaisedStatus: 'Active', vehicleDetails: [{ modelDescription: 'Hello', modelCode: 'MAHINDRA XUV300 W6 PG BS6 MT XH' }] }] } },
                },
            },
        });

        const res = { data: [{ indentNumber: 106, indentDate: '01/01/2000', fromLocation: 'Agra', toLocation: 'Noida', requestedBy: 'Kai', indentRaisedStatus: 'Active', vehicleDetails: [{ modelDescription: 'Hello', modelCode: 'MAHINDRA XUV300 W6 PG BS6 MT XH' }] }] };

        const fetchIndentList = jest.fn();
        const fetchIndentDetails = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} fetchIndentList={fetchIndentList} fetchIndentDetails={fetchIndentDetails} saveData={saveData} />
            </Provider>
        );

        fetchIndentList.mock.calls[0][0].onSuccessAction();
        fetchIndentList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);

        fetchIndentDetails.mock.calls[0][0].onSuccessAction(res);

        const closeBtn = screen.getAllByRole('button', { name: 'Cancel' });
        fireEvent.click(closeBtn[1]);

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[1]);

        fetchIndentDetails.mock.lastCall[0].onSuccessAction()

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
        
    });

    it('add indent should work', async () => {
        

        customRender(<StockTransferIndentMaster fetchIndentDetails={jest.fn()} saveData={saveData} resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} fetchRequestedByList={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'Add Indent' });
        fireEvent.click(addBtn);

        const closeBtn = screen.getAllByRole('button', { name: 'Cancel' });
        fireEvent.click(closeBtn[0]);

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);
    });

    it('Advance Filters should work', async () => {
        customRender(<StockTransferIndentMaster resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: 'Advance Filters' });
        fireEvent.click(advanceFilter);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);

        const fromDate = screen.getByRole('textbox', { name: 'Indent From Date' });
        fireEvent.click(fromDate);
        // await waitFor(() => {
            expect(screen.getByText('Today')).toBeInTheDocument();
        // });
        fireEvent.click(screen.getByText('Today'));

        const toDate = screen.getByRole('textbox', { name: 'Indent To Date' });
        fireEvent.click(toDate);
        // await waitFor(() => {
            expect(screen.getAllByText('Today')[1]).toBeInTheDocument();
        // });
        fireEvent.click(screen.getAllByText('Today')[1]);

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);

        fireEvent.click(advanceFilter);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('search should work', async () => {
        customRender(<StockTransferIndentMaster resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} fetchRequestedByList={jest.fn()} />);

        const addBtn = screen.getByRole('textbox', { name: '' });
        fireEvent.change(addBtn, { target: { value: 106 } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });
});
