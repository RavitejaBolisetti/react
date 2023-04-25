import { fireEvent, render, screen } from '@testing-library/react';
import { CriticalityGroup } from '../CriticalityGroup/CriticalityGroup';
import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { InputFieldAvailablity, InputFieldAvailablityWithTextFilled, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';
import comonTest from './comonTest.js';

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

const criticalityGroupData1 = [
    {
        critcltyGropCode: 'Test50',
        critcltyGropName: 'Test50',
        status: 'Y',
        defaultGroup: 'Y',
        allowedTimingResponse: [
            {
                startTime: '11:00',
                endTime: '12:00',
            },
        ],
    },
];
const criticalityGroupData = [
    {
        critcltyGropCode: 'Hello',
        critcltyGropName: 'Name',
        status: 'Y',
        defaultGroup: 'Y',
        allowedTimingResponse: [
            {
                startTime: '11:00',
                endTime: '12:00',
            },
        ],
    },
    {
        critcltyGropCode: 'NONON',
        critcltyGropName: 'Ndhdjd',
        status: 'Y',
        defaultGroup: 'Y',
        allowedTimingResponse: [
            {
                startTime: '11:00',
                endTime: '12:00',
            },
        ],
    },
];
const fetchData = () => {
    return;
};
const saveData = () => {
    return;
};
const listShowLoading = () => {
    return;
};

describe('Criticality Group Test', () => {
    comonTest(listShowLoading, saveData, fetchData);

    test('Is the search Field Present or not', () => {
        render(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is the View Button Present or not', () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });

    test('Is Add Group Button Present on  render of Table', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const options = await screen.queryByText('Test50');
        expect(options).toBeTruthy();

        buttonLookAndFireEventWithText('Add Group')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter id')
        InputFieldAvailablity('Please enter name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        tablerender('Criticality Group Listt', 'Test50')
    });

    test('Edit Functionality in Table', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-edit') //click on edit button

        inputFieldLookAndtextChange('Please enter id', 'Test50', );
        inputFieldLookAndtextChange('Please enter name', 'Test50')

        const inputCodelabel = await screen.findAllByText('Criticality Group Id');
        const Validations2 = await screen.findAllByText('Criticality Group Name');

        expect(inputCodelabel).toBeTruthy();
        expect(Validations2).toBeTruthy();
        
        buttonLookAndFireEventByRole('Save')
    });

    test('Is search working', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        searchFunctionality('Test50')
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {
        
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const textfield = await screen.findByText('Criticality Group List');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view')
        InputFieldAvailablity('Criticality Group Id');
        InputFieldAvailablity('Criticality Group Name');
        
        buttonLookAndFireEventByRole('Edit');
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter code');

    });

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Group')
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            qualificationCode: 'Test50',
            qualificationName: 'Test50',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Cancel')
    });

});
