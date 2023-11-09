import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Mile/DealerParent/AddEditForm';
import { fireEvent, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [listFilterForm] = Form.useForm();

    const myFormMock = {
        ...listFilterForm,
        resetFields:jest.fn(),
    }
    return (<AddEditForm listFilterForm={myFormMock} {...props} />);
}

afterEach(() => {
    jest.restoreAllMocks();
});

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
};

const saveButtonName = 'Save';
const isLoadingOnSave = true;

describe('AddEditForm Component Render', ()=>{
    const props = {
        formActionType:{addMode: false, editMode: true, viewMode: false},
        isVisible:true,
        formData:[{name:"test"}],
        typeData: [{key: 1, value: "testing"}]
    }

    it('should render input box', ()=>{
        customRender(<FormWrapper {...props} setButtonData={jest.fn()} isVisible={true} buttonData={buttonData} saveButtonName={saveButtonName} isLoadingOnSave={isLoadingOnSave}/>);

        const groupCodeTextBox = screen.getByRole('textbox', {name:'Group Code'});
        fireEvent.change(groupCodeTextBox, {target:{value:'test1'}});

        const groupNameTextBox = screen.getByRole('textbox', {name:'Group Name'});
        fireEvent.change(groupNameTextBox, {target:{value:'test2'}});

        const ownerNameTextBox = screen.getByRole('textbox', {name:'Owner Name'});
        fireEvent.change(ownerNameTextBox, {target:{value:'test1'}});

        const contactNumberTextBox = screen.getByRole('textbox', {name:'Contact Number'});
        fireEvent.change(contactNumberTextBox, {target:{value:'test1'}});

        const emailIDTextBox = screen.getByRole('textbox', {name:'Email ID'});
        fireEvent.change(emailIDTextBox, {target:{value:'test1'}});

        const activeSwitch = screen.getByTestId('status');
        fireEvent.click(activeSwitch);
    })

    it('should render close btn',()=>{
        const tableData = [{name:"MAHINDRA LTD"},{name:"test"}];
        
        customRender(<FormWrapper {...props} onCloseAction={jest.fn()} setIsFormVisible={jest.fn()} setButtonData={jest.fn()} tableData={tableData} />)
        
        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    })

})