import {  render, screen, waitFor } from '@testing-library/react';
import { Switch, Table } from 'antd';
import { QualificationMaster } from '../QualificationMaster/QualificationMaster';
import DataTable from '../../../utils/dataTable/DataTable';
import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import comonTest from './comonTest.js';
import { InputFieldAvailablity, InputFieldAvailablityWithTextFilled, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
jest.mock('react-redux', () => ({
    connect: () => (HierarchyAttribute) => HierarchyAttribute,
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
// const  = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
const qualificationMasterData1 = [
    {
        qualificationCode: 'ZHJ',
        qualificationName: 'ZHH',
        status: 'Y',
    },
];
const qualificationMasterData = [
    {
        qualificationCode: 'Hello',
        qualificationName: 'Name',
        status: 'Y',
    },
    {
        qualificationCode: 'Hello',
        qualificationName: 'Name',
        status: 'N',
    },
];
const fetchList = () => {
    return;
};
const saveData = () => {
    return;
};
const listShowLoading = () => {
    return;
};

describe('Qualification Master Test', () => {
    comonTest(listShowLoading, saveData, fetchList);
    test('Is the search Field Present or not', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Qualification Button Present on  render of Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('ZHJ');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add Qualification')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter code')
        InputFieldAvailablity('Please enter name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Qualification List', 'ZHH')
    });

    test('Edit Functionality in Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        inputFieldLookAndtextChange('Please enter code', 'ZHJ', );
        inputFieldLookAndtextChange('Please enter name', 'ZHH')

        const inputCodelabel = await screen.findAllByText('Qualification Code');
        const Validations2 = await screen.findAllByText('Qualification Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });

    test('Is search working', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchFunctionality('ZHJ')
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save')

        InputFieldAvailablity('Please enter code')
        InputFieldAvailablity('Please enter name')

    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Qualification')
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            qualificationCode: 'ZHJ',
            qualificationName: 'ZHH',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Qualification');
        buttonLookAndFireEventWithText('Cancel')
    });
});

describe('This is to test the Axios Call using Jest', () => {
    test('This is the Api call test', async () => {
        const Fetchlist = await qualificationDataActions.fetchList();
        console.log(Fetchlist);
    });
});
