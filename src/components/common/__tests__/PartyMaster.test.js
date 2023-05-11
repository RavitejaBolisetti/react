import { render, screen } from '@testing-library/react';
// import { DealerLocationTypeMasterData as dealerLocationTypeData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, saveData, listShowLoading } from './Common/CommonImports/commonImports';
import { ListPartyMaster } from '../PartyMaster/ListPartyMaster';

jest.mock('react-redux', () => ({
    connect: () => (ListPartyMaster) => ListPartyMaster,
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

describe('Dealer Location Type Master Test', () => {
    test('Is the Refresh Button Present or not', () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is the View Button Present or not', () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Party Button Present on  render of Table', async () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        const addLocationn = await screen.findByText('Party List');
        expect(addLocationn).toBeTruthy();

        buttonLookAndFireEventWithText('Add Party');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('party code');
        InputFieldAvailablity('party name');
        InputFieldAvailablity('contact person name');
        InputFieldAvailablity('designation');
        InputFieldAvailablity('mobile number');
        InputFieldAvailablity('address');
        InputFieldAvailablity('pin code');
        InputFieldAvailablity('city');
        InputFieldAvailablity('tehsil');
        InputFieldAvailablity('district');
        InputFieldAvailablity('state');
        InputFieldAvailablity('mobile number');
        InputFieldAvailablity('alternate mobile number');
        InputFieldAvailablity('GSTIN number');
        InputFieldAvailablity('PAN');
        InputFieldAvailablity('part discount');
        InputFieldAvailablity('credit limit');

        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is table rendering data', async () => {
        render(<ListPartyMaster fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Party Master', 'Party Code', 'Party Category', 'Party Name');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Party');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Party Name');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('party name');
        InputFieldAvailablity('party code');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Type', async () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Party');
        InputFieldAvailablity('Please enter party name');
        InputFieldAvailablity('Please enter party code');
        InputFieldAvailablity('designation');
        InputFieldAvailablity('district');
        InputFieldAvailablity('state');
        InputFieldAvailablity('tehsil');
        InputFieldAvailablity('address');
    });

    test('is drawer opening on click of Add Party to add new', async () => {
        render(<ListPartyMaster fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Party');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter party name');
        InputFieldAvailablity('Please enter party code');
        InputFieldAvailablity('district');
        InputFieldAvailablity('address');
        InputFieldAvailablity('state');
    }, 8000);

    // test('Save drawer element', async () => {
    //     const onFinish = jest.fn();
    //     render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);

    //     buttonLookAndFireEventWithText('Add Type');
    //     InputFieldAvailablity('Please enter Location Type Code');
    //     InputFieldAvailablity('Please enter Location Type Description');
    //     onFinish.mockResolvedValue({
    //         locationCode: 'A02',
    //         locationDescription: 'Agartala',
    //     });

    //     const result = await onFinish();

    //     buttonLookAndFireEventWithText('Save');

    //     expect(result).toBeTruthy();
    //     expect(onFinish).toHaveBeenCalled();
    // });
});
