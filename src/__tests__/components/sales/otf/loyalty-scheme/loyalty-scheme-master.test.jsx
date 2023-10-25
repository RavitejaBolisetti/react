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

const StatusBar = () => <div>No Status Bar</div>;
const res = {
    customerCode: 'C230847215',
    customerName: 'HABHIT WELLNESS PRIVATE LIMITED',
    id: 'aa5c723e-42bd-4dd3-991a-197b0b181849',
    make: 'MM',
    oldChassisNumber: 'NJK49563',
    otfId: '08be0405-bf89-4bd1-97fe-0b1b3330d6e7',
    registrationMonthCode: '6',
    registrationNumber: 'MH02FL2787',
    registrationYearCode: '2021',
    relationCode: 'F',
    remarks: null,
    schemeAmount: 25000,
    schemeCode: '2b926ad0-cf5d-4927-b3ec-75bed042dbab',
    variantCode: 'MM866',
    vehicleModelGroup: 'ZOR',
    vehicleUsageCode: 'F',
};

jest.mock('@components/Sales/Common/LoyaltyScheme/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => {
        <div>
            <button onClick={onFinish}>Save</button>
        </div>;
    };
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
        resetFields: jest.fn().mockReturnValue(['customerCode', 'customerName', 'make', 'vehicleModelGroup', 'variantCode', 'registrationNumber', 'oldChassisNumber', 'customerDOB']),
        setFieldsValue: jest.fn().mockReturnValue(res),
    };
    return <LoyaltySchemeMaster form={myForm} {...props} />;
};


const data = [
    {
        customerCode: 'C230847215',
        customerName: 'HABHIT WELLNESS PRIVATE LIMITED',
        id: 'aa5c723e-42bd-4dd3-991a-197b0b181849',
        make: 'MM',
        oldChassisNumber: 'NJK49563',
        otfId: '08be0405-bf89-4bd1-97fe-0b1b3330d6e7',
        registrationMonthCode: '6',
        registrationNumber: 'MH02FL2787',
        registrationYearCode: '2021',
        relationCode: 'F',
        remarks: null,
        schemeAmount: 25000,
        schemeCode: '2b926ad0-cf5d-4927-b3ec-75bed042dbab',
        variantCode: 'MM866',
        vehicleModelGroup: 'ZOR',
        vehicleUsageCode: 'F',
    },
];

describe('Loyalty scheme master render', () => {

    it('should render loyalty scheme selectedRecordId', async () => {
        const mockStore = createMockStore({
            auth: { userId: '123456' },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} selectedRecordId={'testing'} FormActionButton={FormActionButton} fetchList={fetchList} />
            </Provider>
        );
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('should render loyalty scheme modelData', async () => {
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyModelGroup: { isFilteredListLoaded: true, filteredListData: data, modelData: data },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} FormActionButton={FormActionButton} fetchList={fetchList} />
            </Provider>
        );
    });

    it('should render loyalty scheme variantData', async () => {
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyVarient: { iisVariantDataLoaded: true, filteredListData: data, variantData: data },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={'test'} FormActionButton={FormActionButton} fetchVariantLovList={jest.fn()} fetchList={fetchList} />
            </Provider>
        );
    });

    it('should render loyalty scheme submit', async () => {
        const mockStore = createMockStore({
            auth: { userId: '123456' },
            data: {
                OTF: {
                    LoyaltyVarient: { iisVariantDataLoaded: true, variantData: [{ value: 'Maruti1' }] },
                    LoyaltyModelGroup: { isFilteredListLoaded: true, modelData: [{ value: 'Maruti' }] },
                    LoyaltyScheme: { isLoaded: true, data: data, LoyaltySchemeData: data },
                    SchemeDetail: { isSchemeLovDataLoaded: true, schemeLovData: [{ value: 'Maruti3' }] },
                },
                ConfigurableParameterEditing: { typeData: ['VEHCL_USAG'] },
            },
            customer: {
                customerDetail: { isDataCustomerLoaded: false, isCustomerLoading: false, customerDetail: [{ value: 'Maruti3' }] },
            },
        });

        const fetchList = jest.fn();
        const saveData = jest.fn();

        const response = { data: {
            customerCode: 'C230847215',
            customerName: 'HABHIT WELLNESS PRIVATE LIMITED',
            id: 'aa5c723e-42bd-4dd3-991a-197b0b181849',
            make: 'MM',
            oldChassisNumber: 'NJK49563',
            otfId: '08be0405-bf89-4bd1-97fe-0b1b3330d6e7',
            registrationMonthCode: '6',
            registrationNumber: 'MH02FL2787',
            registrationYearCode: '2021',
            relationCode: 'F',
            remarks: null,
            schemeAmount: 25000,
            schemeCode: '2b926ad0-cf5d-4927-b3ec-75bed042dbab',
            variantCode: 'MM866',
            vehicleModelGroup: 'ZOR',
            vehicleUsageCode: 'F',
        }, }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={StatusBar} onFinishCustom={true} saveData={saveData} FormActionButton={FormActionButton} fetchList={fetchList} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchCustomerList={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);
    });
});
