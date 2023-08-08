import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import AccessoriesAddonMain from 'components/Sales/OTF/AddOnDetails/AccessoriesInformation/AccessoriesAddonMain';
import { Form } from 'antd';

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

describe('Accessories Add On Component', () => {
    it('should render accessories add on component', async () => {
        customRender(<AccessoriesAddonMain />);
    });

    it('cancel button should work', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const addOnItemInfo= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"}];

        customRender(<FormWrapper addOnItemInfo={addOnItemInfo} addButtonDisabled={addButtonDisabled} onCancel={jest.fn()} setsearchData={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const cancelBtn=screen.getByRole('button', { name:'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('edit and cancel button should work', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: false
        }

        const addOnItemInfo= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"}];

        customRender(<FormWrapper setsearchData={jest.fn()} addButtonDisabled={addButtonDisabled} addOnItemInfo={addOnItemInfo} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name:'Edit' });
        fireEvent.click(editBtn);
        const cancelBtn=screen.getByRole('button', { name:'Cancel' });
        fireEvent.click(cancelBtn);

        
    });

    it('save button should work', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: false
        }

        const searchData= {partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"};
        const addOnItemInfo= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"}];

        customRender(<FormWrapper searchData={searchData} setsearchData={jest.fn()} addButtonDisabled={addButtonDisabled} addOnItemInfo={addOnItemInfo} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name:'Edit' });
        fireEvent.click(editBtn);
        const saveBtn=screen.getByRole('button', { name:'Save' });
        fireEvent.click(saveBtn);
    });

    it('delete button should work', async () => {
        const addOnItemInfo= [{partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension", isDeleting: true}];

        customRender(<FormWrapper addOnItemInfo={addOnItemInfo} setAddOnItemInfo={jest.fn()} setisEditing={jest.fn()} setaddButtonDisabled={jest.fn()} />);
        const deleteBtn=screen.getByRole('button', { name:'' });
        fireEvent.click(deleteBtn);
    });

});
