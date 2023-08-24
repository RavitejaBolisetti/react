/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { ExchangeVehiclesMaster } from '@components/Sales/OTF/ExchangeVehicles/ExchangeVehiclesMaster';
import { Form } from 'antd';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const mockForm = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        validateFields: jest.fn(),
    };
    return <ExchangeVehiclesMaster form={mockForm} {...props} />;
};

const props = {
    styles: {},
    onHandleChange: jest.fn(),
    formActionType: { addMode: false, editMode: false, viewMode: true },
    listConsultantShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    section: { displayOnList: true, id: 1, title: 'Exchange Vehicle' },
    fetchOTFDetail: jest.fn(),
    listShowLoading: jest.fn(),
    isDataLoaded: true,
    exchangeData: {
        customerExpectedPrice: '12313123',
        customerId: 'CUS1687411157049',
        customerName: 'Randhir Kumar',
        hypothicatedTo: 'ICICI',
        hypothicatedToCode: 'FI003',
        id: '27cf9b5e-ef3d-4052-969a-b2a3b39b6a2e',
        kilometer: '123123123',
        make: 'Mahindra',
        modelGroup: 'Thar',
        monthOfRegistration: 'JANUARY',
        monthOfRegistrationCode: 'JAN',
        oldChessisNumber: '123123123',
        oldRegistrationNumber: '123123123',
        otfNumber: 'OTF24A000691',
        procurementPrice: '123123123',
        relationship: 'Brother',
        relationshipCode: 'BRO',
        schemeAmount: '1.23',
        schemeCode: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        schemeName: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        usage: 'Commercial',
        usageCode: 'C',
        variant: 'Thar4x4',
        yearOfRegistration: null,
        yearOfRegistrationCode: '2023',
    },
    saveData: {
        customerExpectedPrice: '12313123',
        customerId: 'CUS1687411157049',
        customerName: 'Randhir Kumar',
        hypothicatedTo: 'ICICI',
        hypothicatedToCode: 'FI003',
        id: '27cf9b5e-ef3d-4052-969a-b2a3b39b6a2e',
        kilometer: '123123123',
        make: 'Mahindra',
        modelGroup: 'Thar',
        monthOfRegistration: 'JANUARY',
        monthOfRegistrationCode: 'JAN',
        oldChessisNumber: '123123123',
        oldRegistrationNumber: '123123123',
        otfNumber: 'OTF24A000691',
        procurementPrice: '123123123',
        relationship: 'Brother',
        relationshipCode: 'BRO',
        schemeAmount: '1.23',
        schemeCode: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        schemeName: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        usage: 'Commercial',
        usageCode: 'C',
        variant: 'Thar4x4',
        yearOfRegistration: null,
        yearOfRegistrationCode: '2023',
    },
    isLoading: false,
    selectedOrderId: 'OTF1690806304088',
    handleFormValueChange: jest.fn(),
    fetchFinanceLovList: jest.fn(),
    FinanceLov: { key: 'FI002', parentKey: null, value: 'HDFC' },
    isFinanceLovDataLoaded: true,
    NEXT_ACTION: jest.fn(),
    handleButtonClick: jest.fn(),
    makeExtraParams: [
        {
            key: 'otfNumber',
            title: 'otfNumber',
            value: 'OTF1690806304088',
            name: 'OTF Number',
        },
    ],
    modelData: [
        {
            key: 'Swift',
            parentKey: 'Maruti',
            value: 'Swift',
        },
    ],
    variantData: [
        {
            key: 'Swift dezire',
            parentKey: 'swift',
            value: 'Swift dezire',
        },
    ],
    formData: {
        customerExpectedPrice: '12313123',
        customerId: 'CUS1687411157049',
        customerName: 'Randhir Kumar',
        hypothicatedTo: 'ICICI',
        hypothicatedToCode: 'FI003',
        id: '27cf9b5e-ef3d-4052-969a-b2a3b39b6a2e',
        kilometer: '123123123',
        make: 'Mahindra',
        modelGroup: 'Thar',
        monthOfRegistration: 'JANUARY',
        monthOfRegistrationCode: 'JAN',
        oldChessisNumber: '123123123',
        oldRegistrationNumber: '123123123',
        otfNumber: 'OTF24A000691',
        procurementPrice: '123123123',
        relationship: 'Brother',
        relationshipCode: 'BRO',
        schemeAmount: '1.23',
        schemeCode: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        schemeName: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
        usage: 'Commercial',
        usageCode: 'C',
        variant: 'Thar4x4',
        yearOfRegistration: null,
        yearOfRegistrationCode: '2023',
    },
};

const defaultBtnVisiblity = {
    editBtn: true,
    saveBtn: true,
    cancelBtn: true,
    saveAndNewBtn: true,
    saveAndNewBtnClicked: true,
    closeBtn: true,
    formBtnActive: true,
    cancelOTFBtn: true,
    transferOTFBtn: true,
    allotBtn: true,
    unAllotBtn: true,
    invoiceBtn: true,
    deliveryNote: true,
    changeHistory: true,
};

const mockStore = createMockStore({
    auth: { userId: 123 },
    data: {
        OTF: {
            ExchangeVehicle: {
                isDataLoaded: true,
                isLoading: false,
                exchangeData: [
                    {
                        customerExpectedPrice: '12313123',
                        customerId: 'CUS1687411157049',
                        customerName: 'Randhir Kumar',
                        hypothicatedTo: 'ICICI',
                        hypothicatedToCode: 'FI003',
                        id: '27cf9b5e-ef3d-4052-969a-b2a3b39b6a2e',
                        kilometer: '123123123',
                        make: 'Mahindra',
                        modelGroup: 'Thar',
                        monthOfRegistration: 'JANUARY',
                        monthOfRegistrationCode: 'JAN',
                        oldChessisNumber: '123123123',
                        oldRegistrationNumber: '123123123',
                        otfNumber: 'OTF24A000691',
                        procurementPrice: '123123123',
                        relationship: 'Brother',
                        relationshipCode: 'BRO',
                        schemeAmount: '1.23',
                        schemeCode: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
                        schemeName: 'f7a2854e-3d30-4489-8a49-dd1ec0ebf538',
                        usage: 'Commercial',
                        usageCode: 'C',
                        variant: 'Thar4x4',
                        yearOfRegistration: null,
                        yearOfRegistrationCode: '2023',
                    },
                ],
            },
            FinanceLov: {
                isFinanceLovDataLoaded: true,
                isLoading: false,
                financeLovData: [
                    {
                        key: 'FI002',
                        parentKey: null,
                        value: 'HDFC',
                    },
                ],
            },
            SchemeDetail: {
                isSchemeLovDataLoaded: true,
                isLoading: false,
                schemeLovData: [
                    {
                        key: '9fb8470b-8f50-4587-a3d1-09f1a027a98c',
                        parentKey: null,
                        value: 'Name',
                    },
                ],
            },
        },
        ConfigurableParameterEditing: { typeData: ['REL_TYPE'] },
        Vehicle: {
            MakeVehicleDetails: {
                isMakeDataLoaded: true,
                isLoading: false,
                makeData: [
                    {
                        key: 'Maruti',
                        parentKey: null,
                        value: 'Maruti',
                    },
                ],
            },
            ModelVehicleDetails: {
                isModelDataLoaded: false,
                isLoading: false,
                modelData: [
                    {
                        key: 'Swift',
                        parentKey: 'Maruti',
                        value: 'Swift',
                    },
                ],
            },
            VariantVehicleDetails: {
                isVariantDataLoaded: false,
                isLoading: false,
                variantData: [
                    {
                        key: 'Swift dezire',
                        parentKey: 'swift',
                        value: 'Swift dezire',
                    },
                ],
            },
        },
    },
    customer: {
        customerDetail: { isDataCustomerLoaded: false, isCustomerLoading: false, customerDetail: [] },
    },
});

describe('ExchangeVehiclesMaster component render', () => {
    it('should render addedit page', async () => {
        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} buttonData={defaultBtnVisiblity} />);
    });

    it('should render text components', async () => {
        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} />);

        const otfDetails = screen.getByText('Exchange Vehicle');
        expect(otfDetails).toBeTruthy();

        const booked = screen.getByText('Booked');
        expect(booked).toBeTruthy();

        const alloted = screen.getByText('Allotted');
        expect(alloted).toBeTruthy();

        const invoiced = screen.getByText('Invoiced');
        expect(invoiced).toBeTruthy();

        const delivered = screen.getByText('Delivered');
        expect(delivered).toBeTruthy();
    });

    it('should render buttons', async () => {
        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} />);

        const close = screen.getByRole('button', { name: 'Close' });
        act(() => {
            fireEvent.click(close);
        });

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        act(() => {
            fireEvent.click(cancel);
        });

        const allot = screen.getByRole('button', { name: 'Allot' });
        act(() => {
            fireEvent.click(allot);
        });

        const unallot = screen.getByRole('button', { name: 'Un-Allot' });
        act(() => {
            fireEvent.click(unallot);
        });

        const invoice = screen.getByRole('button', { name: 'Invoice' });
        act(() => {
            fireEvent.click(invoice);
        });

        const transfer = screen.getByRole('button', { name: 'Transfer OTF' });
        act(() => {
            fireEvent.click(transfer);
        });

        const cancelOtf = screen.getByRole('button', { name: 'Cancel OTF' });
        act(() => {
            fireEvent.click(cancelOtf);
        });

        const changeHistory = screen.getByRole('button', { name: 'Change History' });
        act(() => {
            fireEvent.click(changeHistory);
        });

        const saveNext = screen.getByRole('button', { name: 'Save & Next' });
        act(() => {
            fireEvent.click(saveNext);
        });
    });

    it('should check cancle button is working', async () => {
        customRender(
            <Provider store={mockStore}>
                <ExchangeVehiclesMaster {...props} typeData="REL_TYPE" buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        await act(async () => {
            fireEvent.click(cancelBtn);
        });
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <ExchangeVehiclesMaster {...props} typeData="REL_TYPE" setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );

        const addBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        await act(async () => {
            fireEvent.click(addBtn);
        });

        const saveBtn = screen.getByRole('button', { name: 'Save & Next', exact: false });
        await act(async () => {
            fireEvent.click(saveBtn);
        });
    });
});

describe('setfilteredModelData', () => {
    const setfilteredModelData = jest.fn();

    it('pass modelData into setfilteredModelData', () => {
        const modelData = [
            {
                key: 'Swift',
                parentKey: 'Maruti',
                value: 'Swift',
            },
        ];

        const props = {
            ...modelData,
            isModelDataLoaded: true,
        };

        customRender(<ExchangeVehiclesMaster {...props} />);
        setfilteredModelData(modelData);
    });

    it('pass modelData into setfilteredModelData', () => {
        const variantData = [
            {
                key: 'Swift dezire',
                parentKey: 'swift',
                value: 'Swift dezire',
            },
        ];

        const props = {
            ...variantData,
            isVariantDataLoaded: true,
        };

        customRender(<ExchangeVehiclesMaster {...props} />);
        setfilteredModelData(variantData);
    });
});

describe('onSearch', () => {
    const props = {
        formActionType: { addMode: false, editMode: true, viewMode: false },
        isLoading: false,
        handleButtonClick: jest.fn(),
    };
    it('onSearch when no value', () => {
        const value = '';

        customRender(<ExchangeVehiclesMaster {...props} typeData={('REL_TYPE', 'MONTH')} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} onSearch={jest.fn(value)} />);

        const editBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        act(() => {
            fireEvent.click(editBtn);
        });

        const searchImg = screen.getByRole('img', { name: 'search', exact: false });
        act(() => {
            fireEvent.click(searchImg);
        });
    });

    it('onSearch when there is value', () => {
        const value = 'CUS1687411157049';
        const userId = '1234';
        const defaultExtraParam = [
            {
                key: 'customerType',
                title: 'Customer Type',
                value: 'IND',
                canRemove: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
            },

            {
                key: 'searchType',
                title: 'Type',
                value: 'customerId',
                canRemove: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: value,
                canRemove: true,
            },
        ];
        const fetchCustomerList = jest.fn();

        fetchCustomerList({
            setIsLoading: jest.fn(),
            extraParams: defaultExtraParam,
            userId,
            onSuccessAction: jest.fn(),
            onErrorAction: jest.fn(),
        });

        customRender(<FormWrapper {...props} typeData={('REL_TYPE', 'MONTH')} setButtonData={jest.fn()} buttonData={defaultBtnVisiblity} onSearch={jest.fn(value)} onHandleChange={jest.fn()} />);

        const editBtn = screen.getByRole('button', { name: 'Edit', exact: false });
        act(() => {
            fireEvent.click(editBtn);
        });

        const custId = screen.getByRole('textbox', { name: 'Customer ID', exact: false });
        fireEvent.change(custId, { target: { value: 'CUS1687411157049' } });

        const searchImg = screen.getByRole('img', { name: 'search', exact: false });
        act(() => {
            fireEvent.click(searchImg);
        });
    });
});
