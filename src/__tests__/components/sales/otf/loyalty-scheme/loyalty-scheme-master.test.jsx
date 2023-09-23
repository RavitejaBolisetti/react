
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from 'components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';
import { OTFFormButton } from 'components/Sales/OTF/OTFFormButton';


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
    }
    return <LoyaltySchemeMaster form={myForm} {...props} />;
};

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
    it('should render loyalty scheme add edit from details', () => {

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
                <FormWrapper
                    StatusBar={"test"}
                    FormActionButton={FormActionButton}
                    fetchList={fetchList}
                    buttonData={buttonData}
                    setButtonData={jest.fn()}
                />
            </Provider>
        )

        const combobox = screen.getByRole('combobox', { name: '', exact: false });
        fireEvent.change(combobox, { target: { value: 'testing' } });

        const make = screen.getByRole('combobox', { name: 'Make', exact: false });
        fireEvent.change(make, { target: { value: 'make' } });

        const modelG = screen.getByRole('combobox', { name: 'Model Group', exact: false });
        fireEvent.change(modelG, { target: { value: 'test model' } });

        const variant = screen.getByRole('combobox', { name: 'Variant', exact: false });
        fireEvent.change(variant, { target: { value: 'variant' } });
        
        const usage = screen.getByRole('combobox', { name: 'Usage', exact: false });
        fireEvent.change(usage, { target: { value: 'variant' } });

        const yearOfReg = screen.getByRole('combobox', { name: 'Year of Registration', exact: false });
        fireEvent.change(yearOfReg, { target: { value: 'variant' } });

        const monthOfReg = screen.getByRole('combobox', { name: 'Month of Registration', exact: false });
        fireEvent.change(monthOfReg, { target: { value: 'variant' } });

        const relationship = screen.getByRole('combobox', { name: 'Relationship', exact: false });
        fireEvent.change(relationship, { target: { value: '999999' } });

        const schemeName = screen.getByRole('combobox', { name: 'Scheme Name', exact: false });
        fireEvent.change(schemeName, { target: { value: 'variant' } });

        const oldRegNumber = screen.getByRole('textbox', { name: 'Old Reg. Number', exact: false });
        fireEvent.change(oldRegNumber, { target: { value: 'variant' } });

        const oldChassisNumber = screen.getByRole('textbox', { name: 'Old Chassis Number', exact: false });
        fireEvent.change(oldChassisNumber, { target: { value: 'variant' } });

        const remark = screen.getByRole('textbox', { name: 'Remarks', exact: false });
        fireEvent.change(remark, { target: { value: 'variant' } });

        const customerName = screen.getByRole('textbox', { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: 'variant' } });

        const schemeAmount = screen.getByRole('textbox', { name: 'Scheme Amount', exact: false });
        fireEvent.change(schemeAmount, { target: { value: 'testName' } });

        const submitBtn = screen.getByRole('button', { name: 'Save', exact: false })
        fireEvent.click(submitBtn)

    })

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
        const fetchSchemeLovList = jest.fn();

        

        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    StatusBar={"test"}
                    FormActionButton={FormActionButton}
                    fetchList={fetchList}    
                    buttonData={buttonData}
                    setButtonData={jest.fn()}
                />
            </Provider>
        )

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search', exact: false })
        fireEvent.click(searchBtn)

    })
})























// import React from 'react';
// import { screen, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { LoyaltySchemeMaster } from 'components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
// import customRender from '@utils/test-utils';
// import { Form, Button } from 'antd';
// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import { rootReducer } from 'store/reducers';

// const StatusBar = () => <div>No Status Bar</div>;

// const FormActionButton = () => (
//     <div>
//         <Button htmlType="submit" type="primary">
//             Save
//         </Button>
//     </div>
// );

// export const createMockStore = (initialState) => {
//     const mockStore = configureStore({
//         reducer: rootReducer,

//         preloadedState: initialState,

//         middleware: [thunk],
//     });

//     return mockStore;
// };

// afterEach(() => {
//     jest.restoreAllMocks();
// });

// const FormWrapper = (props) => {
//     const [form] = Form.useForm();
//     return <LoyaltySchemeMaster form={form} {...props} />;
// };

// const formActionType = {
//     addMode: false,
//     editMode: true,
//     viewMode: true,
// };

// const formActionTypeAdd = {
//     addMode: false,
//     editMode: true,
//     viewMode: false,
// };

// const LoyaltySchemeData = [
//     {
//         id: 'test',
//         value: 'test1',
//     },
//     {
//         id: 'test1',
//         value: 'test1',
//     },
// ];

// const props = {
//     moduleTitle: 'test module title',
//     isLoyaltySchemeDataLoaded: true,
//     showGlobalNotification: true,
//     onFinish: jest.fn(),
//     handleButtonClick: jest.fn(),
//     fetchList: jest.fn(),
//     onErrorAction: jest.fn(),
//     selectedOrderId: 'testid',
// };

// describe('Booking loyalty scheme master render', () => {
//     const mockStore = createMockStore({
//         auth: { userId: '123456' },
//         data: {
//             OTF: {
//                 LoyaltyScheme: { isLoaded: true, isLoading: true, data: LoyaltySchemeData, LoyaltySchemeData: LoyaltySchemeData },
//             },
//         },
//     });

//     it('should render loyalty view details', () => {
//         customRender(
//                 <FormWrapper setFormData={jest.fn} StatusBar={StatusBar} FormActionButton={FormActionButton} {...props} handleFormValueChange={jest.fn()} formActionType={formActionType} />

//         );

//         const customerName = screen.getByRole('columnheader', { name: 'Customer Name' });
//         expect(customerName).toBeTruthy();

//         const make = screen.getByRole('columnheader', { name: 'Make' });
//         expect(make).toBeTruthy();

//         const modelG = screen.getByRole('columnheader', { name: 'Model Group' });
//         expect(modelG).toBeTruthy();

//         const variant = screen.getByRole('columnheader', { name: 'Variant' });
//         expect(variant).toBeTruthy();

//         const oldReg = screen.getByRole('columnheader', { name: 'Old Reg. Number' });
//         expect(oldReg).toBeTruthy();

//         const oldChassis = screen.getByRole('columnheader', { name: 'Old Chassis Number' });
//         expect(oldChassis).toBeTruthy();

//         const dob = screen.getByRole('columnheader', { name: 'Date of Birth' });
//         expect(dob).toBeTruthy();

//         const relationship = screen.getByRole('columnheader', { name: 'Relationship' });
//         expect(relationship).toBeTruthy();

//         const yearOfReg = screen.getByRole('columnheader', { name: 'Year of Registration' });
//         expect(yearOfReg).toBeTruthy();

//         const monthOfReg = screen.getByRole('columnheader', { name: 'Month of Registration' });
//         expect(monthOfReg).toBeTruthy();

//         const usage = screen.getByRole('columnheader', { name: 'Usage' });
//         expect(usage).toBeTruthy();

//         const schemeName = screen.getByRole('columnheader', { name: 'Scheme Name' });
//         expect(schemeName).toBeTruthy();

//         const schemeAmount = screen.getByRole('columnheader', { name: 'Scheme Amount' });
//         expect(schemeAmount).toBeTruthy();

//         const remarks = screen.getByRole('columnheader', { name: 'Remarks' });
//         expect(remarks).toBeTruthy();
//     });

//     it('should render loyalty Add edit form', async () => {
//         customRender(
//                 <FormWrapper setFormData={jest.fn} StatusBar={StatusBar} FormActionButton={FormActionButton} {...props} handleFormValueChange={jest.fn()} formActionType={formActionTypeAdd} />
//         );

//         const search = screen.getByPlaceholderText('Search');
//         fireEvent.change(search, { target: { value: 'tsetId' } });

//         const customerName = screen.getByRole('textbox', { name: 'Customer Name', exact: false });
//         fireEvent.change(customerName, { target: { value: 'testName' } });

//         const make = screen.getByRole('combobox', { name: 'Make', exact: false });
//         fireEvent.change(make, { target: { value: 'make' } });

//         const modelG = screen.getByRole('combobox', { name: 'Model Group', exact: false });
//         fireEvent.change(modelG, { target: { value: 'test model' } });

//         const variant = screen.getByRole('combobox', { name: 'Variant', exact: false });
//         fireEvent.change(variant, { target: { value: 'variant' } });

//         const relationship = screen.getByRole('combobox', { name: 'Relationship', exact: false });
//         fireEvent.change(relationship, { target: { value: '999999' } });

//         const imgClick = screen.getByRole('img', { name: 'close-circle' });
//         fireEvent.click(imgClick);
//     });

//     it('Should render loyalty scheme submit button', () => {
//         const buttonData = {
//             changeHistory: true,
//             cancelBtn: true,
//             saveBtn: true,
//             saveAndNewBtn: true,
//             editBtn: true,
//             cancelOTFBtn: true,
//             transferOTFBtn: true,
//             formBtnActive: true,
//             saveAndNewBtnClicked: false,
//         };

//         const formData = {
//             id: 123,
//             schemeAmount: '100',
//             schemeCode: '7657',
//             relationship: 'test',
//             customerName: 'test',
//         };

//         customRender(
//                 <FormWrapper setFormData={jest.fn} StatusBar={StatusBar} FormActionButton={FormActionButton} {...props} handleFormValueChange={jest.fn()} formActionType={formActionTypeAdd} buttonData={buttonData} saveButtonName={'Save & Next'} setButtonData={jest.fn()} setEditable={jest.fn()} onFinish={jest.fn()} setformData={jest.fn()} handleFilterChange={jest.fn()} formData={formData} />
//         );

//         const saveNext = screen.getByRole('button', { name: 'Save & Next' });
//         fireEvent.click(saveNext);

//         const changeHistory = screen.getByRole('button', { name: 'Change History' });
//         fireEvent.click(changeHistory);

//         const cancel = screen.getByRole('button', { name: 'Cancel' });
//         fireEvent.click(cancel);
//     });
// });
