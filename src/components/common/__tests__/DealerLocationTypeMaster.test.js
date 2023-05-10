import { render, screen } from '@testing-library/react';
import { DealerLocationTypeMasterData as dealerLocationTypeData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, saveData, listShowLoading } from './Common/CommonImports/commonImports';
import { ListDealerLocationTypeMaster } from '../DealerManpower';

jest.mock('react-redux', () => ({
    connect: () => (ListDealerLocationTypeMaster) => ListDealerLocationTypeMaster,
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
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is the View Button Present or not', () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Type Button Present on  render of Table', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        const addLocationn = await screen.findByText('Location Type Code');
        expect(addLocationn).toBeTruthy();

        buttonLookAndFireEventWithText('Add Type');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Please enter Location Type Code');
        InputFieldAvailablity('Please enter Location Type Description');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is table rendering data', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Dealer Location Type Master', 'Location Type Code');
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Type');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Location Type Code');

        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Type', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Type');
        InputFieldAvailablity('Please enter Location Type Code');
        InputFieldAvailablity('Please enter Location Type Description');
    });

    test('is drawer opening on click of Add Type to add new', async () => {
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Type');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter Location Type Code');
        InputFieldAvailablity('Please enter Location Type Description');
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListDealerLocationTypeMaster DealerLocationTypeMasterData={dealerLocationTypeData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Type');
        InputFieldAvailablity('Please enter Location Type Code');
        InputFieldAvailablity('Please enter Location Type Description');
        onFinish.mockResolvedValue({
            locationCode: 'A02',
            locationDescription: 'Agartala',
        });

        const result = await onFinish();

        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
