/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from "@testing-library/react";
import customRender from '@utils/test-utils';
import  { ContactMaster }  from 'components/Sales/VehicleDetail/Contacts/ContactMaster';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

// jest.mock('store/actions/auth', () => ({
//     __esModule: true,
//     authPostLogin: jest.fn().mockReturnValue((data) => (dispatch) => {
//         dispatch({ type: 'Action', payload: data });
//     })
// }));

const FormWrapper = (props) => {
    const [contactform] = Form.useForm()

    const myMock = {
        ...contactform,
        validateFields:jest.fn(),
        resetFields:jest.fn()
    };
    return <ContactMaster contactform={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});


describe("ContactMaster Component Should Render", ()=>{
    it("should render selectedRecordId and vehicleContactData",()=>{
        const mockStore = createMockStore({
            auth:{userId:'123' },
        });
        
        const vehicleContactData = {
            contact:[{name: "aman"}]
        }

        customRender(
            <Provider store={mockStore}>
                <ContactMaster selectedRecordId={'test123'} vehicleContactData={vehicleContactData} setContactData={jest.fn(vehicleContactData.contact)}/>
            </Provider>
        );
    })

    it("button should work in AddEditForm component", ()=>{
        const buttonData = {
            editBtn: true,
        }
        customRender(<FormWrapper  handleCollapse={jest.fn()}  handleButtonClick={jest.fn()} buttonData={buttonData} onSaveFormData={jest.fn} handleCancelFormEdit={jest.fn()} setButtonData={jest.fn()} isEditing={false} setShowAddEditForm={jest.fn(false)} 
         setIsEditing={jest.fn(false)} setEditingData={jest.fn({})} setIsAdding={jest.fn(false)}addBtnContactHandeler={jest.fn()} setContactData={jest.fn()} />);

        const plusImg = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })

    it('should render onSaveFormData when isEditing=true', ()=>{
        const props = {
            contactData:[{contactTypeName: "User", name: "user"}],
            styles:{},
            typeData:['VH_CONTACT_TYPE'],
            buttonData:{
                editBtn: true,
                saveBtn: true,
            },
            isAdding:false,
            isEditing:true,
            showAddEditForm:false,
            formActionType:{addMode: false, editMode: true, viewMode: false},
        }

        customRender(<FormWrapper {...props}
            handleCollapse={jest.fn()}
            handleButtonClick={jest.fn()}
            setButtonData={jest.fn()} 
            onSaveFormData={jest.fn()} 
            editContactHandeler={jest.fn()} 
            setIsEditing={jest.fn(true)} 
            setEditingData={jest.fn()} 
            setContactData={jest.fn()} 
        />);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const imgPlus = screen.getByRole('img', {name:'plus'});
        fireEvent.click(imgPlus);

        const mobileNumber = screen.getByRole('textbox', {name:'Mobile Number'});
        fireEvent.change(mobileNumber,{target:{value:'test1'}})

        const name = screen.getByRole('textbox', {name:'Name'});
        fireEvent.change(name,{target:{value:'test1'}})

        const email = screen.getByRole('textbox', {name:'E-mail'});
        fireEvent.change(email,{target:{value:'test1'}})

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    })

    it('should render onFinish func', ()=>{
        const buttonData = {
            editBtn: true,
            saveBtn:true
        }
        customRender(<FormWrapper  handleButtonClick={jest.fn()} buttonData={buttonData} onFinish={jest.fn()} onSuccess={jest.fn()} onError={jest.fn()} setButtonData={jest.fn()} showGlobalNotification={jest.fn()} setShowAddEditForm={jest.fn(false)} saveData={jest.fn()} setIsEditing={jest.fn(false)} setIsAdding={jest.fn(false)} setEditingData={jest.fn({})} onSuccessAction={jest.fn()} />);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn)

        const nameText = screen.getByRole('textbox', {name:'Name'});
        fireEvent.change(nameText, {target:{value:'test'}})

        const saveNextBtn = screen.getByRole('button', {name:'Save & Next'});
        fireEvent.click(saveNextBtn);
    })

    it('should render submit', ()=>{
        const buttonData = {
            editBtn: true,
            saveBtn:true
        }
        customRender(<FormWrapper  handleButtonClick={jest.fn()} buttonData={buttonData} onFinish={jest.fn()} onSuccess={jest.fn()} onError={jest.fn()} setButtonData={jest.fn()} showGlobalNotification={jest.fn()} setShowAddEditForm={jest.fn(false)} saveData={jest.fn()} setIsEditing={jest.fn(false)} setIsAdding={jest.fn(false)} setEditingData={jest.fn({})} onSuccessAction={jest.fn()} />);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn)

        const nameText = screen.getByRole('textbox', {name:'Name'});
        fireEvent.change(nameText, {target:{value:'test'}})

        const saveNextBtn = screen.getByRole('button', {name:'Save & Next'});
        fireEvent.submit(saveNextBtn);
    })

})

    


