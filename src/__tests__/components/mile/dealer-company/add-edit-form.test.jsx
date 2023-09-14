import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Mile/DealerCompany/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';


afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};


describe('Dealer company components', () => {
    it('Should render add edit form components', () => {
        const formActionType = { viewMode: false, editMode: true }
        const formData = { companyCode: "test", parentCode: "test", status: true }
        customRender(
            <FormWrapper isVisible={true} formData={formData} formActionType={formActionType} setButtonData={jest.fn()} handleFormValueChange={jest.fn()} />
        )

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'test' } })        

        const search = screen.getByRole('img', { name: 'search' });
        fireEvent.click(search);

        const groupCode = screen.getByRole('combobox', { name: 'Group Code' });
        fireEvent.change(groupCode, { target: { value: 'test' } })

        const groupName = screen.getByRole('textbox', { name: 'Group Name' });
        fireEvent.change(groupName, { target: { value: 'test' } })

        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });
        fireEvent.change(companyCode, { target: { value: 'test' } })

        const companyName = screen.getByRole('textbox', { name: 'Company Name' });
        fireEvent.change(companyName, { target: { value: 'test' } })

        const companyAddress = screen.getByRole('textbox', { name: 'Company Address' });
        fireEvent.change(companyAddress, { target: { value: 'test' } })

        const city = screen.getByRole('textbox', { name: 'City' });
        fireEvent.change(city, { target: { value: 'test' } })

        const tehsil = screen.getByRole('textbox', { name: 'Tehsil' });
        fireEvent.change(tehsil, { target: { value: 'test' } })

        const dist = screen.getByRole('textbox', { name: 'District' });
        fireEvent.change(dist, { target: { value: 'test' } })

        const state = screen.getByRole('textbox', { name: 'State' });
        fireEvent.change(state, { target: { value: 'test' } })

        const tin = screen.getByRole('textbox', { name: 'TIN' });
        fireEvent.change(tin, { target: { value: 'test' } })

        const tan = screen.getByRole('textbox', { name: 'TAN' });
        fireEvent.change(tan, { target: { value: 'test' } })

        const pan = screen.getByRole('textbox', { name: 'PAN' });
        fireEvent.change(pan, { target: { value: 'test' } })

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status)
    })


    it('Should render submit button', () => {
        const formActionType = { viewMode: false, editMode: true }
        const buttonData = { saveAndNewBtn: true, cancelBtn: true, closeBtn: true }
        const formData = { companyCode: "test", parentCode: "test", status: true }
        customRender(
            <FormWrapper isVisible={true} formData={formData} buttonData={buttonData} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} setButtonData={jest.fn()} handleFormValueChange={jest.fn()} formActionType={formActionType} />
        )

        const saveAnd = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveAnd);
    })

    it('Should render cancel button', () => {
        const formActionType = { viewMode: false, editMode: true }
        const buttonData = { saveAndNewBtn: true, cancelBtn: true, closeBtn: true }
        const formData = { companyCode: "test", parentCode: "test", status: true }
        customRender(
            <FormWrapper isVisible={true} formData={formData} buttonData={buttonData} handleButtonClick={jest.fn()} onCloseAction={jest.fn()} setButtonData={jest.fn()} handleFormValueChange={jest.fn()} formActionType={formActionType} />
        )

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    })

    it('Should render view components', () => {
        const formActionType = { viewMode: true }
        customRender(
            <AddEditForm isVisible={true} formActionType={formActionType} />
        )

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);
    })


});
