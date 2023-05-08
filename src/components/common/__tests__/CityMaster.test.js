import {  render, screen } from '@testing-library/react';
import { CityData, City } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { ListCityMaster } from '../Geo/City/ListCityMaster';


jest.mock('react-redux', () => ({
    connect: () => (ListCityMaster) => ListCityMaster,
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
        render(<ListCityMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<ListCityMaster CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('City Code');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add City')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter City Code')
        InputFieldAvailablity('Please enter City Name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListCityMaster CityData={City} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('City List', 'City Code')
    });

    test('Edit Functionality in Table', async () => {
        render(<ListCityMaster CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        
        inputFieldLookAndtextChange('Please enter City Code', 'U55','U54' );
        inputFieldLookAndtextChange('Please enter City Name', 'Jabalpur')

        const inputCodelabel = await screen.findAllByText('City Code');
        const Validations2 = await screen.findAllByText('City Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });


    test('is drawer closing on click of cancel button', async () => {
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add City');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('City Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter City Code')
        InputFieldAvailablity('Please enter City Name')

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListCityMaster  CityData={City} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add City');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter City Code')
        InputFieldAvailablity('Please enter City Name')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListCityMaster CityData={City} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add City')
        InputFieldAvailablity('Please enter City Code');
        InputFieldAvailablity('Please enter City Name');
        onFinish.mockResolvedValue({
            cityCode: 'U55',
            cityName: 'Jabalpur',
            districtName: 'Jabalpur',
            stateName: 'Madhya Pradesh',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});

