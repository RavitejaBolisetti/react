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
import createMockStore from '__mocks__/store';

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

describe('StockTransferIndentMaster component', () => {
    it("Print/Download", ()=>{
        const props = {
            checkKey : "REC",
            toggleButton : "INDNT_RECV",
            defaultVisibility : {
                canCancel: true,
                canReturn: false,
                canReceive: false,
                canPrint: true,
                canAdd: true,
            }
        }

        const handleBtnVisibility = jest.fn();
        handleBtnVisibility(props)
        

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { data: {id: "816",indentDate: "10",indentNumber: "STR23A010021",indentStatus: "REC",indentToLocation: "ANDHERI",indentToParent: "NBS INTERNATIONAL LTD",remarks: "123",requestedBy: "Reena Harikishan",
                        vehicleDetails:[{
                            balancedQuantity: 0,cancelledQuantity: 3, id: "858", issuedAndNotReceivedQuantity: 0, modelCode: "SCNM033417183875", modelDescription: "SCORPIO-N D AT 2WD Z6 7S XH", receivedQuantity: 1, requestedQuantity: 4
                        }]
                    }},
                    IndentIssue: { data: [{ issueNumber: "STI23D010021", vin: "MA1TJ2YGTP6H96793", issueStatus: "CNCL"},{ issueNumber: "STI23D010024", vin: "MA1TJ2YGTP6H96793", issueStatus: "REC"}] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <StockTransferIndentMaster resetData={resetData} fetchIndentList={fetchIndentList} indentIssueDataLoading={false} handleBtnVisibility={handleBtnVisibility} recordType={"REC"}/>
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

        const removeBtn = screen.getByTestId('removeBtn');
        fireEvent.click(removeBtn);
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
        const saveData = jest.fn();

        customRender(<StockTransferIndentMaster fetchIndentDetails={jest.fn()} saveData={saveData} resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} fetchRequestedByList={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'Add Indent' });
        fireEvent.click(addBtn);

        const closeBtn = screen.getAllByRole('button', { name: 'Cancel' });
        fireEvent.click(closeBtn[0]);

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);
    });

    it('advanced filters should work', async () => {
        customRender(<StockTransferIndentMaster resetData={jest.fn()} fetchProductLov={jest.fn()} fetchIndentLocation={jest.fn()} />);

        const advanceFilter = screen.getByRole('button', { name: 'Advanced Filters' });
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
