import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CancellationMaster } from '@components/Sales/OTF/OTFCancellation/CancellationMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [otfCancellationForm] = Form.useForm();
    const myFormMock = {
        ...otfCancellationForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <CancellationMaster form={myFormMock} {...props} />;
};

const otfData = {
    bookingAmount: 200,
    cpd: null,
    custExpectedDeliveryDate: '2023-07-27',
    customerType: 'IND',
    deliveryAt: 'HOM',
    exchange: 1,
    financeArrangedBy: 'SLF',
    id: 'testid',
    initialPromiseDeliveryDate: '2023-01-04',
    loyaltyScheme: 0,
    mitraName: null,
    mitraType: null,
    mobileNumber: '8096377837',
    modeOfPAyment: 'card',
    otfDate: null,
    otfNumber: 'OTF1690806304088',
    placeOfRegistration: 'Delhi',
    priceType: 'INDV',
    referral: 'Y',
    saleConsultant: 'Mahatma Gandhi',
    saleType: 'IGST',
    specialRequest: 'No',
    userProfilePicDocId: '',
};

const productHierarchyData = [
    {
        active: true,
        attributeKey: 'key',
        id: 'testid',
        mfgOrgSk: 'testDMS',
        parntProdctId: 'null',
        prodctCode: 'Test11',
        prodctLongName: 'subgrp',
        prodctShrtName: 'subgrp',
        subProdct: [
            {
                active: true,
                attributeKey: 'key',
                id: 'testid12',
                mfgOrgSk: 'testDMS',
                parntProdctId: 'null',
                prodctCode: 'Test11',
                prodctLongName: 'subgrp',
                prodctShrtName: 'subgrp',
                skuAttributes: [
                    {
                        adPhProductAttributeMstId: 'c5dae87b-6118-4228-8711-f08414050521',
                        code: 'ZENGINE_SUBGRP',
                        id: '4d9b8ad2-4ead-4904-9b2e-f9ce2e903863',
                        value: 'engine sub type',
                    },
                ],
            },
        ],
    },
    {
        active: true,
        attributeKey: 'key2',
        id: 'testid1',
        mfgOrgSk: 'testDMS',
        parntProdctId: 'null',
        prodctCode: 'Test11',
        prodctLongName: 'subgrp',
        prodctShrtName: 'subgrp',
        subProdct: [
            {
                active: true,
                attributeKey: 'key',
                id: 'testid122',
                mfgOrgSk: 'testDMS',
                parntProdctId: 'null',
                prodctCode: 'Test11',
                prodctLongName: 'subgrp',
                prodctShrtName: 'subgrp',
                skuAttributes: [
                    {
                        adPhProductAttributeMstId: 'c5dae87b-6118-4228-8711-f08414050521',
                        code: 'ZENGINE_SUBGRP',
                        id: '4d9b8ad2-4ead-4904-9b2e-f9ce2e903863',
                        value: 'engine sub type',
                    },
                ],
            },
        ],
    },
];

const data = [
    {
        cpd: null,
        customerName: 'Kalyan  Test',
        customerType: 'IND',
        mobileNumber: '8097976574',
        model: 'THRNMM83956427782',
        orderStatus: 'B',
        otfDate: 'null',
        otfNumber: 'OTF16904552723922',
        userProfilePicDocId: '',
    },
    {
        cpd: null,
        customerName: 'Kalyan  Test1',
        customerType: 'IND',
        mobileNumber: '8097976574',
        model: 'THRNMM8395642778',
        orderStatus: 'B',
        otfDate: 'null',
        otfNumber: 'OTF16904552723921',
        userProfilePicDocId: '',
    },
    {
        cpd: null,
        customerName: 'Kalyan  Test1',
        customerType: 'IND',
        mobileNumber: '8097976574',
        model: 'THRNMM83956427784',
        orderStatus: 'B',
        otfDate: 'null',
        otfNumber: 'OTF1690455272392',
        userProfilePicDocId: '',
    },
];

const dealerDataList = [
    {
        dealerName: 'testName',
        key: 1,
    },
    {
        dealerName: 'test DMS user',
        key: 2,
    },
    {
        dealerName: 'testName DMS user',
        key: 3,
    },
];

const buttonData = {
    allotBtn: true,
    cancelBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    closeBtn: false,
    deliveryNote: false,
    editBtn: false,
    formBtnActive: true,
    invoiceBtn: false,
    saveAndNewBtn: false,
    saveAndNewBtnClicked: false,
    saveBtn: true,
    transferOTFBtn: true,
    unAllotBtn: false,
};

const otfStatusList = [
    {
        desc: 'Booked',
        displayOnView: true,
        id: 1,
        key: 'O',
    },
    {
        desc: 'Booked1',
        displayOnView: true,
        id: 2,
        key: '2',
    },
    {
        desc: 'Booked2',
        displayOnView: true,
        id: 3,
        key: '3',
    },
];

const props = {
    CANCEL_ACTION: 'cancel_otf',
    otfData: otfData,
    selectedOrder: '',
    userId: '123',
    listShowLoading: false,
    uploadDocumentFile: jest.fn(),
    moduleTitle: 'title',
    setUploadedFile: jest.fn(),
    uploadedFile: undefined,
    fetchProductHierarchyList: jest.fn(),
    fetchOTFSearchedList: jest.fn(),
    fetchOTFDetail: jest.fn(),
    productHierarchyData: productHierarchyData,
    fetchDealerList: jest.fn(),
    dealerDataList: dealerDataList,
    searchDealerValue: dealerDataList,
    buttonData: buttonData,
    handleButtonClick: jest.fn(),
    isChangeHistoryData: [],
    onCloseAction: jest.fn(),
    titleOverride: 'Cancel OTF',
    otfStatusList: otfStatusList,
    onErrorAction: jest.fn(),
};

describe('OTF cancellation master render', () => {
    const mockStore = createMockStore({
        auth: { userId: 132, accessToken: 'testaccesstoken', token: 'testToken' },
        data: {
            ProductHierarchy: {
                isLoading: false,
                isLoaded: false,
                data: data,
            },
            ConfigurableParameterEditing: {
                filteredListData: {
                    OTF_SER: [{ key: 'customerName' }],
                },
            },
            SupportingDocument: {
                isLoaded: false,
                isLoading: false,
                data: data,
            },
            OTF: {
                OtfCancellation: data,
            },
        },
        notification: {
            message: null,
            notificationType: 'error',
            placement: null,
            showTitle: true,
            title: 'ERROR',
            visible: false,
        },
    });
    it('should render cancellation master add edit form', async () => {
        const handleCancellationReasonTypeChange = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} isVisible={true} onFinishOTFCancellation={jest.fn()} handleSelectTreeClick={jest.fn()} showGlobalNotification={jest.fn()} handleSelect={jest.fn()} handleFormValueChange={jest.fn()} onClick={jest.fn()} onDownload={jest.fn()} onSearchDealer={jest.fn()} onChange={(e) => handleCancellationReasonTypeChange(e)} />
            </Provider>
        );

        const close = screen.getByRole('button', { name: 'Close', exact: false });

        fireEvent.click(close);

        const uploadCancell = screen.getByRole('button', { name: 'Upload Cancellation Letter (File type should be png, jpg or pdf and max file size to be 5Mb) Upload File', exact: false });

        fireEvent.click(uploadCancell);

        const uploadFile = screen.getByRole('button', { name: 'Upload File', exact: false });
        fireEvent.change(uploadFile);

        const cancelOtf = screen.getByRole('button', { name: 'Cancel OTF', exact: false });
        fireEvent.click(cancelOtf);

        const cancel = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancel);

        const closeImg = screen.getByRole('img', { name: 'close', exact: false });
        expect(closeImg).toBeTruthy();

        const otfNo = screen.getByRole('columnheader', { name: 'OTF No.', exact: false });
        expect(otfNo).toBeTruthy();

        const otfDate = screen.getByRole('columnheader', { name: 'OTF Date', exact: false });
        expect(otfDate).toBeTruthy();

        const customerName = screen.getByRole('columnheader', { name: 'Customer Name', exact: false });
        expect(customerName).toBeTruthy();

        const mobileNo = screen.getByRole('columnheader', { name: 'Mobile No.', exact: false });
        expect(mobileNo).toBeTruthy();

        const model = screen.getByRole('columnheader', { name: 'Model', exact: false });
        expect(model).toBeTruthy();

        const order = screen.getByRole('columnheader', { name: 'Order Status', exact: false });
        expect(order).toBeTruthy();

        const reasonType = screen.getByRole('combobox', { name: 'Cancellation Reason Type', exact: false });
        fireEvent.change(reasonType, { target: { value: 'LOMMD' } });

        const reasonCancell = screen.getByRole('combobox', { name: 'Reason For Cancellation', exact: false });
        fireEvent.change(reasonCancell, { target: { value: 'testing for reason cancel' } });

        const cancelRemark = screen.getByRole('textbox', { name: 'Cancellation Remarks', exact: false });
        fireEvent.change(cancelRemark, { target: { value: 'tset' } });

        const uploadLetter = screen.getByRole('heading', { name: 'Upload Cancellation Letter', exact: false });
        expect(uploadLetter).toBeTruthy();
    });
});
