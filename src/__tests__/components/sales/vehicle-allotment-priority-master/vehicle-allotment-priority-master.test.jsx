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
});
