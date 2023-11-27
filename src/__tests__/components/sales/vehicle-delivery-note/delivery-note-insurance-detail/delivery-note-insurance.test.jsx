/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { InsuranceDetailsMaster } from '@components/Sales/VehicleDeliveryNote/InsuranceDetails/InsuranceDetailsMaster';
import customRender from '@utils/test-utils';
import { Button } from 'antd';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/otf/insuranceDetail', () => ({
    insuranceDetailDataActions: {},
}));

jest.mock('@components/Sales/Common/InsuranceDetails/AddEditForm', () => {
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

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn(),
    };
    return <InsuranceDetailsMaster form={myFormMock} {...props} />;
};

describe('Insurance Detail components', () => {
    it('should render components', async () => {
        <FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} />;
    });
    it('should render components when viewmode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper formActionType={formActionType} setButtonData={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    InsuranceDetail: {
                        isLoaded: true,
                        data: [{ id: '106', insuranceAmount: null, insuranceCompany: 'MAHINDRA  MAHINDRA LTD.', insuranceCoverNote: null, insuranceDate: '2023-09-13T18:30:00.000+00:00', otfNumber: 'OTF24D000566', registrationNumber: null }],
                    },
                },
            },
        });
        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <InsuranceDetailsMaster saveData={saveData} fetchList={fetchList} handleButtonClick={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} setButtonData={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[1]);
    });
});
