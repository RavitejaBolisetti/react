import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { HierarchyAttribute } from '../HierarchyAttribute/HierarchyAttribute';
import comonTest from './comonTest.js';
import DataTable from '../../../utils/dataTable/DataTable';
import { EditIcon, ViewEyeIcon } from 'Icons';
import { InputFieldAvailablity, InputFieldAvailablityWithTextFilled, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';


jest.mock('react-redux', () => ({
    connect: () => (HierarchyAttribute) => HierarchyAttribute,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { },
        };
    };

const attributeData = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
const detailData = {
    hierarchyAttributeType: 'option 1',
    hierarchyAttribute: [
        {
            hierarchyAttribueCode: 'Shaka',
            hierarchyAttribueName: 'shaka',
            duplicateAllowedAtAttributerLevelInd: 'Y',
            duplicateAllowedAtOtherParent: 'N',
            isChildAllowed: 'Y',
            status: 'Y',
        },
    ],
};
const hierarchyAttributeFetchList = () => {
    return;
};
const hierarchyAttributeFetchDetailList = () => {
    return;
};
const onSaveShowLoading = () => {
    return;
};

describe('Hierarchy attributree test', () => {

    // comonTest(hierarchyAttributeFetchDetailList, hierarchyAttributeFetchList);
    comonTest(onSaveShowLoading, hierarchyAttributeFetchList, hierarchyAttributeFetchDetailList);
    test('Is the select Field Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = screen.getAllByText('option 1');
        expect(options).toBeTruthy();

    });
    test('Is searchfield Present or not', async () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = screen.getAllByText('option 1');
        searchFieldTest()
    });

    // test('Is table Rendering on Data', async () => {
    //     render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
    //     const selectfield = screen.getByRole('combobox');
    //     expect(selectfield).toBeTruthy();
    //     fireEvent.change(selectfield, { target: { value: 'option 1' } });
    //     tablerender('','shaka')
    // });

    test('Is Add Attribute Button Present on  render of Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        buttonLookAndFireEventWithText('Add Attribute');
        switchAvailablity('fi-switch');
        switchAvailablity('fi2-switch');
        switchAvailablity('fa-switch');
        switchAvailablity('fa2-switch');
        InputFieldAvailablity('Please enter code');
        InputFieldAvailablity('Please enter name');
        buttonLookAndFireEventWithText('Cancel');
    });


    test('Edit Functionality in Table', async () => {
            render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
            const selectfield = screen.getByRole('combobox', { name: '' });
            expect(selectfield).toBeTruthy();
            fireEvent.change(selectfield, { target: { value: 'option 1' } });

            buttonLookAndFireEventWithLabel('fa-edit')//click on edit button

            inputFieldLookAndtextChange('Please enter code', 'Shaka',);
            inputFieldLookAndtextChange('Please enter name', 'shaka')

            InputFieldAvailablity('Code');
            InputFieldAvailablity('Name');

            buttonLookAndFireEventByRole('Save')
        });
test('View Functionality in Table', async () => {
    render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const textfield = await screen.findByText('Hierarchy Attribute Type');
        expect(textfield).toBeTruthy();
        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Code');
        InputFieldAvailablity('Name');
        buttonLookAndFireEventByRole('Edit');
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
    //     const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
    //     expect(selectfield).toBeTruthy();
    //     fireEvent.change(selectfield, { target: { value: 'id' } });

    //     const EditButton = screen.getByTestId('Editicon');
    //     expect(EditButton).toBeTruthy();
    //     fireEvent.click(EditButton);
    //     const InputFieldCode = await screen.findByPlaceholderText('Please Input Code');
    //     const InputFieldName = await screen.findByPlaceholderText('Please Input Name');
    //     const DuplicateAllowed = screen.getByRole('switch', { name: 'Duplicate Allowed?' });
    //     const DuplicateAllowedunderdifferentParent = screen.getByRole('switch', { name: 'Duplicate Allowed under different Parent?' });
    //     const ChildAllowed = screen.getByRole('switch', { name: 'Child Allowed?' });
    //     const Status = screen.getByRole('switch', { name: 'Status' });

    //     expect(InputFieldCode.value).toBe('Shaka');
    //     expect(InputFieldName.value).toBe('shaka');
    //     expect(DuplicateAllowed).toBeChecked();
    //     expect(DuplicateAllowedunderdifferentParent).not.toBeChecked();
    //     expect(ChildAllowed).toBeChecked();
    //     expect(Status).toBeChecked();

    //     fireEvent.change(InputFieldCode, { target: { value: '' } });
    //     fireEvent.change(InputFieldName, { target: { value: '' } });
    //     fireEvent.click(DuplicateAllowed);
    //     fireEvent.click(DuplicateAllowedunderdifferentParent);
    //     fireEvent.click(ChildAllowed);
    //     fireEvent.click(Status);
    //     expect(DuplicateAllowed).not.toBeChecked();

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });

    //     fireEvent.click(saveBtn);
    //     fireEvent.click(EditButton);

    //     const Validations1 = await screen.findByText('Please Enter Code');
    //     const Validations2 = await screen.findByText('Please Enter Name');
    //     const saveAndNew = screen.getByRole('button', { name: 'Save and New' });

    //     expect(Validations1).toBeTruthy();
    //     expect(Validations2).toBeTruthy();
    //     expect(saveAndNew).toBeTruthy();
    // }, 60000);
});
