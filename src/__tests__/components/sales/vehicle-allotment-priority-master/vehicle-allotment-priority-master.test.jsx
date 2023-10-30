/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { VehicleAllotmentPriorityMaster } from '@components/Sales/VehicleAllotmentPriorityMaster/VehicleAllotmentPriorityMaster';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicle/vehicleAllotPriorityAllotAction', () => ({
    vehicleAllotPrioritySaveActions: {},
}));

jest.mock('store/actions/data/vehicle/vehicleAllotmentPriorityAction', () => ({
    vehicleAllotPriorityActions: {},
}));

jest.mock('store/actions/data/financialAccounting/documentTypeLedger', () => ({
    documentTypeLedgerDataActions: {},
}));

jest.mock('store/actions/data/termsConditions/tncProductHierarchy', () => ({
    tncProductHierarchyDataActions: {},
}));

jest.mock('store/actions/data/financialAccounting/financialAccountHead', () => ({
    financialAccountHeadDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/designationMaster', () => ({
    dealerManpowerDesignationMasterDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/roleMaster', () => ({
    roleMasterDataActions: {},
}));

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <VehicleAllotmentPriorityMaster advanceFilterForm={advanceFilterForm} {...props} />;
};

const FROM_ACTION_TYPE = { ADD: 'add', EDIT: 'edit', VIEW: 'view', VIEW_ONLY: 'view_only', NEXT: 'next', CANCEL_VOUCHER: 'cancel_voucher', CANCEL_OTF: 'cancel_otf', TRANSFER_OTF: 'transfer_otf', CHILD: 'child', SIBLING: 'siblin', ALLOT: 'allot' };

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

const typeData = {
    VEH_PR_MOD_GR: {
        id: '123',
        key: 'test',
        parentKey: 'VEH_PR_MOD_GR',
        value: 'New Model Group',
    },
};

describe('vehicle allotment priority master component', () => {
    it('should render vehicle allotment priority master component', () => {
        customRender(<FormWrapper typeData={typeData} resetDataList={jest.fn()} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
    });
    it('button should work', () => {
        customRender(<FormWrapper typeData={typeData} resetDataList={jest.fn()} showAddButton={true} handleButtonClick={jest.fn()} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const advancedFilters = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilters);
        const leftBtn = screen.getByRole('button', { name: 'left' });
        fireEvent.click(leftBtn);
        const rightBtn = screen.getByRole('button', { name: 'right' });
        fireEvent.click(rightBtn);

        const searchsBtn = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchsBtn);
        const plusAdds = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusAdds);
        const leftsBtn = screen.getByRole('img', { name: 'left' });
        fireEvent.click(leftsBtn);
        const rightsBtn = screen.getByRole('img', { name: 'right' });
        fireEvent.click(rightsBtn);
    });

    it('reset button should work', () => {
        customRender(<FormWrapper typeData={typeData} resetDataList={jest.fn()} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<FormWrapper typeData={typeData} resetDataList={jest.fn()} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('should render column header text', () => {
        customRender(<FormWrapper typeData={typeData} resetDataList={jest.fn()} showAddButton={true} handleButtonClick={jest.fn()} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
        const SrlBtn = screen.getByRole('columnheader', { name: 'Srl.' });
        fireEvent.click(SrlBtn);
        const oldModel = screen.getByRole('columnheader', { name: 'Old Model' });
        fireEvent.click(oldModel);
        const newModel = screen.getByRole('columnheader', { name: 'New Model' });
        fireEvent.click(newModel);
        const effectiveFromDate = screen.getByRole('columnheader', { name: 'Effective From Date' });
        fireEvent.click(effectiveFromDate);
        const effectiveToDate = screen.getByRole('columnheader', { name: 'Effective To Date' });
        fireEvent.click(effectiveToDate);
        const action = screen.getByRole('columnheader', { name: 'Action' });
        fireEvent.click(action);
        const noRecordsFound = screen.getByRole('cell', { name: 'No records found' });
        fireEvent.click(noRecordsFound);
        const previosPage = screen.getByRole('listitem', { name: 'Previous Page' });
        fireEvent.click(previosPage);
        const one = screen.getByRole('listitem', { name: '1' });
        fireEvent.click(one);
        const nextPage = screen.getByRole('listitem', { name: 'Next Page' });
        fireEvent.click(nextPage);
        const newModelEffective = screen.getByRole('row', { name: 'Srl. Old Model New Model Effective From Date Effective To Date Action' });
        fireEvent.click(newModelEffective);
        const noRecordsFounds = screen.getByRole('row', { name: 'No records found' });
        fireEvent.click(noRecordsFounds);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        data: { effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchRoleLovList={jest.fn()} fetchProductList={jest.fn()} resetDataList={jest.fn()} fetchVehicleAllotList={jest.fn()} typeData={typeData} fetchList={jest.fn()} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />
            </Provider>
        );
        const search = screen.getByPlaceholderText('Search');
        fireEvent.change(search, { target: { value: 'test' } });
        const searchBtn = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const closeCircle = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('close button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                    },
                },
            },
        });
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchRoleLovList={jest.fn()} fetchProductList={jest.fn()} resetDataList={jest.fn()} fetchVehicleAllotList={jest.fn()} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const saveBtn = screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(saveBtn[0]);
        fireEvent.click(saveBtn[1]);
    });

    it('save button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchRoleLovList={jest.fn()} fetchProductList={jest.fn()} resetDataList={jest.fn()} fetchVehicleAllotList={jest.fn()} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
        const newModel = screen.getByRole('combobox', { name: 'New Model(Booking)' });
        fireEvent.change(newModel, { target: { value: 'test' } });
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('should be able to search value', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchRoleLovList={jest.fn()} resetDataList={jest.fn()} fetchProductList={jest.fn()} fetchVehicleAllotList={jest.fn()} fetchList={jest.fn()} showAddButton={true} buttonData={buttonData} />
            </Provider>
        );
        const search = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(search, { target: { value: 'test' } });

        const searchBtn = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);

        const closeCircle = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('should render advanced filters search', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorityDetail: {
                        filter: { advanceFilter: 'Test', effectiveFromDate: '06/06/2022', effectiveToDate: '06/06/2022', key: 'searchParam' },
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchProductList={jest.fn()} fetchRoleLovList={jest.fn()} resetDataList={jest.fn()} fetchVehicleAllotList={jest.fn()} fetchList={jest.fn()} buttonData={buttonData} setFilterString={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );
        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });
    });

    it('On successAction and On closeAction should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorityDetail: {
                        filter: { advanceFilter: 'Test', effectiveFromDate: '06/06/2022', effectiveToDate: '06/06/2022', key: 'searchParam' },
                    },
                },
            },
        });

        const fetchVehicleList = jest.fn();
        const fetchVehicleAllotList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchList={jest.fn()} fetchProductList={jest.fn()} fetchRoleLovList={jest.fn()} resetDataList={jest.fn()} fetchVehicleAllotList={fetchVehicleAllotList} fetchVehicleList={fetchVehicleList} buttonData={buttonData} setFilterString={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotList.mock.calls[0][0].onSuccessAction();
        fetchVehicleAllotList.mock.calls[0][0].onErrorAction();
    });

    jest.setTimeout(100000);
    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                Vehicle: {
                    VehicleAllotPriorityDetail: {
                        data: {
                            paginationData: [
                                {
                                    effectiveFromDate: '2023-09-27',
                                    effectiveToDate: '2023-10-10',
                                    id: '96fe045e-4a66-4e49-b72d-7ab0c4748333',
                                    newModelGroup: 'ALTURAS',
                                    oldModelGroup: 'ALTURAS G4 2WD HIGH BSVI DSAT SILVER',
                                },
                            ],
                        },
                    },
                },
            },
        });

        const fetchVehicleList = jest.fn();
        const fetchVehicleAllotList = jest.fn();
        const fetchDocTypeLedger = jest.fn();
        const fetchProductList = jest.fn();
        const fetchFinancialAccountHead = jest.fn();
        const fetchList = jest.fn();
        const fetchRoleLovList = jest.fn();

        const buttonData = { viewBtn: true };

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchRoleLovList={fetchRoleLovList} fetchList={fetchList} fetchFinancialAccountHead={fetchFinancialAccountHead} fetchProductList={fetchProductList} fetchDocTypeLedger={fetchDocTypeLedger} resetDataList={jest.fn()} fetchVehicleAllotList={fetchVehicleAllotList} fetchVehicleList={fetchVehicleList} buttonData={buttonData} setFilterString={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );

        fetchVehicleAllotList.mock.calls[0][0].onErrorAction();

        fetchVehicleAllotList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => {
            expect(screen.getByText('ALTURAS')).toBeInTheDocument();
        });

        const viewBtn = screen.getByRole('button', { name: /ai-view/i });
        fireEvent.click(viewBtn);

        const closeBtn = screen.getAllByRole('button', { name: /close/i });
        fireEvent.click(closeBtn[0]);

        const addBtn = screen.getByRole('img', { name: /plus/i });
        fireEvent.click(addBtn);

        const combo1 = screen.getByRole('combobox', { name: /old model\(exchange\)/i });
        fireEvent.change(combo1, { target: { value: 'test' } });

        const combo2 = screen.getByRole('combobox', { name: /new model\(booking\)/i });
        fireEvent.change(combo2, { target: { value: 'test' } });

        const fromDate = screen.getByRole('textbox', { name: 'Effective From Date' });

        fireEvent.click(fromDate);

        const todayForFromDate = await screen.findByText('Today');

        fireEvent.click(todayForFromDate);

        const toDate = screen.getByRole('textbox', { name: 'Effective To Date' });

        fireEvent.click(toDate);

        const todayToFromDate = await screen.findAllByText('Today');

        fireEvent.click(todayToFromDate[1]);

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);
    });
});
