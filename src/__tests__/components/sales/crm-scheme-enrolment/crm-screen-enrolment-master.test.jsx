/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { CrmScreenEnrolmentMaster } from '@components/Sales/crmSchemeEnrolment/CrmScreenEnrolmentMaster';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        getFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
        isLoaded: jest.fn(),
    };
    return <CrmScreenEnrolmentMaster form={myFormMock} {...props} />;
};

describe('crm screen enrolment master component', () => {
    it('should render crm screen enrolment master component', () => {
        customRender(<FormWrapper />);
    });
});
