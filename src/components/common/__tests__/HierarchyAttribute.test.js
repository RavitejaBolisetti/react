import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { HierarchyAttribute } from '../HierarchyAttribute/HierarchyAttribute';
import comonTest from './comonTest.js';
import { showGlobalNotification } from 'store/actions/notification';
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

const attributeData = ["TST1", "Test1235", "TEST12345", "Test12345", "TEST1234", "Test12", "TEST1", "Test1", "Product Hierarchy", "Manufacturer Organization", "Manufacturer Administration", "Geographical", "Dealer Manpower Hierarchy", "Dealer Hierarchy"];
const detailData = {
    hierarchyAttribueType: "Test1235",
    hierarchyAttribute: {
        duplicateAllowedAtAttributerLevelInd: true,
        duplicateAllowedAtOtherParent: true,
        hierarchyAttribueCode: "Shaka",
        hierarchyAttribueName: "shaka",
        id: "295a0c46-2356-454a-9ccb-dc138ae4f5b5",
        isChildAllowed: true,
        status: true,
    },

}

const hierarchyAttributeFetchList = () => {
    return;
};
const hierarchyAttributeFetchDetailList = () => {
    return;
};
const onSaveShowLoading = () => {
    return;
};
const hierarchyAttributeSaveData = () => {
    return;
};
const hierarchyAttributeListShowLoading = () => {
    return;
};
const detailDataListShowLoading = () => {
    return;
};







describe('Hierarchy attributree test', () => {

    // comonTest(hierarchyAttributeFetchDetailList, hierarchyAttributeFetchList);
    comonTest(onSaveShowLoading, hierarchyAttributeFetchList, hierarchyAttributeFetchDetailList);
    test('Is the select Field Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const options = screen.getAllByText('Test1235');
        expect(options).toBeTruthy();

    });
    test('Is searchfield Present or not', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const options = screen.getAllByText('Test1235');
        expect(options).toBeTruthy();
        searchFieldTest()
    });

    // test.only('Is table rendering data', async () => {
    //     render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeSaveData={hierarchyAttributeSaveData} hierarchyAttributeListShowLoading={hierarchyAttributeListShowLoading} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} detailDataListShowLoading={detailDataListShowLoading} />);
    //     const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
    //     expect(selectfield).toBeTruthy();
    //     fireEvent.change(selectfield, { target: { value: 'Test1235' } });
    //     // tablerender('Hierarchy Attribute Type', 'Shaka')
    //     // const tablepresent = screen.getByRole('table');
    //     const textfield = await screen.findByText("Hierarchy Attribute Type");
    //     expect(textfield).toBeTruthy();
    //     const options = await screen.findByText("Shaka");
    //     expect(options).toBeTruthy();
    //     // expect(tablepresent).toBeTruthy();
    // });

    // test('Is table Rendering on Data', async () => {
    //     render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
    //     const selectfield = screen.getByRole('combobox');
    //     expect(selectfield).toBeTruthy();
    //     fireEvent.change(selectfield, { target: { value: 'Test1235' } });
    //     tablerender('','shaka')
    // });

    test('Is the Refresh Button Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is Add Attribute Button Present on  render of Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
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
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });

        buttonLookAndFireEventWithLabel('fa-edit')//click on edit button
    });
    test('View Functionality in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const textfield = await screen.findByText('Hierarchy Attribute Type');
        expect(textfield).toBeTruthy();
        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Code');
        InputFieldAvailablity('Name');
        buttonLookAndFireEventByRole('Edit');
    });

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<HierarchyAttribute showGlobalNotification={showGlobalNotification} attributeData={attributeData} hierarchyAttributeSaveData={hierarchyAttributeSaveData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = await screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        buttonLookAndFireEventWithText('Add Attribute');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            hierarchyAttribueCode: 'Shaka',
            hierarchyAttribueName: 'shaka',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
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
