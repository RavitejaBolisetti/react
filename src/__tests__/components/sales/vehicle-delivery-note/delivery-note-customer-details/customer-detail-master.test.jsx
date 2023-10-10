import '@testing-library/jest-dom/extend-expect';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDeliveryNote/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/vehicleDeliveryNote/customerDetails', () => ({
    vehicleDeliveryNoteCustomerDetailDataActions: {},
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <CustomerDetailsMaster form={myFormMock} {...props} />;
};

describe('Customer Detail Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper setButtonData={jest.fn()} resetData={jest.fn()} />);
    });

    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} resetData={jest.fn()} />);
    });

    it('test for onSucess  ', async () => {
        const formActionType = { viewMode: false };

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                VehicleDeliveryNote: {
                    CustomerDetailsDeliveryNote: { isLoaded: true, data: [{ customerId: '12' }] },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper formActionType={formActionType} setRequestPayload={jest.fn()} setSelectedOrder={jest.fn()} setButtonData={jest.fn()} soldByDealer={false} fetchList={fetchList} resetData={jest.fn()} />
            </Provider>
        );

        const chassis = screen.getByRole('textbox', { name: /Customer ID/i });
        fireEvent.change(chassis, { target: { value: 'TestCity' } });

        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });
});
