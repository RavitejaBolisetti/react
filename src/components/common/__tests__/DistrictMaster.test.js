import {  render, screen } from '@testing-library/react';
import { ListDistrictMaster } from '../Geo/District/ListDistrictMaster';
import { District,DistrictData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';


jest.mock('react-redux', () => ({
    connect: () => (ListDistrictMaster) => ListDistrictMaster,
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
        render(<ListDistrictMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<ListDistrictMaster DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('District Code');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add District')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please select city')
        InputFieldAvailablity('Please select state')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListDistrictMaster DistrictData={District} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('List', 'District Code')
    });

    test('Edit Functionality in Table', async () => {
        render(<ListDistrictMaster DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        inputFieldLookAndtextChange('Please enter District Code', 'D3124', );
        inputFieldLookAndtextChange('Please enter District Name', 'Mandla')

        const inputCodelabel = await screen.findAllByText('District Code');
        const Validations2 = await screen.findAllByText('District Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });


    test('is drawer closing on click of cancel button', async () => {
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('State Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter District Code');
        InputFieldAvailablity('Please enter District Name');

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListDistrictMaster  DistrictData={District} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please select state')
        InputFieldAvailablity('Please select city')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListDistrictMaster DistrictData={District} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add District')
        InputFieldAvailablity('Please enter District Code');
        InputFieldAvailablity('Please enter District Name');
        onFinish.mockResolvedValue({
            districtCode: 'D3124',
            districtName: 'Mandla',
            stateName: 'Madhya Pradesh',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});

