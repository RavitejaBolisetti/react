import { fireEvent, render, screen } from '@testing-library/react';
import { CriticalityGroup } from '../CriticalityGroup/CriticalityGroup';
import { criticalityDataActions } from 'store/actions/data/criticalityGroup';
import { InputFieldAvailablity, InputFieldAvailablityWithTextFilled, buttonLookAndFireEvent, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange, searchFieldTest, searchFunctionality, switchAvailablity, tablerender } from './Common/tableWithDrawer/common';

jest.mock('react-redux', () => ({
    connect: () => (HierarchyAttribute) => HierarchyAttribute,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () { },
            removeListener: function () { },
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
        critcltyGropCode: 'RCB',
        critcltyGropName: 'RCB1',
        status: 'N',
        defaultGroup: 'N',
        allowedTimingResponse: [
            {
                startTime: '12:00',
                endTime: '2:00',
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

    test('Is the search Field Present or not', () => {
        render(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        searchFieldTest()
    });

    test('Is the Refresh Button Present or not', () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });

    test('Is Add Group Button Present on  render of Table', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const options = await screen.queryByText('Test50');
        expect(options).toBeNull();

        buttonLookAndFireEventWithText('Add Group')
        switchAvailablity('fa-switch')
        InputFieldAvailablity('Please enter id')
        InputFieldAvailablity('Please enter name')
        buttonLookAndFireEventWithText('Cancel')

    });

    test('Is table rendering data', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        tablerender('Criticality Group List', 'Test50')
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
       
    //     const textfield = await screen.findByText('Criticality Group List');
    //     expect(textfield).toBeTruthy();

    //     buttonLookAndFireEventWithLabel('fa-edit');
    //     inputFieldLookAndtextChange('Please enter id', 'RCB', );
    //     inputFieldLookAndtextChange('Please enter name', 'RCB1')

    //     InputFieldAvailablity('Criticality Group Id');
    //     InputFieldAvailablity('Criticality Group Name');
    //     buttonLookAndFireEventByRole('Save')
    // });

    test('is drawer closing on click of cancel button', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('View Functionality in Table', async () => {

        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const textfield = await screen.findByText('Criticality Group List');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
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

    test('is Allowed timing adding on clicking Add time', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Add Time')
        const startTime = await screen.findByText('Start Time');
        expect(startTime).toBeTruthy();
    });

    test('is end time timpicker rendering', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Add Time');
        const endTime = await screen.findByText('End Time');
        expect(endTime).toBeTruthy();
    });
});
