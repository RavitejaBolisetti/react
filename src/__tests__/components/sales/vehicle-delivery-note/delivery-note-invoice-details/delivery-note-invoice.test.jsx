/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/VehicleDeliveryNote/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMoock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn(),
        getFieldsValue: jest.fn(),
    };
    return <InvoiceDetailsMaster form={myMoock} {...props} />;
};

jest.mock('@components/Sales/VehicleDeliveryNote/InvoiceDetails/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );

    return {
        __esModule: true,

        AddEditForm,
    };
});

describe('delivery note Invoice Details render', () => {
    it('should render component', async () => {
        const formActionType = { addMode: true };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('should render component for viewmode', async () => {
        const formActionType = { viewMode: true };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('test1', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    RelationshipManager: { isLoaded: true, data: [{ id: '12' }] },
                    EngineNumber: { isLoaded: true, data: [{ chassisNumber: '1212', engineNumber: '121' }] },
                },
            },
        });
        const formActionType = { viewMode: false };
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} setButtonData={jest.fn()} formActionType={formActionType} fetchList={fetchList} soldByDealer={true} disableFieldsOnFutureDate={true} />
            </Provider>
        );
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    RelationshipManager: { isLoaded: true, data: [{ id: '12' }] },
                    VinNumberSearch: { isLoaded: true, data: [{ chassisNumber: '1212', engineNumber: '121' }] },
                },
            },
        });
        const fetchList = jest.fn();
        const formActionType = { addMode: true };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper setFilterString={jest.fn()} setButtonData={jest.fn()} fetchList={fetchList} formActionType={formActionType} soldByDealer={true} disableFieldsOnFutureDate={true} setRequestPayload={jest.fn()} handleButtonClick={jest.fn()} />
            </Provider>
        );
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
