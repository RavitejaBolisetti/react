/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VehicleAllotmentPriorityMaster } from '@components/Sales/VehicleAllotmentPriorityMaster/VehicleAllotmentPriorityMaster';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});
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
        customRender(<FormWrapper typeData={typeData} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
    });
    it('button should work', () => {
        customRender(<FormWrapper typeData={typeData} showAddButton={true} handleButtonClick={jest.fn()} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
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
        customRender(<FormWrapper typeData={typeData} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const resetBtn = screen.getByRole('button', { name: /Reset/i });
        fireEvent.click(resetBtn);
    });

    it('test for closing the advance filter', () => {
        customRender(<FormWrapper typeData={typeData} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);

        const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
        fireEvent.click(advanceFilter);
        const closeBtn = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeBtn);
    });

    it('should render column header text', () => {
        customRender(<FormWrapper typeData={typeData} showAddButton={true} handleButtonClick={jest.fn()} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />);
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
                <VehicleAllotmentPriorityMaster typeData={typeData} fetchList={jest.fn()} showAddButton={true} FROM_ACTION_TYPE={FROM_ACTION_TYPE} buttonData={buttonData} />
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
                <VehicleAllotmentPriorityMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
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
                <VehicleAllotmentPriorityMaster setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
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
                <VehicleAllotmentPriorityMaster fetchList={jest.fn()} showAddButton={true} buttonData={buttonData} />
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
                    VehicleAllotPriorDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                        filter: { advanceFilter: 'Test', effectiveFromDate: '06/06/2022', effectiveToDate: '06/06/2022', key: 'searchParam' },
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchList={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const removeFilter = screen.getByTestId('removeBtn');
        fireEvent.click(removeFilter);
    });

    it('should render advanced filters search clear', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VehicleAllotPriorityDetail: {
                        data: [{ effectiveFromDate: '2023-09-08', effectiveToDate: '2023-09-18', id: '123', newModelGroup: 'ALTSMM81813337450', oldModelGroup: 'ALTSMM81813337441' }],
                        filter: { advanceFilter: 'Test', effectiveFromDate: '06/06/2022', effectiveToDate: '06/06/2022', key: 'searchParam' },
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <VehicleAllotmentPriorityMaster fetchList={jest.fn()} handleResetFilter={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const advanceFilter = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(advanceFilter, { target: { value: 'Test' } });

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });
});
