/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByRole } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AdvancedSearch } from '@components/Sales/crmSchemeEnrolment/search/AdvancedSearch';
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
const typeData = {
    PARAM_MASTER: {
        CRM_SCHEME_TYPE: { key: '123', type: 'test123' },
    },
    id: '321',
};

describe('advance search component', () => {
    it('should render advance search component', () => {
        customRender(<FormWrapper isVisible={true} typeData={[typeData]} setFilterString={jest.fn()} />);

        const enrolmentFromDate = screen.getByRole('textbox', { name: 'Enrolment From Date' });
        fireEvent.click(enrolmentFromDate);
        const fromDate = screen.getByText('Today');
        fireEvent.click(fromDate);

        const enrolmentToDate = screen.getByRole('textbox', { name: 'Enrolment To Date' });
        fireEvent.click(enrolmentToDate);
        const toDate = screen.getAllByText('Today');
        fireEvent.click(toDate[1]);

        const searchBtn = screen.getByRole('button', { name: /Apply/i });
        fireEvent.click(searchBtn);
    });

    it('should render combobox', async () => {
        customRender(<FormWrapper isVisible={true} typeData={[typeData]} setFilterString={jest.fn()} />);
        const schemeType = screen.getByRole('combobox', { value: 'Scheme Type' });
        fireEvent.change(schemeType, { target: { value: 'test' } });
    });
});
