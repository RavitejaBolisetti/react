/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { AddOnDetailsMaster } from '@components/Sales/VehicleDeliveryNote/AddOnDetails/AddOnDetailsMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const formName = {
    validateFields: () => Promise.resolve(),
};

jest.mock('components/Sales/VehicleDeliveryNote/AddOnDetails/CommonForm', () => {
    const CommonForm = ({ onSingleFormFinish, handleEmployeeSearch, onFinish }) => {
        function handleButtonClick(request) {
            onSingleFormFinish(request, formName);
            handleEmployeeSearch();
        }

        return (
            <>
                <button onClick={handleButtonClick('')}>Register</button>
                <button onClick={handleButtonClick('sheildRequest')}> Shield Register</button>
                <button onClick={handleButtonClick('amcRequest')}>AMC Register</button>
                <button onClick={handleButtonClick('rsaRequest')}>RSA Register</button>
            </>
        );
    };
    return {
        __esModule: true,
        default: CommonForm,
    };
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddOnDetailsMaster form={myFormMock} {...props} />;
};

describe('AddOn Detail Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test1', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    AddOnDetails: { isLoaded: true, data: { schemeType: 'A', schemeDescription: 'B', saleType: 'C' } },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper handleFormValueChange={jest.fn()} selectedInvoiceId={106} setButtonData={jest.fn()} fetchList={fetchList} resetData={jest.fn()} />
            </Provider>
        );
        const plusCollapse = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusCollapse[0]);
        fireEvent.click(plusCollapse[1]);
        fireEvent.click(plusCollapse[2]);

        const shieldRegister = screen.getByRole('button', { name: 'Shield Register' });
        fireEvent.click(shieldRegister);

        const amcRegister = screen.getByRole('button', { name: 'AMC Register' });
        fireEvent.click(amcRegister);

        const rmsRegister = screen.getByRole('button', { name: 'RSA Register' });
        fireEvent.click(rmsRegister);
    });

    it('test2', () => {
        const formActionType = {
            viewMode: true,
        };
        customRender(<FormWrapper handleCollapse={jest.fn()} handleFormValueChange={jest.fn()} formActionType={formActionType} setButtonData={jest.fn()} />);

        const plusCollapse = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusCollapse[0]);
        fireEvent.click(plusCollapse[1]);
        fireEvent.click(plusCollapse[2]);

        const minusCollapse = screen.getAllByRole('img', { name: 'minus' });
        fireEvent.click(minusCollapse[0]);
        fireEvent.click(minusCollapse[1]);
        fireEvent.click(minusCollapse[2]);
    });
});
