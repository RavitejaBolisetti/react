import React from 'react';
import { ShieldRegistrationDetailMaster } from '@components/Services/ShieldSchemeRegistartion/ShieldRegistrationDetail/ShieldRegistrationDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [shieldDetailForm] = Form.useForm();

    const myFormMock = {
        ...shieldDetailForm,
        setFieldValue: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <ShieldRegistrationDetailMaster shieldDetailForm={myFormMock} {...props} />;
};
const typeData = { DLVR_SALE_TYP: [{ id: '106' }] };

describe('Master Component', () => {
    it('test1', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} typeData={typeData} />);

        const searchBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(searchBtn[0]);
        fireEvent.click(searchBtn[1]);
    });

    it('test2', () => {
        const formActionType = { viewMode: false };
        customRender(<FormWrapper formActionType={formActionType} typeData={typeData} />);

        const searchBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(searchBtn[0]);
        fireEvent.click(searchBtn[1]);
    });
});
