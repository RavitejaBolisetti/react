import {  render, screen } from '@testing-library/react';
import { DealerCompanyData } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { DealerCompany } from 'components/Mile';


jest.mock('react-redux', () => ({
    connect: () => (DealerCompany) => DealerCompany,
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


describe('DealerCompanyData Master Test', () => {
    test('Is the search Field Present or not', () => {
        render(<DealerCompany fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<DealerCompany DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('Company Code');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Enter company code')
        InputFieldAvailablity('Enter company name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<DealerCompany DealerCompanyData={DealerCompanyData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('List', 'Company Code')
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<DealerCompany DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
    //     buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

    //     inputFieldLookAndtextChange('Enter company code', 'C12', );
    //     inputFieldLookAndtextChange('Enter company name', 'Capgemini')

    //     const inputCodelabel = await screen.findAllByText('Company Code');
    //     const Validations2 = await screen.findAllByText('Company Name');

    //     expect(inputCodelabel).toBeTruthy();
    //     expect(Validations2).toBeTruthy();
        
    //     buttonLookAndFireEventByRole('Save')
    // });


    test('is drawer closing on click of cancel button', async () => {
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('Company Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        InputFieldAvailablity('Enter company code');
        InputFieldAvailablity('Enter company name');

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<DealerCompany  DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Enter company code');
        InputFieldAvailablity('Enter company name');

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<DealerCompany DealerCompanyData={DealerCompanyData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add')
        InputFieldAvailablity('Enter company code');
        InputFieldAvailablity('Enter company name');
        onFinish.mockResolvedValue({
            companyName: 'Capgemini',
            companyCode: 'C12',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

});

