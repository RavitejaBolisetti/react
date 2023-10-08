import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/VehicleDeliveryNote/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('store/actions/data/vehicleDeliveryNote/challanInvoice', () => ({
    invoiceDetailsDataActions: {},
}));

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

describe('delivery note Invoice Details render', () => {
    it('should render component ', async () => {
        const formActionType = { addMode: true };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('should render component for viewmode ', async () => {
        const formActionType = { viewMode: true };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('test1', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    RelationshipManager: { isLoaded: true, data: [{ id: '12' }] },
                    EngineNumber: { isLoaded: true, data: [{ chassisNumber: '1212' }] },
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

    it('should render component for viewmode ', async () => {
        const formActionType = { viewMode: false };

        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} soldByDealer={false} />);

        const chassis = screen.getByRole('combobox', { name: /Chassis No./i });
        fireEvent.change(chassis, { target: { value: 'TestCity' } });
    });
});
