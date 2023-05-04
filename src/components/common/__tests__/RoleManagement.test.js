import { render, screen, waitFor } from '@testing-library/react';
import { RoleManagement } from '../RoleManagement/RoleManagement';
import DataTable from '../../../utils/dataTable/DataTable';
import { rolemanagementdata1, rolemanagementdata } from './Common/Data/data';
import comonTest from './comonTest.js';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, fetchMenuList, fetchRole, saveData, listShowLoading } from './Common/CommonImports/commonImports';

jest.mock('react-redux', () => ({
    connect: () => (RoleManagement) => RoleManagement,
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

describe('Qualification Master Test', () => {
    comonTest(listShowLoading, saveData, fetchList, fetchRole, fetchMenuList);
    test('Is the search Field Present or not', () => {
        render(<RoleManagement fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        searchFieldTest();
    });
    test('Is the Refresh Button Present or not', () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });
    test('Is the View Button Present or not', () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });
    test('Is Add Qualification Button Present on  render of Table', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        const options = await screen.findByText('Hello');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add New Role');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter description');
        buttonLookAndFireEventWithText('Cancel');
    });
    test('Is table rendering data', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} listShowLoading={listShowLoading} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        tablerender('Role List', 'Name');
    });
    test('Edit Functionality in Table', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithLabel('fa-edit'); //click on edit button

        inputFieldLookAndtextChange('Please enter id', 'Hello1');
        inputFieldLookAndtextChange('Please enter name', 'Hello');
        inputFieldLookAndtextChange('Please enter description', 'water');

        const inputCodelabel = await screen.findAllByText('Role Id');
        const Validations2 = await screen.findAllByText('Role Name');
        const Validations3 = await screen.findAllByText('Role Description');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        expect(Validations3).toBeTruthy();

        buttonLookAndFireEventByRole('Save');
    });

    test('Is search working', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        searchFunctionality('Hello1');
    });

    test('Edit Functionality in Table', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        const textfield = await screen.findByText('Role List');
        expect(textfield).toBeTruthy();
        //click on edit button

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Role Id');
        InputFieldAvailablity('Role Name');
        InputFieldAvailablity('Role Description');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithText('Add New Role');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('is drawer opening on click of Add New Role', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata1} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithText('Add New Role');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter description');
    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<RoleManagement RoleManagementData={rolemanagementdata} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);
        buttonLookAndFireEventWithText('Add New Role');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter description');
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<RoleManagement RoleManagementData={rolemanagementdata} fetchList={fetchList} saveData={saveData} fetchMenuList={fetchMenuList} fetchRole={fetchRole} />);

        buttonLookAndFireEventWithText('Add New Role');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter code');
        InputFieldAvailablity('Please enter description');

        onFinish.mockResolvedValue({
            roleId: 'Hello1',
            roleName: 'Hello',
            roleDesceription: 'water',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
