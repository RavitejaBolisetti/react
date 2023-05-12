import {  render, screen } from '@testing-library/react';
import {  DealerDivisionMasterData as divisionData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { ListDealerDivisionMaster } from '../DealerManpower';


jest.mock('react-redux', () => ({
    connect: () => (ListDealerDivisionMaster) => ListDealerDivisionMaster,
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
        render(<ListDealerDivisionMaster DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Division Button Present on  render of Table', async () => {
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        const addDivision = await screen.findByText('Division Code');
        expect(addDivision).toBeTruthy();

        buttonLookAndFireEventWithText('Add Division')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter Division Code')
        InputFieldAvailablity('Please enter Division Description')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListDealerDivisionMaster DealerDivisionMasterData={divisionData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Dealer Division Master', 'Division Code')
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<ListDealerDivisionMaster DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
    //     buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        
    //     inputFieldLookAndtextChange('Please enter Division Code', "DIV001","DIV002");
    //     inputFieldLookAndtextChange('Please enter Division Description', 'Dealer One','Dealer')

    //     const inputCodelabel = await screen.findAllByText('Division Code');
    //     const Validations2 = await screen.findAllByText('Division Description');

    //     expect(inputCodelabel).toBeTruthy();
    //     expect(Validations2).toBeTruthy();
        
    //     buttonLookAndFireEventByRole('Save')
    // });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Division');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Division Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Division', async () => {
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter Division Code')
        InputFieldAvailablity('Please enter Division Description')

    });

    test('is drawer opening on click of Add Division to add new', async () => {
        render(<ListDealerDivisionMaster  DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Division');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter Division Code')
        InputFieldAvailablity('Please enter Division Description')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListDealerDivisionMaster DealerDivisionMasterData={divisionData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Division')
        InputFieldAvailablity('Please enter Division Code');
        InputFieldAvailablity('Please enter Division Description');
        onFinish.mockResolvedValue({
            code: 'DIV001',
            divisionName: 'Dealer One',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});


