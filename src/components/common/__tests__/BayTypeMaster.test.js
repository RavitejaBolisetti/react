import {  render, screen } from '@testing-library/react';
import {  BayTypeMasterData as bayTypeData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { BayTypeMaster } from '../DealerManpower';


jest.mock('react-redux', () => ({
    connect: () => (BayTypeMaster) => BayTypeMaster,
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
        render(<BayTypeMaster BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Division Button Present on  render of Table', async () => {
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        const addDivision = await screen.findByText('Bay Type Code');
        expect(addDivision).toBeTruthy();

        buttonLookAndFireEventWithText('Add Division')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter Bay Type Code')
        InputFieldAvailablity('Please enter Bay Type Description')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<BayTypeMaster BayTypeMasterData={bayTypeData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Bay Type Master', 'Bay Type Code')
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Division');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Bay Type Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Division', async () => {
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter Bay Type Code')
        InputFieldAvailablity('Please enter Bay Type Description')

    });

    test('is drawer opening on click of Add Division to add new', async () => {
        render(<BayTypeMaster  BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Division');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter Bay Type Code')
        InputFieldAvailablity('Please enter Bay Type Description')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<BayTypeMaster BayTypeMasterData={bayTypeData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Type')
        InputFieldAvailablity('Please enter Bay Type Code')
        InputFieldAvailablity('Please enter Bay Type Description')
        onFinish.mockResolvedValue({
            code: 'COD3',
            name: 'CODE',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});


