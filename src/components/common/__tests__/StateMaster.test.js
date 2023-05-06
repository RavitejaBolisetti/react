import {  render, screen } from '@testing-library/react';
import { StateData, State } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { ListStateMaster } from '../Geo';


jest.mock('react-redux', () => ({
    connect: () => (ListStateMaster) => ListStateMaster,
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


describe('District Master Test', () => {
    test('Is the search Field Present or not', () => {
        render(<ListStateMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<ListStateMaster StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('State Code');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add State')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter State Code')
        InputFieldAvailablity('Please enter State Name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListStateMaster StateData={State} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('State List', 'State Code')
    });

    test('Edit Functionality in Table', async () => {
        render(<ListStateMaster StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        
        inputFieldLookAndtextChange('Please enter Tehsil Code', 'T2412','T1324' );
        inputFieldLookAndtextChange('Please enter Tehsil Name', 'Barella')

        const inputCodelabel = await screen.findAllByText('State Code');
        const Validations2 = await screen.findAllByText('State Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });

    // test('Is search working', async () => {
    //     render(<ListDistrictMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
    //     searchFunctionality('ZHJ')
    // });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add State');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('State Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter State Code')
        InputFieldAvailablity('Please enter State Name')

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListStateMaster  StateData={State} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add State');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter State Code')
        InputFieldAvailablity('Please enter State Name')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListStateMaster StateData={State} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add State')
        InputFieldAvailablity('Please enter State Code');
        InputFieldAvailablity('Please enter State Name');
        onFinish.mockResolvedValue({
            stateCode: '18',
            stateName: 'Manipur',
            countryName: 'India',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});

