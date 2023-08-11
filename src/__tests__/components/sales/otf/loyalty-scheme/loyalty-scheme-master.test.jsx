import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from '@components/Sales/OTF/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

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
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn}
                    {...props}
                    handleFormValueChange={jest.fn()}
                    formActionType={formActionType}
                />
            </Provider>
        );

        const customerId = getByRole('columnheader', { name: 'Customer ID' });
        expect(customerId).toBeTruthy();

        const customerName = getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeTruthy();

        const make = getByRole('columnheader', { name: 'Make' });
        expect(make).toBeTruthy();

        const modelG = getByRole('columnheader', { name: 'Model Group' });
        expect(modelG).toBeTruthy()

        const variant = getByRole('columnheader', { name: 'Variant' });
        expect(variant).toBeTruthy()

        const oldReg = getByRole('columnheader', { name: 'Old Reg. Number' });
        expect(oldReg).toBeTruthy()

        const oldChassis = getByRole('columnheader', { name: 'Old Chassis Number' });
        expect(oldChassis).toBeTruthy()

        const dob = getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeTruthy()

        const relationship = getByRole('columnheader', { name: 'Relationship' });
        expect(relationship).toBeTruthy()

        const yearOfReg = getByRole('columnheader', { name: 'Year of Registration' });
        expect(yearOfReg).toBeTruthy()

        const monthOfReg = getByRole('columnheader', { name: 'Month of Registration' });
        expect(monthOfReg).toBeTruthy()

        const usage = getByRole('columnheader', { name: 'Usage' });
        expect(usage).toBeTruthy()

        const schemeName = getByRole('columnheader', { name: 'Scheme Name' });
        expect(schemeName).toBeTruthy()

        const schemeAmount = getByRole('columnheader', { name: 'Scheme Amount' });
        expect(schemeAmount).toBeTruthy()

        const remarks = getByRole('columnheader', { name: 'Remarks' });
        expect(remarks).toBeTruthy()
    })

    it('should render loyalty Add edit form', () => {
        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    setFormData={jest.fn}
                    {...props}
                    handleFormValueChange={jest.fn()}
                    formActionType={formActionTypeAdd}
                />
            </Provider>
        );

        const customerId = getByRole("textbox", { name: 'Customer ID', exact: false });
        fireEvent.change(customerId, { target: { value: 'tsetId' } });

        const customerName = getByRole("textbox", { name: 'Customer Name', exact: false });
        fireEvent.change(customerName, { target: { value: 'testName' } });

        const make = getByRole("textbox", { name: 'Make', exact: false });
        fireEvent.change(make, { target: { value: 'make' } });

        const modelG = getByRole("textbox", { name: 'Model Group', exact: false });
        fireEvent.change(modelG, { target: { value: 'test model' } });

        const variant = getByRole("textbox", { name: 'Variant', exact: false });
        fireEvent.change(variant, { target: { value: 'variant' } });

        const oldReg = getByRole("textbox", { name: 'Old Registration No', exact: false });
        fireEvent.change(oldReg, { target: { value: '44242' } });

        const oldChassis = getByRole("textbox", { name: 'Old Chassis No', exact: false });
        fireEvent.change(oldChassis, { target: { value: '999999' } });

        const dob = getByRole("textbox", { name: 'Date Of Birth', exact: false });
        fireEvent.change(dob, { target: { value: '999999' } });

        const relationship = getByRole("textbox", { name: 'Relationship', exact: false });
        fireEvent.change(relationship, { target: { value: '999999' } });

        const yearsOfReg = getByRole("textbox", { name: 'Year Of Registration', exact: false });
        fireEvent.change(yearsOfReg, { target: { value: '999999' } });

        const monthOfReg = getByRole("textbox", { name: 'Month Of Registration', exact: false });
        fireEvent.change(monthOfReg, { target: { value: '999999' } });

        const usage = getByRole("textbox", { name: 'Usage', exact: false });
        fireEvent.change(usage, { target: { value: '999999' } });

        const schemeName = getByRole("textbox", { name: 'Scheme Name', exact: false });
        fireEvent.change(schemeName, { target: { value: '999999' } });

        const schemeAmount = getByRole("textbox", { name: 'Scheme Amount', exact: false });
        fireEvent.change(schemeAmount, { target: { value: '999999' } });

        const remarks = getByRole("textbox", { name: 'Remarks', exact: false });
        fireEvent.change(remarks, { target: { value: 'Remarks' } });

        const next = getByRole("button", { name: 'Next', exact: false });
        fireEvent.click(next);

    });
})
