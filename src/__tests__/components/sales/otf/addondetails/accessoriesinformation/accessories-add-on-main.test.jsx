import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, render } from '@testing-library/react';
import AccessoriesAddonMain from 'components/Sales/OTF/AddOnDetails/AccessoriesInformation/AccessoriesAddonMain';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
  });  

const FormWrapper = (props) => {
    const [accessoryForm] = Form.useForm();

    const myFormMock={
        ...accessoryForm,
        validateFields: jest.fn().mockResolvedValue(props.searchData),
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    }
    return <AccessoriesAddonMain accessoryForm={myFormMock} {...props} />
}

const addOnItemInfo= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension", isDeleting: true}];

describe('Accessories Add On Component', () => {
    it('should render accessories add on component', async () => {
        customRender(<AccessoriesAddonMain />);
    });

    it('cancel button should work', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        customRender(<FormWrapper addOnItemInfo={addOnItemInfo} addButtonDisabled={addButtonDisabled} onCancel={jest.fn()} setsearchData={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const cancelBtn=screen.getByRole('button', { name:'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('edit and cancel button should work', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: false
        }

        customRender(<FormWrapper setsearchData={jest.fn()} addButtonDisabled={addButtonDisabled} addOnItemInfo={addOnItemInfo} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name:'Edit' });
        fireEvent.click(editBtn);
        const cancelBtn=screen.getByRole('button', { name:'Cancel' });
        fireEvent.click(cancelBtn);

        
    });

    it('save button should work if part number is already present', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: false
        }

        const searchData= {partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"};
        const isPresent=jest.fn().mockReturnValue(true);

        customRender(<FormWrapper isPresent={isPresent} searchData={searchData} setsearchData={jest.fn()} addButtonDisabled={addButtonDisabled} addOnItemInfo={addOnItemInfo} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name:'Edit' });
        fireEvent.click(editBtn);
        const saveBtn=screen.getByRole('button', { name:'Save' });
        fireEvent.click(saveBtn);
    });

    it('save button should work if type is not provided', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: false
        }

        const searchData= {partNumber:"HSN9605"};
        const isPresent=jest.fn().mockReturnValue(false);

        customRender(<FormWrapper isPresent={isPresent} showGlobalNotification={jest.fn()} searchData={searchData} setsearchData={jest.fn()} addButtonDisabled={addButtonDisabled} addOnItemInfo={addOnItemInfo} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name:'Edit' });
        fireEvent.click(editBtn);
        const saveBtn=screen.getByRole('button', { name:'Save' });
        fireEvent.click(saveBtn);
    });

    it('delete button should work', async () => {

        customRender(<FormWrapper addOnItemInfo={addOnItemInfo} setAddOnItemInfo={jest.fn()} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const deleteBtn=screen.getByRole('button', { name:'' });
        fireEvent.click(deleteBtn);
    });

    it('add button should work if part number is already present', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const searchData= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"}];

        render(<FormWrapper isPresent={jest.fn().mockReturnValue(true)} showGlobalNotification={jest.fn()} addOnItemInfo={searchData} onFinishFailed={jest.fn()} searchData={searchData} addButtonDisabled={addButtonDisabled} onSearchPart={jest.fn()} handlePartSearch={jest.fn()} handleOnSearch={jest.fn()} handleAccesoriesForm={jest.fn()} isBtnDisabled={false} />);
        const partNumber=screen.getByRole('textbox', { name: 'Part Number' });
        fireEvent.change(partNumber, { target: { value: 'HSN9605' }});
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name:'Add' });
        fireEvent.click(addBtn);
    });

});
