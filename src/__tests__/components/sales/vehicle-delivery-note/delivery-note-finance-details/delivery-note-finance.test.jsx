/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import FinananceDetailsMaster from '@components/Sales/VehicleDeliveryNote/FinananceDetails/FinananceDetailsMaster';
import customRender from '@utils/test-utils';
import { Button, Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('@components/Sales/Common/FinananceDetails/AddEditForm', () => {
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

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,

        setFieldsValue: jest.fn(),

        resetFields: jest.fn(),

        resetData: jest.fn(),

        validateFields: jest.fn(),
    };

    return <FinananceDetailsMaster form={myFormMock} {...props} />;
};

jest.mock('store/actions/data/otf/financeDetail', () => ({
    otfFinanceDetailDataActions: {},
}));

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

jest.mock('store/actions/data/vehicleDeliveryNote/customerDetails', () => ({
    vehicleDeliveryNoteCustomerDetailDataActions: {},
}));

const typeData = {
    FNC_ARNGD: [
        { key: '1', value: 'Finance Option 1' },
        { key: '2', value: 'Finance Option 2' },
    ],
};

describe('finance Detail Master components', () => {
    it('should render components', () => {
        customRender(<FinananceDetailsMaster setButtonData={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} typeData={typeData} />);
    });

    it('should render components when view mode is true', () => {
        const formActionType = { viewMode: true };
        customRender(<FinananceDetailsMaster setButtonData={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={formActionType} resetData={jest.fn()} typeData={typeData} />);
    });

    it('test for useEffects', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    FinanceDetail: { isLoaded: true, data: [{ branch: 'MUMBAI', doDate: 11 / 11 / 2023, doNumber: '1212', doReceived: 'N', emi: '111', fileNumber: '1', financeArrangedBy: 'CSH', financeDone: null, financier: 'AB BANK LTD', financierCode: '166', fincrCd: null, id: '106', loanAmount: 1222, otfId: '107', otfNumber: 'OTF23D000246' }] },
                    FinanceLov: { isLoaded: false, data: [{ id: '105' }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FinananceDetailsMaster setButtonData={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} typeData={typeData} />
            </Provider>
        );
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    FinanceDetail: { isLoaded: true, data: [{ branch: 'MUMBAI', doDate: 11 / 11 / 2023, doNumber: '1212', doReceived: 'N', emi: '111', fileNumber: '1', financeArrangedBy: 'CSH', financeDone: null, financier: 'AB BANK LTD', financierCode: '166', fincrCd: null, id: '106', loanAmount: 1222, otfId: '107', otfNumber: 'OTF23D000246' }] },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} fetchList={fetchList} handleButtonClick={jest.fn()} setButtonData={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} typeData={typeData} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });

        fireEvent.click(saveBtn[1]);
    });
});
