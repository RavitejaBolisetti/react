import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { HierarchyAttribute } from '../HierarchyAttribute/HierarchyAttribute';
import DataTable from '../../../utils/dataTable/DataTable';

jest.mock('react-redux', () => ({
    connect: () => (HierarchyAttribute) => HierarchyAttribute,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };

const attributeData = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
const detailData = {
    hierarchyAttribueId: 'option 1 ',
    hierarchyAttribute: [
        {
            hierarchyAttribueCode: 'Shaka',
            hierarchyAttribueName: 'shaka',
            duplicateAllowedAtAttributerLevelInd: 'Y',
            duplicateAllowedAtOtherParent: 'N',
            isChildAllowed: 'Y',
            status: 'Y',
            action: '',
        },
    ],
};
const hierarchyAttributeFetchList = () => {
    return;
};
const hierarchyAttributeFetchDetailList = () => {
    return;
};

describe('Hierarchy attributree test', () => {
    test('Is the select Field Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
    });
    test('Is Drop Down coming on click of select Field', async () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = screen.getAllByText('option 1');
        expect(options).toBeTruthy();
    });
    test('Is table Rendering on Data', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 7' } });
        const options = await screen.findAllByText('Shaka');
        expect(options).toBeTruthy();
    });
    test('Is Add Attribute Button Present on  render of Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = await screen.findAllByText('Shaka');
        expect(options).toBeTruthy();

        const AddAttributeBtn = await screen.findByText('Add Attribute');
        expect(AddAttributeBtn).toBeInTheDocument();
        fireEvent.click(AddAttributeBtn);

        const InputFieldCode = await screen.findByPlaceholderText('Please Input Code');
        const InputFieldName = await screen.findByPlaceholderText('Please Input Name');
        const DuplicateAllowed = await screen.getByRole('switch', { name: 'Duplicate Allowed?' });
        const DuplicateAllowedunderdifferentParent = await screen.getByRole('switch', { name: 'Duplicate Allowed under different Parent?' });
        const ChildAllowed = await screen.getByRole('switch', { name: 'Child Allowed?' });
        const Status = screen.getByRole('switch', { name: 'Status' });

        expect(InputFieldCode).toBeTruthy();
        expect(InputFieldName).toBeTruthy();
        expect(DuplicateAllowed).toBeTruthy();
        expect(DuplicateAllowedunderdifferentParent).toBeTruthy();
        expect(ChildAllowed).toBeTruthy();
        expect(Status).toBeTruthy();

        const CancelBtn = await screen.findByText('Cancel');
        expect(CancelBtn).toBeTruthy();
        fireEvent.click(CancelBtn);
    });
    test('Cancel Button Clicked on drawer', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });

        const AddAttributeBtn = await screen.findByText('Add Attribute');
        expect(AddAttributeBtn).toBeInTheDocument();
        fireEvent.click(AddAttributeBtn);
        const CancelBtn = await screen.findByText('Cancel');
        expect(CancelBtn).toBeTruthy();
        fireEvent.click(CancelBtn);
    });
    test('Edit Functionality in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'id' } });
        fireEvent.change(selectfield, { target: { value: 'option 2' } });

        const EditButton = screen.getByTestId('Editicon');
        expect(EditButton).toBeTruthy();
        fireEvent.click(EditButton);
        const InputFieldCode = await screen.findByPlaceholderText('Please Input Code');
        const InputFieldName = await screen.findByPlaceholderText('Please Input Name');
        const DuplicateAllowed = await screen.getByRole('switch', { name: 'Duplicate Allowed?' });
        const DuplicateAllowedunderdifferentParent = await screen.getByRole('switch', { name: 'Duplicate Allowed under different Parent?' });
        const ChildAllowed = await screen.getByRole('switch', { name: 'Child Allowed?' });

        expect(InputFieldCode.value).toBe('Shaka');
        expect(InputFieldName).toBeTruthy();
        expect(DuplicateAllowed).toBeTruthy();
        expect(DuplicateAllowedunderdifferentParent).toBeTruthy();
        expect(ChildAllowed).toBeTruthy();

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        const SaveAndNew = screen.getByRole('button', { name: 'Save and New' });

        fireEvent.click(saveBtn);
        fireEvent.click(SaveAndNew);

        expect(saveBtn).toBeTruthy();
        expect(SaveAndNew).toBeTruthy();
    });

    test('Edit Functionality in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'id' } });

        const EditButton = screen.getByTestId('Editicon');
        expect(EditButton).toBeTruthy();
        fireEvent.click(EditButton);
        const InputFieldCode = await screen.findByPlaceholderText('Please Input Code');
        const InputFieldName = await screen.findByPlaceholderText('Please Input Name');
        const DuplicateAllowed = screen.getByRole('switch', { name: 'Duplicate Allowed?' });
        const DuplicateAllowedunderdifferentParent = screen.getByRole('switch', { name: 'Duplicate Allowed under different Parent?' });
        const ChildAllowed = screen.getByRole('switch', { name: 'Child Allowed?' });
        const Status = screen.getByRole('switch', { name: 'Status' });

        expect(InputFieldCode.value).toBe('Shaka');
        expect(InputFieldName.value).toBe('shaka');
        expect(DuplicateAllowed).toBeChecked();
        expect(DuplicateAllowedunderdifferentParent).not.toBeChecked();
        expect(ChildAllowed).toBeChecked();
        expect(Status).toBeChecked();

        fireEvent.change(InputFieldCode, { target: { value: '' } });
        fireEvent.change(InputFieldName, { target: { value: '' } });
        fireEvent.click(DuplicateAllowed);
        fireEvent.click(DuplicateAllowedunderdifferentParent);
        fireEvent.click(ChildAllowed);
        fireEvent.click(Status);
        expect(DuplicateAllowed).not.toBeChecked();

        const saveBtn = screen.getByRole('button', { name: 'Save' });

        fireEvent.click(saveBtn);
        fireEvent.click(EditButton);

        const Validations1 = await screen.findByText('Please Enter Code');
        const Validations2 = await screen.findByText('Please Enter Name');
        const saveAndNew = screen.getByRole('button', { name: 'Save and New' });

        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
        expect(saveAndNew).toBeTruthy();
        
    }, 60000);
});
