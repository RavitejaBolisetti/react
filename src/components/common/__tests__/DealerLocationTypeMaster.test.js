import { render, screen, waitFor } from '@testing-library/react';
import DataTable from 'utils/dataTable/DataTable';
import comonTest from './comonTest.js';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import { fetchList, saveData, listShowLoading } from './Common/CommonImports/commonImports';
import { DealerLocationType } from './../DealerManpower/DealerLocationTypeMaster/DealerLocationTypeMaster';
import { async } from 'sonarqube-scanner';

jest.mock('react-redux', () => ({
    connect: () => (DealerLocationType) => DealerLocationType,
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

describe('Location Type Master Test', () => {
    comonTest(listShowLoading, saveData, fetchList);
    test('Is the search Field Present or not', () => {
        render(<DealerLocationType />);
        searchFieldTest();
    });

    test('Is the Refresh Button Present or not', () => {
        render(<DealerLocationType />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });
    test('is drawer closing on click of cancel button', async () => {
        render(<DealerLocationType />);
        buttonLookAndFireEventWithText('Add Dealer Location');
        buttonLookAndFireEventWithText('Cancel');
    });
    test('View Functionality in Table', async () => {
        render(<DealerLocationType />);
        const textfield = await screen.findByText('Dealer Location Type');
        expect(textfield).toBeTruthy();

        InputFieldAvailablity('Location Type Code');
        InputFieldAvailablity('Location Type Description');
    });
    test('is drawer opening on click of Add Qualification', async () => {
        render(<DealerLocationType />);
        buttonLookAndFireEventWithText('Add Dealer Location');
        InputFieldAvailablity('Please enter Location Code');
        InputFieldAvailablity('Please enter Location Description');
    });
    test('View functionality', async () => {
        render(<DealerLocationType />);
        const viewfield = screen.findByText('Location Type Master');
        expect(viewfield).toBeTruthy();
    });
});
