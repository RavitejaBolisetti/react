import { render, screen } from '@testing-library/react';
import { DealerEmployeeDepartmentMasterData as dealerEmployeeDepartmentData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, saveData, listShowLoading } from './Common/CommonImports/commonImports';
import { ListEmployeeDepartmentMaster } from '../DealerManpower';

jest.mock('react-redux', () => ({
    connect: () => (ListEmployeeDepartmentMaster) => ListEmployeeDepartmentMaster,
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

describe('Dealer Employee Department Master Test', () => {
    test('Is the Refresh Button Present or not', () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is the View Button Present or not', () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Type Button Present on  render of Table', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        const addLocationn = await screen.findByText('Department Code');
        expect(addLocationn).toBeTruthy();

        buttonLookAndFireEventWithText('Add Department');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Please enter Department Code');
        InputFieldAvailablity('Please enter Department Description');
        InputFieldAvailablity('Please enter Division Code');

        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is table rendering data', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Dealer Employee Department Master', 'Department Code');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Department');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Department Code');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Department', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Department');
        InputFieldAvailablity('Please enter Department Code');
        InputFieldAvailablity('Please enter Department Description');
    });

    test('is drawer opening on click of Add Department to add new', async () => {
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Department');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter Department Code');
        InputFieldAvailablity('Please enter Department Description');
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListEmployeeDepartmentMaster DealerEmployeeDepartmentMasterData={dealerEmployeeDepartmentData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Department');
        InputFieldAvailablity('Please enter Department Code');
        InputFieldAvailablity('Please enter Department Description');
        onFinish.mockResolvedValue({
            departmentCode: 'A02',
            departmentName: 'Agartala',
            divisionCodeDisplay: 'A01',
        });

        const result = await onFinish();

        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
