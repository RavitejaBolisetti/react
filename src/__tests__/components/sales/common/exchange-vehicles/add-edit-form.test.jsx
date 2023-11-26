/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { AddEditForm } from 'components/Sales/Common/ExchangeVehicles/AddEditForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
    };

    return <AddEditForm form={myMock} {...props} />;
};

describe('Add Edit Form Component', () => {
    it('should render add edit form component', () => {
        customRender(<AddEditForm />);
    });

    it('fields should work', async () => {
        const typeData = { VEHCL_MFG: [{ key: 106, value: 'Kai' }] };
        const filteredModelData = [{ key: 106, value: 'Hello' }];
        customRender(<FormWrapper typeData={typeData} setVisible={jest.fn()} setExchangeVisible={jest.fn()} formData={{ exchange: 1 }} handleFilterChange={jest.fn()} filteredModelData={filteredModelData} showAlert={jest.fn()} />);

        const exchange = screen.getByRole('switch', { name: 'Exchange' });
        fireEvent.click(exchange);
    });
});
