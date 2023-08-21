import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/AddEditForm';
import { act } from 'react-dom/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

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

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        const edit = screen.getByRole('button', { name: 'Edit' });
        await act(async () => {
            fireEvent.click(edit);
        })

        const mnmCustomer = screen.getByRole('columnheader', { name: 'M&M Customer' });
        expect(mnmCustomer).toBeInTheDocument();  
        
        const customerName = screen.getByRole('columnheader', { name: 'Customer Name' });
        expect(customerName).toBeInTheDocument();  

        const relationship = screen.getByRole('columnheader', { name: 'Customer Name' });
        expect(relationship).toBeInTheDocument(); 

        const dob = screen.getByRole('columnheader', { name: 'Date of Birth' });
        expect(dob).toBeInTheDocument();

        const age = screen.getByRole('columnheader', { name: 'Age' });
        expect(age).toBeInTheDocument(); 

        const remark = screen.getByRole('columnheader', { name: 'Remark' });
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

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        const edit = screen.getByRole('button', { name: 'Edit' });
        await act(async () => {
            fireEvent.click(edit);
        })
    })
})