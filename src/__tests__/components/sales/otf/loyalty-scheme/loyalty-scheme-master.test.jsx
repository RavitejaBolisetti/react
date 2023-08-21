import React from 'react';
import { screen, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from '@components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <LoyaltySchemeMaster form={form} {...props} />;
};

const formActionType = {
    addMode: false,
    editMode: true,
    viewMode: true
}

const formActionTypeAdd = {
    addMode: false,
    editMode: true,
    viewMode: false
}

const LoyaltySchemeData = [{
    id: "test", value: "test1"
}, {
    id: "test1", value: "test1"
}]

const props = {
    moduleTitle: 'test module title',
    isLoyaltySchemeDataLoaded: true,
    showGlobalNotification: true,
    onFinish: jest.fn(),
    handleButtonClick: jest.fn(),
    fetchList: jest.fn(),
    onErrorAction: jest.fn(),
    selectedOrderId: 'testid'
}

describe('OTF loyalty scheme master render', () => {
    const mockStore = createMockStore({
        auth: { userId: "123456" },
        data: {
            OTF: {
                LoyaltyScheme: { isLoaded: true, isLoading: true, data: LoyaltySchemeData },
            },
        },
    });

    it('should render loyalty view details', () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn}
                    {...props}
                    handleFormValueChange={jest.fn()}
                    formActionType={formActionType}
                />
            </Provider>
        );

        const customerId = screen.getByRole('columnheader', { name: 'Customer ID' });
        expect(customerId).toBeTruthy();

        const customerName = screen.getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeTruthy();

        const make = screen.getByRole('columnheader', { name: 'Make' });
        expect(make).toBeTruthy();

        const modelG = screen.getByRole('columnheader', { name: 'Model Group' });
        expect(modelG).toBeTruthy()

        const variant = screen.getByRole('columnheader', { name: 'Variant' });
        expect(variant).toBeTruthy()

        const oldReg = screen.getByRole('columnheader', { name: 'Old Reg. Number' });
        expect(oldReg).toBeTruthy()

        const oldChassis = screen.getByRole('columnheader', { name: 'Old Chassis Number' });
        expect(oldChassis).toBeTruthy()

        const dob = screen.getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeTruthy()

        const relationship = screen.getByRole('columnheader', { name: 'Relationship' });
        expect(relationship).toBeTruthy()

        const yearOfReg = screen.getByRole('columnheader', { name: 'Year of Registration' });
        expect(yearOfReg).toBeTruthy()

        const monthOfReg = screen.getByRole('columnheader', { name: 'Month of Registration' });
        expect(monthOfReg).toBeTruthy()

        const usage = screen.getByRole('columnheader', { name: 'Usage' });
        expect(usage).toBeTruthy()

        const schemeName = screen.getByRole('columnheader', { name: 'Scheme Name' });
        expect(schemeName).toBeTruthy()

        const schemeAmount = screen.getByRole('columnheader', { name: 'Scheme Amount' });
        expect(schemeAmount).toBeTruthy()

        const remarks = screen.getByRole('columnheader', { name: 'Remarks' });
        expect(remarks).toBeTruthy()
    })

    it('should render loyalty Add edit form', async () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn}
                    {...props}
                    handleFormValueChange={jest.fn()}
                    formActionType={formActionTypeAdd}
                />
            </Provider>
        );

        const customerId = screen.getByRole("textbox", { name: 'Customer ID', exact: false });
        fireEvent.change(customerId, { target: { value: 'tsetId' } });

        const customerName = screen.getByRole("textbox", { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: 'testName' } });

        const make = screen.getByRole("textbox", { name: 'Make', exact: false });
        fireEvent.change(make, { target: { value: 'make' } });

        const modelG = screen.getByRole("textbox", { name: 'Model Group', exact: false });
        fireEvent.change(modelG, { target: { value: 'test model' } });

        const variant = screen.getByRole("textbox", { name: 'Variant', exact: false });
        fireEvent.change(variant, { target: { value: 'variant' } });

        const oldReg = screen.getByRole("textbox", { name: 'Old Registration No', exact: false });
        fireEvent.change(oldReg, { target: { value: '44242' } });

        const oldChassis = screen.getByRole("textbox", { name: 'Old Chassis No', exact: false });
        fireEvent.change(oldChassis, { target: { value: '999999' } });

        const dob = screen.getByRole("textbox", { name: 'Date Of Birth', exact: false });
        fireEvent.change(dob, { target: { value: '999999' } });

        const relationship = screen.getByRole("textbox", { name: 'Relationship', exact: false });
        fireEvent.change(relationship, { target: { value: '999999' } });

        const yearsOfReg = screen.getByRole("textbox", { name: 'Year Of Registration', exact: false });
        fireEvent.change(yearsOfReg, { target: { value: '999999' } });

        const monthOfReg = screen.getByRole("textbox", { name: 'Month Of Registration', exact: false });
        fireEvent.change(monthOfReg, { target: { value: '999999' } });

        const usage = screen.getByRole("textbox", { name: 'Usage', exact: false });
        fireEvent.change(usage, { target: { value: '999999' } });

        const schemeName = screen.getByRole("textbox", { name: 'Scheme Name', exact: false });
        fireEvent.change(schemeName, { target: { value: '999999' } });

        const schemeAmount = screen.getByRole("textbox", { name: 'Scheme Amount', exact: false });
        fireEvent.change(schemeAmount, { target: { value: '999999' } });

        const remarks = screen.getByRole("textbox", { name: 'Remarks', exact: false });
        fireEvent.change(remarks, { target: { value: 'Remarks' } });

        const next = screen.getByRole("button", { name: 'Next', exact: false });
        fireEvent.click(next);
    });
})
