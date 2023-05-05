import { render, screen } from '@testing-library/react';
import { ListPinCodeMaster } from '../Geo/Pincode/ListPinCodeMaster';
import { qualificationMasterData, qualificationMasterData1 } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
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
        render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is the View Button Present or not', () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('Locality');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Please select city');
        InputFieldAvailablity('Please select state');
        buttonLookAndFireEventWithText('Cancel');
    });

    // test('Is table rendering data', async () => {
    //     render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} listShowLoading={listShowLoading} />);
    //     tablerender('Pin', 'ZHH')
    // });

    // test('Edit Functionality in Table', async () => {
    //     render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //     buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

    //     inputFieldLookAndtextChange('Please enter code', 'ZHJ', );
    //     inputFieldLookAndtextChange('Please enter name', 'ZHH')

    //     const inputCodelabel = await screen.findAllByText('Qualification Code');
    //     const Validations2 = await screen.findAllByText('Qualification Name');

    //     expect(inputCodelabel).toBeTruthy();
    //     expect(Validations2).toBeTruthy();

    //     buttonLookAndFireEventByRole('Save')
    // });

    test('Is search working', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchFunctionality('ZHJ');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Locality');
        InputFieldAvailablity('PIN Code');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        InputFieldAvailablity('Please select state');
        InputFieldAvailablity('Please select city');
    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListPinCodeMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please select state');
        InputFieldAvailablity('Please select city');
    }, 8000);

    // test('Save drawer element', async () => {
    //     const onFinish = jest.fn();
    //     render(<ListPinCodeMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);

    //     buttonLookAndFireEventWithText('Add')
    //     InputFieldAvailablity('Please select state');
    //     InputFieldAvailablity('Please select city');

    //     onFinish.mockResolvedValue({
    //         qualificationCode: 'ZHJ',
    //         qualificationName: 'ZHH',
    //     });

    //     const result = await onFinish();
    //     // fireEvent.click(SaveBtn);
    //     buttonLookAndFireEventWithText('Save');

    //     expect(result).toBeTruthy();
    //     expect(onFinish).toHaveBeenCalled();
    // });
});
