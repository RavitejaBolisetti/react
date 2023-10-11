/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/RsmAsmApproval/AdvancedSearch';
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

describe('RSM ASM Advance Search components', () => {
    it('should abe to select date without error', async () => {
        customRender(<FormWrapper isVisible={true} />);

        const fromDate = screen.getByRole('textbox', { name: 'Request From Date' });
        fireEvent.click(fromDate);
        const todayForFromDate = await screen.findByText('Today');
        fireEvent.click(todayForFromDate);
        const toDate = screen.getByRole('textbox', { name: 'Request To Date' });
        fireEvent.click(toDate);
        const todayToFromDate = await screen.findAllByText('Today');
        fireEvent.click(todayToFromDate[1]);
        const searchBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
    });

    it('test for onfinish failed', async () => {
        customRender(<FormWrapper isVisible={true} />);
        const searchBtn = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchBtn);
    });
});
