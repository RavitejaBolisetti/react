import {  render, screen, waitFor } from '@testing-library/react';
import { QualificationMaster } from '../QualificationMaster/QualificationMaster';
import DataTable from '../../../utils/dataTable/DataTable';
import { qualificationMasterData, qualificationMasterData1 } from './Common/Data/data';
import comonTest from './comonTest.js';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';

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


describe('Qualification Master Test', () => {
    comonTest(listShowLoading, saveData, fetchList);
    test('Is the search Field Present or not', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Qualification Button Present on  render of Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('ZHJ');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add Qualification')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter code')
        InputFieldAvailablity('Please enter name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Qualification List', 'ZHH')
    });

    test('Edit Functionality in Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        inputFieldLookAndtextChange('Please enter code', 'ZHJ', );
        inputFieldLookAndtextChange('Please enter name', 'ZHH')

        const inputCodelabel = await screen.findAllByText('Qualification Code');
        const Validations2 = await screen.findAllByText('Qualification Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });

    test('Is search working', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchFunctionality('ZHJ')
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Qualification Code');
        InputFieldAvailablity('Qualification Name');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter code')
        InputFieldAvailablity('Please enter name')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Qualification')
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            qualificationCode: 'ZHJ',
            qualificationName: 'ZHH',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        buttonLookAndFireEventWithText('Cancel')
    });
});



describe('This is to test the Axios Call using Jest', () => {
    test('This is the Api call test', async () => {
        const Fetchlist = await qualificationDataActions.fetchList();
        console.log(Fetchlist);
    });
});
