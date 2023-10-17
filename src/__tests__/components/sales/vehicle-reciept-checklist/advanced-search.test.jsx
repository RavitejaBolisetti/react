/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/VehicleRecieptChecklist/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    const myFormMock = {
        ...advanceFilterForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};

it('should render calender component', async () => {
    customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);
    const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });
    fireEvent.click(calendarBtn[0]);
    fireEvent.click(calendarBtn[1]);
});

it('should render advanced search button component', () => {
    customRender(<FormWrapper isVisible={true} setrules={jest.fn()} />);
    const closeBtn = screen.getAllByRole('button', { value: 'Close' });
    fireEvent.click(closeBtn[0]);
    fireEvent.click(closeBtn[1]);

    const resetBtn = screen.getAllByRole('button', { value: 'Reset' });
    fireEvent.click(resetBtn[0]);
    fireEvent.click(resetBtn[1]);

    const applyBtn = screen.getAllByRole('button', { value: 'Apply' });
    fireEvent.click(applyBtn[0]);
    fireEvent.click(applyBtn[1]);

    const modelDescription = screen.getByRole('combobox', { value: 'Model Description' });
    fireEvent.change(modelDescription, { target: { value: 'test123' } });
});

describe('vehicle reciept checklist Advance Search components', () => {
    it('should abe to select date without error', async () => {
        customRender(<FormWrapper isVisible={true} setrules={jest.fn()} />);
        const fromDate = screen.getByRole('textbox', { name: 'Receipt From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);
        const toDate = screen.getByRole('textbox', { name: 'Receipt To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);
        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });
});
