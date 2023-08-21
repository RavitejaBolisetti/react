import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/AddEditForm';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

describe('Family Detail Master component', () => {
    it('should render the family detail master component', () => {
        customRender(<AddEditForm />);
    });


    it("should render the family detail master view form component", async () => {

        const props = {
            isVisible: true,
            isViewModeVisible: true,
            editedMode: true,
            setButtonData: jest.fn(),
            setCustomerType: jest.fn(),
            setEditedId: jest.fn(),
            setEditedMode: jest.fn(),
            setShowForm: jest.fn(),
            showForm: false,
            isSearchLoading: true,
            familyData: [{ id: 1, value: 'test' }, { id: 2, value: 'test1' }, { id: 3, value: 'test2' }],
            familyDetailList: [{ id: 1, value: 'test' }, { id: 2, value: 'test1' }, { id: 3, value: 'test2' }],
            relationData: [{
                id: "testId",
                key: "F",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            },{
                id: "testId",
                key: "F",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            }]
        }

        const { getByRole } = customRender(
            <AddEditForm
                {...props}
                onCancel={jest.fn()}
                onSave={jest.fn()}
                onSearch={jest.fn()}
                onFinishFailed={jest.fn()}
                onFinish={jest.fn()}
                handleFormValueChange={jest.fn()}
                onCollapseChange={jest.fn()}
                addFunction={jest.fn()}
                handleButtonClick={jest.fn()}
                onChange={jest.fn()}
            />
        );

        const plusAdd = getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        const edit = getByRole('button', { name: 'Edit' });
        await act(async () => {
            fireEvent.click(edit);
        })

        const mnmCustomer = getByRole('columnheader', { name: 'M&M Customer' });
        expect(mnmCustomer).toBeInTheDocument();  
        
        const customerName = getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeInTheDocument();  

        const relationship = getByRole('columnheader', { name: 'Customer Name' });
        expect(relationship).toBeInTheDocument(); 

        const dob = getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeInTheDocument();

        const age = getByRole('columnheader', { name: 'Age' });
        expect(age).toBeInTheDocument(); 

        const remark = getByRole('columnheader', { name: 'Remark' });
        expect(remark).toBeInTheDocument();

    })

    it("should render the family detail master add edit form component", async () => {

        const props = {
            isVisible: true,
            isViewModeVisible: false,
            editedMode: false,
            setButtonData: jest.fn(),
            setCustomerType: jest.fn(),
            setEditedId: jest.fn(),
            setEditedMode: jest.fn(),
            setShowForm: jest.fn(),
            showForm: false,
            isSearchLoading: true,
            familyData: [{ id: 1, value: 'test' }, { id: 2, value: 'test1' }, { id: 3, value: 'test2' }],
            familyDetailList: [{ id: 1, value: 'test' }, { id: 2, value: 'test1' }, { id: 3, value: 'test2' }],
            relationData: [{
                id: "testId",
                key: "F",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            },{
                id: "testId",
                key: "F",
                parentKey: "FAMLY_RELTN",
                value: "Father"
            }]
        }

        const { getByRole } = customRender(
            <AddEditForm
                {...props}
                onCancel={jest.fn()}
                onSave={jest.fn()}
                onSearch={jest.fn()}
                onFinishFailed={jest.fn()}
                onFinish={jest.fn()}
                handleFormValueChange={jest.fn()}
                onCollapseChange={jest.fn()}
                addFunction={jest.fn()}
                handleButtonClick={jest.fn()}
                onChange={jest.fn()}
            />
        );

        const plusAdd = getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        const edit = getByRole('button', { name: 'Edit' });
        await act(async () => {
            fireEvent.click(edit);
        })

        // const save = getByRole('button', { name: 'Save' });
        // await act(async () => {
        //     fireEvent.click(save);
        // })

        // const cancel = getByRole('button', { name: 'Cancel' });
        // await act(async () => {
        //     fireEvent.click(cancel);
        // })

       

    })
})