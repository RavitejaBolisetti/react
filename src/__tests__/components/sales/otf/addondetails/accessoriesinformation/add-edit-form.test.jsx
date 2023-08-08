import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import customRender from '@utils/test-utils';
import { screen, fireEvent, render, act } from '@testing-library/react';
import AddEditForm from 'components/Sales/OTF/AddOnDetails/AccessoriesInformation/AddEditForm';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [accessoryForm] = Form.useForm();

    const myFormMock={
        ...accessoryForm,
        validateFields: jest.fn().mockResolvedValue(props.searchData),
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    }
    return <AddEditForm accessoryForm={myFormMock} {...props} />
}

describe('Add Edit Form Component', () => {
    it('should render add edit form component', () => {
        customRender(<AddEditForm />);
    });

    it('add button should work if form submitted successfully', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const searchData= {partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"};
        const setAddOnItemInfo=jest.fn().mockReturnValue(searchData);

        render(<FormWrapper isPresent={jest.fn().mockReturnValue(false)} setsearchData={jest.fn()} setaddButtonDisabled={jest.fn()} setAddOnItemInfo={setAddOnItemInfo} showGlobalNotification={jest.fn()} addOnItemInfo={searchData} onFinishFailed={jest.fn()} searchData={searchData} addButtonDisabled={addButtonDisabled} onSearchPart={jest.fn()} handlePartSearch={jest.fn()} handleOnSearch={jest.fn()} handleAccesoriesForm={jest.fn()} isBtnDisabled={false} />);
        const partNumber=screen.getByRole('textbox', { name: 'Part Number' });
        fireEvent.change(partNumber, { target: { value: 'HSN9605' }});
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name:'Add' });
        fireEvent.click(addBtn);
    });

    it('add button should work if part number is already present', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const searchData= {partNumber:"HSN9605",type:"Suspension",sellingPrice:"900",mrp:"100000",quantity:"2",partDescription:"Suspension"};

        render(<FormWrapper isPresent={jest.fn().mockReturnValue(true)} showGlobalNotification={jest.fn()} addOnItemInfo={searchData} onFinishFailed={jest.fn()} searchData={searchData} addButtonDisabled={addButtonDisabled} onSearchPart={jest.fn()} handlePartSearch={jest.fn()} handleOnSearch={jest.fn()} handleAccesoriesForm={jest.fn()} isBtnDisabled={false} />);
        const partNumber=screen.getByRole('textbox', { name: 'Part Number' });
        fireEvent.change(partNumber, { target: { value: 'HSN9605' }});
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name:'Add' });
        await act(() => {
            fireEvent.click(addBtn);
        });
    });

    it('add button should work if part number not filled', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const searchData= {};

        render(<FormWrapper isPresent={jest.fn()} showGlobalNotification={jest.fn()} addOnItemInfo={searchData} onFinishFailed={jest.fn()} searchData={searchData} addButtonDisabled={addButtonDisabled} onSearchPart={jest.fn()} handlePartSearch={jest.fn()} handleOnSearch={jest.fn()} handleAccesoriesForm={jest.fn()} isBtnDisabled={false} />);
        const partNumber=screen.getByRole('textbox', { name: 'Part Number' });
        fireEvent.change(partNumber, { target: { value: 'HSN9605' }});
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name:'Add' });
        await act(() => {
            fireEvent.click(addBtn);
        });
    });

    it('add button should work if type not filled', async () => {
        const addButtonDisabled = { 
            partDetailsResponses: true
        }

        const searchData= {partNumber:"HSN9605"};

        render(<FormWrapper isPresent={jest.fn().mockReturnValue(false)} showGlobalNotification={jest.fn()} addOnItemInfo={searchData} onFinishFailed={jest.fn()} searchData={searchData} addButtonDisabled={addButtonDisabled} onSearchPart={jest.fn()} handlePartSearch={jest.fn()} handleOnSearch={jest.fn()} handleAccesoriesForm={jest.fn()} isBtnDisabled={false} />);
        const partNumber=screen.getByRole('textbox', { name: 'Part Number' });
        fireEvent.change(partNumber, { target: { value: 'HSN9605' }});
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name:'Add' });
        await act(() => {
            fireEvent.click(addBtn);
        });
    });
});
