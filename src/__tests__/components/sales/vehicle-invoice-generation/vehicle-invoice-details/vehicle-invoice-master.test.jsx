import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { InvoiceDetailsMaster } from '@components/Sales/VehicleInvoiceGeneration/InvoiceDetails/InvoiceDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';
import { Button } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [CustomerForm] = Form.useForm();
    const myMoock = {
        ...CustomerForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn(),
        getFieldsValue: jest.fn(),
    };
    return <InvoiceDetailsMaster CustomerForm={myMoock} {...props} />;
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

// const GENDER = [{ id: 'male' }];

const typeData = {
    GENDER: [{ id: 106 }],
};

describe('Invoice Generation Invoice Details render', () => {
    it('should render component ', async () => {
        const formActionType = { addMode: true };

        customRender(<FormWrapper StatusBar={StatusBar} typeData={typeData} FormActionButton={FormActionButton} formActionType={formActionType} setButtonData={jest.fn()} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[1]);
    });

    it('should render component for viewmode ', async () => {
        const formActionType = { viewMode: true };

        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={formActionType} setButtonData={jest.fn()} />);

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);
    });

    // it('test1', () => {
    //     const mockStore = createMockStore({
    //         auth: { userId: 106 },
    //         data: {
    //             VehicleDeliveryNote: {
    //                 RelationshipManager: { isLoaded: true, data: [{ id: '12' }] },
    //                 EngineNumber: { isLoaded: true, data: [{ chassisNumber: '1212', engineNumber: '121' }] },
    //             },
    //         },
    //     });
    //     const formActionType = { viewMode: false };
    //     const fetchList = jest.fn();

    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper setFilterString={jest.fn()} setButtonData={jest.fn()} formActionType={formActionType} fetchList={fetchList} soldByDealer={true} disableFieldsOnFutureDate={true} />
    //         </Provider>
    //     );
    // });

    // it('test for onSuccess', async () => {
    //     const mockStore = createMockStore({
    //         auth: { userId: 106 },
    //         data: {
    //             VehicleDeliveryNote: {
    //                 RelationshipManager: { isLoaded: true, data: [{ id: '12' }] },
    //                 VinNumberSearch: { isLoaded: true, data: [{ chassisNumber: '1212', engineNumber: '121' }] },
    //             },
    //         },
    //     });

    //     const saveData = jest.fn();
    //     const fetchList = jest.fn();
    //     const formActionType = { addMode: true };

    //     customRender(
    //         <Provider store={mockStore}>
    //             <FormWrapper setFilterString={jest.fn()} setButtonData={jest.fn()} fetchList={fetchList} formActionType={formActionType} soldByDealer={true} disableFieldsOnFutureDate={true} setRequestPayload={jest.fn()} handleButtonClick={jest.fn()} />
    //         </Provider>
    //     );

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });

    //     fireEvent.click(saveBtn);

    //     await waitFor(() => {
    //         expect(saveData).toHaveBeenCalled();
    //     });

    //     saveData.mock.calls[0][0].onSuccess();
    // });
});
