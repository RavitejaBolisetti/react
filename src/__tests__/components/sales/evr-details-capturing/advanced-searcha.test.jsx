/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AdvancedSearch } from '@components/Sales/EvrDetailsCapturing/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});
const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    const myFormMock = {
        ...advanceFilterForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn(),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn(),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};
const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

describe('advanced search component render', () => {
    it('should render advanced search button component', () => {
        customRender(<FormWrapper isVisible={true} />);
        const closeBtn = screen.getAllByRole('button', { value: 'Close' });
        fireEvent.click(closeBtn[0]);
        fireEvent.click(closeBtn[1]);

        const resetBtn = screen.getAllByRole('button', { value: 'Reset' });
        fireEvent.click(resetBtn[0]);
        fireEvent.click(resetBtn[1]);

        const applyBtn = screen.getAllByRole('button', { value: 'Apply' });
        fireEvent.click(applyBtn[0]);
        fireEvent.click(applyBtn[1]);
    });

    it('should render calender component', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);
        const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });
        fireEvent.click(calendarBtn[0]);
        fireEvent.click(calendarBtn[1]);
    });

    it('should render textbox', async () => {
        customRender(<FormWrapper isVisible={true} fetchList={jest.fn()} buttonData={buttonData} setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} />);
        const dueFromDate = screen.getByRole('textbox', { name: 'Due From Date' });
        fireEvent.click(dueFromDate);
        const one = screen.getAllByText('1');
        fireEvent.click(one[0]);

        const dueToDate = screen.getByRole('textbox', { name: 'Due To Date' });
        fireEvent.click(dueToDate);
        const day = screen.getAllByText('3');
        fireEvent.click(day[0]);

        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('test for onfinish failed', async () => {
        customRender(<FormWrapper isVisible={true} />);
        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });
});
