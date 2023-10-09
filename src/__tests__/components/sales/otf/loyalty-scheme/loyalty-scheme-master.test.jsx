import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from 'components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';

jest.mock('store/actions/data/otf/loyaltyAndScheme', () => ({
    otfLoyaltySchemeDataActions: {},
}));


jest.mock('@components/Sales/Common/LoyaltyScheme/AddEditForm', () => {
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

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myForm = {
        ...form,
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <LoyaltySchemeMaster form={myForm} {...props} />;
};

const buttonData = {
    allotBtn: true,
    cancelBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    closeBtn: true,
    deliveryNote: true,
    editBtn: true,
    formBtnActive: true,
    invoiceBtn: true,
    saveAndNewBtn: true,
    saveAndNewBtnClicked: true,
    saveBtn: true,
    transferOTFBtn: true,
    unAllotBtn: true,
};

describe('Loyalty scheme master render', () => {
    it('should render loyalty scheme add edit from details', async () => {
        const CustomerDetailData = [
            {
                "id": "5d6651ac-4e5f-4dc7-9f70-88ffb7ae62e4",
                "schemeMasterId": "7e35b561-f3f7-40b1-a976-2ee1e46ce8a5",
                "otfId": "898b6f9f-f7dd-4f7d-a2ae-972fa38b1c50",
                "otfNumber": "OTF24D000598",
                "customerCode": "C230496131",
                "customerName": "SNEHAL PRABHAKAR WANJARI",
                "customerDOB": null,
                "registrationYear": "2023",
                "registrationYearCode": "2023",
                "registrationMonth": "JANUARY",
                "registrationMonthCode": "1",
                "kilometer": null,
                "vehicleUsageCode": "C",
                "vehicleUsage": "Commercial",
                "financierCode": null,
                "financierName": null,
                "variantCode": null,
                "variantName": "M0020",
                "vehicleManufactureCode": null,
                "vehicleModelCode": null,
                "vehicleModelGroup": "X300",
                "make": "mahindra",
                "financeIndicator": null,
                "loyaltyBonus": null,
                "oldChassisNumber": "N2H59599",
                "registrationNumber": "MH43CC3313",
                "relationCode": "HUSB",
                "relationName": "Husband",
                "serialNumber": null,
                "schemeCode": "7e35b561-f3f7-40b1-a976-2ee1e46ce8a5",
                "schemeType": "D",
                "schemeName": "2 years free extended warranty",
                "schemeCategory": "OINVC",
                "schemeAmount": null,
                "schemeApplicableTo": "IND",
                "validFrom": "2010-11-01",
                "validTo": "2010-11-30",
                "remarks": null
            }
        ];

        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: CustomerDetailData, LoyaltySchemeData: CustomerDetailData },
                },
            },
        });

        const res = {
            "otfId": "1234",
        }

        const fetchList = jest.fn();
        const saveData = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <LoyaltySchemeMaster StatusBar={'test'} data={res} setformData={jest.fn()} handleSchemeChange={jest.fn()} onFinishCustom={{ key: 1, value: res }} handleFilterChange={jest.fn()} variantData={CustomerDetailData} saveData={saveData} FormActionButton={FormActionButton} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const submitBtn = screen.getAllByRole('button', { name: 'Save', exact: false });
        fireEvent.click(submitBtn[0]);
    });

    it('should render loyalty scheme search details', () => {
        const CustomerDetailData = [
            {
                id: 'test',
                value: 'test1',
            },
            {
                id: 'test1',
                value: 'test1',
            },
        ];
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: CustomerDetailData },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} FormActionButton={FormActionButton} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
    });
});
