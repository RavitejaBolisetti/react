import {  fireEvent, queryByRole, render, screen } from '@testing-library/react';
import { TehsilData, Tehsil } from './Common/Data/data';
import { InputFieldAvailablity, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import {fetchList,saveData,listShowLoading} from './Common/CommonImports/commonImports';
import { ListTehsilMaster } from '../Geo/Tehsil/ListTehsilMaster';


jest.mock('react-redux', () => ({
    connect: () => (ListTehsilMaster) => ListTehsilMaster,
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
        render(<ListTehsilMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Button Present on  render of Table', async () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('Tehsil Code');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add Tehsil')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter Tehsil Code')
        InputFieldAvailablity('Please enter Tehsil Name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Tehsil List', 'Tehsil Code')
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
    //     buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

    //     inputFieldLookAndtextChange('Please enter Tehsil Code', 'T2412','T1324' );
    //     inputFieldLookAndtextChange('Please enter Tehsil Name', 'Barella')

    //     const inputCodelabel = await screen.findAllByText('Tehsil Code');
    //     const Validations2 = await screen.findAllByText('Tehsil Name');

    //     expect(inputCodelabel).toBeTruthy();
    //     expect(Validations2).toBeTruthy();
        
    //     buttonLookAndFireEventByRole('Save')
    // });

    // test('Is search working', async () => {
    //     render(<ListDistrictMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
    //     searchFunctionality('ZHJ')
    // });

    test('is drawer closing on click of cancel button', async () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Tehsil');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Status');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Status');
        InputFieldAvailablity('State Code');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add District');
        InputFieldAvailablity('Please enter Tehsil Code')
        InputFieldAvailablity('Please enter Tehsil Name')

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Tehsil');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter Tehsil Code')
        InputFieldAvailablity('Please enter Tehsil Name')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Tehsil')
        InputFieldAvailablity('Please enter Tehsil Code');
        InputFieldAvailablity('Please enter Tehsil Name');
        onFinish.mockResolvedValue({
            tehsilCode: 'T2412',
            tehsilName: 'Barella',
            districtName: 'Jabalpur',
        });

        const result = await onFinish();
      
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
    test('is drawer closing on click of cancel button', async () => {
        render(<ListTehsilMaster  TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
        const advanceFilter = await screen.findByTestId('Advance Filter');
        expect(advanceFilter).toBeInTheDocument();
        fireEvent.click(advanceFilter);

    });
    test('does not render the modal by default', () => {
       render(
            <ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />
        );
        const modal = screen.queryByRole('dialog');
        expect(modal).toBeNull();
});
test('is modal open on click advance search button', async () => {
    render(<ListTehsilMaster TehsilData={Tehsil} fetchList={fetchList} saveData={saveData} />);
    const advanceFilter = await screen.findByTestId('Advance Filter');
    expect(advanceFilter).toBeInTheDocument();
    fireEvent.click(advanceFilter);
    const modalOpen = screen.queryByRole('dialog');
    expect(modalOpen).toBeInTheDocument();
});


});

