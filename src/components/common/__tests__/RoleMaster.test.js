import {  render, screen } from '@testing-library/react';
import {  RoleMasterData as RoleData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { ListRoleMaster } from '../DealerManpower';


jest.mock('react-redux', () => ({
    connect: () => (ListRoleMaster) => ListRoleMaster,
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


describe('Dealer Division Master Test', () => {

    test('Is the Refresh Button Present or not', () => {
        render(<ListRoleMaster RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Division Button Present on  render of Table', async () => {
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        const addDivision = await screen.findByText('Role Code');
        expect(addDivision).toBeTruthy();

        buttonLookAndFireEventWithText('Add Role')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter Role Code')
        InputFieldAvailablity('Please enter Role Description')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListRoleMaster RoleMasterData={RoleData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Role Master', 'Role Code')
    });

    test('Edit Functionality in Table', async () => {
        render(<ListRoleMaster RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        
        inputFieldLookAndtextChange('Please enter Role Code', 'ROLE1');
        inputFieldLookAndtextChange('Please enter Role Description', 'ROLE ONE');

        const inputCodelabel = await screen.findAllByText('Role Code');
        const Validations2 = await screen.findAllByText('Role Description');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Role');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Role Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Division', async () => {
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Role');
        InputFieldAvailablity('Please enter Role Code')
        InputFieldAvailablity('Please enter Role Description')

    });

    test('is drawer opening on click of Add Division to add new', async () => {
        render(<ListRoleMaster  RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Role');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter Role Code')
        InputFieldAvailablity('Please enter Role Description')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListRoleMaster RoleMasterData={RoleData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Role')
        InputFieldAvailablity('Please enter Role Code')
        InputFieldAvailablity('Please enter Role Description')
        onFinish.mockResolvedValue({
           roleCode: 'ROLE1',
        roleDescription: 'ROLE ONE',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});


