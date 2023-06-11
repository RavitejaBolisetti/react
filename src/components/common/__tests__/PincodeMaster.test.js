import { render, screen } from '@testing-library/react';
import { ListPinCodeMaster } from '../Geo/Pincode/ListPinCodeMaster';
import { Pin } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, saveData, listShowLoading } from './Common/CommonImports/commonImports';

jest.mock('react-redux', () => ({
    connect: () => (ListPinCodeMaster) => ListPinCodeMaster,
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

describe('PIN Master Test', () => {
    test('Is the search Field Present or not', () => {
        render(<ListPinCodeMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest();
    });

    test('Is the Refresh Button Present or not', () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is the View Button Present or not', () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('Locality');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Please select city');
        InputFieldAvailablity('Please select state');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is table rendering data', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Pincode Master List', 'Locality');
    });

    test('Edit Functionality in Table', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit'); //click on edit button

        inputFieldLookAndtextChange('Please enter Tehsil Code', '483504', '412311');
        inputFieldLookAndtextChange('Please enter Tehsil Name', 'Murwara');

        const inputCodelabel = await screen.findAllByText('PIN Code');
        const Validations2 = await screen.findAllByText('Locality');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();

        buttonLookAndFireEventByRole('Save');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Locality');
        InputFieldAvailablity('PIN Code');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Pincode', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        InputFieldAvailablity('Please enter Pincode');
        InputFieldAvailablity('Please enter Locality');
    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter Pincode');
        InputFieldAvailablity('Please enter Locality');
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListPinCodeMaster PinData={Pin} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter Pincode');
        InputFieldAvailablity('Please enter Locality');
        onFinish.mockResolvedValue({
            pinCode: '483504',
            localityName: 'Murwara',
        });

        const result = await onFinish();

        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
