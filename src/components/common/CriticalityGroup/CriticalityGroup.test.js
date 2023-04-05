import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { CriticalityGroup } from './CriticalityGroup';
import DataTable from '../../../utils/dataTable/DataTable';

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
const criticalityGroupData1 = [
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

describe('Criticality Group Test', () => {
    test('Is the search Field Present or not', () => {
        render(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        const searchField = screen.findByPlaceholderText('Search');

        expect(searchField).toBeTruthy();
    });

    test('Is the Add Group Button Present or not', () => {
        render(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        const addGrp = screen.findByText('Add Group');

        expect(addGrp).toBeTruthy();
    });

    test('Is table Rendering on Data', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const options = await screen.findByText('Hello');
        expect(options).toBeTruthy();
    });

    test('Is drawer opening on clicking edit', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const editBtn = await screen.getByLabelText('fa-edit');
        fireEvent.click(editBtn);
        const nameField = await screen.findByPlaceholderText('Please Enter Name');
        expect(nameField).toBeInTheDocument();
        expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    });

    test('Is drawer opening on clicking view', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        const viewBtn = await screen.getByLabelText('ai-view');
        fireEvent.click(viewBtn);
        const nameField = await screen.findByPlaceholderText('Please Enter Name');
        expect(nameField).toBeInTheDocument();
        expect(screen.getByDisplayValue('Hello')).toHaveAttribute('disabled');
        expect(screen.getAllByRole('switch')[0]).toHaveAttribute('disabled');
    });

    test('Is search working', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        
        const nameField = await screen.findByPlaceholderText('Search');
        const nameText = await screen.getByText('NONON');
        fireEvent.change(nameField, { target: { value: 'Hell' } });
       
        expect(nameText).toBeFalsy();
    });

    test('Is switch in table disabled', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const switchBtn = screen.getAllByRole('switch')[0];
        expect(switchBtn).toHaveAttribute('disabled');
    });

    test('is drawer opening on click of Add Group', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const nameField = screen.findByPlaceholderText('Please Enter Name');
        expect(nameField).toBeTruthy();
    });

    test('is drawer opening on click of Add Group', async () => {
        render(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const InputFieldCode = await screen.findByPlaceholderText('Please Enter Group Id');
        const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');
        const DefaultGroup = await screen.getByRole('switch', { name: 'Default Group?' });
        const Status = await screen.getByRole('switch', { name: 'Status' });

        expect(InputFieldCode.value).toBe('');
        expect(InputFieldName.value).toBe('');
        // expect(DefaultGroup).toHaveValue('Y');
        expect(DefaultGroup).toHaveAttribute('aria-checked', 'Y');
        expect(Status).toHaveAttribute('aria-checked', 'Y');

        // fireEvent.change(InputFieldCode, { target: { value: '' } });
        // fireEvent.change(InputFieldName, { target: { value: '' } });
        // fireEvent.click(DuplicateAllowed);
        // fireEvent.click(DuplicateAllowedunderdifferentParent);
        // fireEvent.click(ChildAllowed);
        // fireEvent.click(Status);
        // expect(DuplicateAllowed).not.toBeChecked();

        // const saveBtn = await screen.getByRole('button', { name: 'Save' });

        // fireEvent.click(saveBtn);
        // const Validations1 = await screen.findByText('Please Enter Criticality Group Id');
        // const Validations2 = await screen.findByText('Please Enter Criticality Group Name');
        // expect(Validations1).toBeTruthy();
        // expect(Validations2).toBeTruthy();
    }, 8000);
    test('is drawer opening on click of Add Group', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);

        // const InputFieldCode = await screen.findByPlaceholderText('Please Enter Group Id');
        // const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');
        const DefaultGroup = await screen.getByRole('switch', { name: 'Default Group?' });
        const Status = await screen.getByRole('switch', { name: 'Status' });

        fireEvent.click(DefaultGroup);
        expect(DefaultGroup).not.toBeChecked();
        expect(Status).not.toBeChecked();
        // fireEvent.click(Status);
        // expect(DefaultGroup).toHaveAttribute('aria-checked',"false");
        // expect(Status).toHaveAttribute('aria-checked',"false");
        const saveBtn = await screen.getByText('Save');

        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Criticality Group Id');
        const Validations2 = screen.findByText('Please Enter Criticality Group Name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 8000);

    test('is drawer opening on click of Add Group', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const InputFieldCode = await screen.getByPlaceholderText('Please Enter Group Id');
        const InputFieldName = await screen.getByPlaceholderText('Please Enter Name');
        const DefaultGroup = await screen.getByRole('switch', { name: 'Default Group?' });
        const Status = await screen.getByRole('switch', { name: 'Status' });
        const addTime = await screen.findByText('Add Time');
        fireEvent.change(InputFieldCode, { target: { value: '1' } });
        fireEvent.change(InputFieldName, { target: { value: '2' } });
        fireEvent.change(InputFieldCode, { target: { value: '' } });
        fireEvent.change(InputFieldName, { target: { value: '' } });
        fireEvent.click(addTime);
        const startTime = await screen.getByLabelText('Start Time');
        const endTime = await screen.getByLabelText('End Time');
        fireEvent.change(startTime, { target: { value: '07:00' } });
        fireEvent.change(endTime, { target: { value: '08:00' } });
        fireEvent.change(startTime, { target: { value: '' } });
        fireEvent.change(endTime, { target: { value: '' } });
        const saveBtn = await screen.getByText('Save');
        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Criticality Group Id');
        const Validations2 = screen.findByText('Please Enter Criticality Group Name');
        const Validations3 = screen.findByText('Missing Start Time');
        const Validations4 = screen.findByText('Missing End Time');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
        expect(Validations3).toBeTruthy();
        expect(Validations4).toBeTruthy();
    }, 20000);

    test('is drawer closing on click of cancel button', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const cancelBtn = await screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
        const options = await screen.findByText('Hello');
        expect(options).toBeTruthy();
    });

    test('is Allowed timing adding on clicking Add time', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const addTime = await screen.findByText('Add Time');
        fireEvent.click(addTime);
        const startTime = await screen.findByLabelText('Start Time');
        expect(startTime).toBeTruthy();
    });

    test('is end time timpicker rendering', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const addTime = await screen.findByText('Add Time');
        fireEvent.click(addTime);
        const endTime = await screen.findByLabelText('End Time');
        expect(endTime).toBeTruthy();
    });

    test('is end time close on  clicking close', async () => {
        render(<CriticalityGroup criticalityGroupData={criticalityGroupData} fetchData={fetchData} saveData={saveData} />);
        const addGroupBtn = await screen.getByText('Add Group');
        fireEvent.click(addGroupBtn);
        const addTime = await screen.getByText('Add Time');
        fireEvent.click(addTime);
        const endTime = await screen.getByLabelText('End Time');
        expect(endTime).toBeTruthy();
        const closeButton = await screen.getByLabelText('outline-close');
        fireEvent.click(closeButton);
        expect(endTime).not.toBeVisible();
        expect(closeButton).not.toBeVisible();
    });
});
