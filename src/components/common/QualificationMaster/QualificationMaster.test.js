import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { QualificationMaster } from './QualificationMaster';
import DataTable from '../../../utils/dataTable/DataTable';

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
// const  = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
const qualificationMasterData1 = [
    {
        qualificationMasterCode: 'Hello',
        qualificationMasterName: 'Name',
        status: 'Y',
    },
];
const qualificationMasterData = [
    {
        qualificationMasterCode: 'Hello',
        qualificationMasterName: 'Name',
        status: 'Y',
    },
    {
        qualificationMasterCode: 'smn',
        qualificationMasterName: 'FDG',
        status: 'Y',
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
    test('Is the search Field Present or not', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        const searchField = screen.findByPlaceholderText('Search');

        expect(searchField).toBeTruthy();
    });

    test('Is the Add Qualification Button Present or not', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        const addGrp = screen.findByText('Add Qualification');

        expect(addGrp).toBeTruthy();
    });

    test('Is table Rendering on Data', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        // const options = await screen.findByText('');
        // expect(options).toBeTruthy();
    });

    test('Is table present', async () => {
        render(<DataTable fetchList={fetchList} listShowLoading={listShowLoading} />);
        const Tablepresent = await screen.getByRole('table');
        // console.log(Tablepresent);

        expect(Tablepresent).toBeTruthy();
    });

    test('Is drawer opening on clicking edit', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const editBtn = await screen.getByLabelText('fi-edit', {exact:false});
        fireEvent.click(editBtn);
        const nameField = await screen.findByPlaceholderText('Please Enter Name');
        expect(nameField).toBeInTheDocument();
        expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    });
    
    //     test('Is drawer opening on clicking view', async () => {
    //         render(<QualificationMaster qualificationMasterData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //         const viewBtn = await screen.getByLabelText('ai-view');
    //         fireEvent.click(viewBtn);
    //         const nameField = await screen.findByPlaceholderText('Please Enter Name');
    //         expect(nameField).toBeInTheDocument();
    //         expect(screen.getByDisplayValue('Hello')).toHaveAttribute('disabled');
    //         expect(screen.getAllByRole('switch')[0]).toHaveAttribute('disabled');
    //     });

    // test('Is search working', async () => {
    //     render(<QualificationMaster qualificationMasterData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);

    //     const nameField = await screen.findByPlaceholderText('Search');
    //     const nameText = await screen.getAllByText('smn');
    //     fireEvent.change(nameField, { target: { value: 'FD' } });

    //     expect(nameText).toBeFalsy();
    // });

    // test('Is switch in table disabled', async () => {
    //     render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
    //     const switchBtn = screen.getAllByRole('switch')[0];
    //     expect(switchBtn).toHaveAttribute('disabled');
    // });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const nameField = screen.findByPlaceholderText('Please Enter Name');
        expect(nameField).toBeTruthy();
    });

    //     test('is drawer opening on click of Add Qualification', async () => {
    //         render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
    //         const addGroupBtn = await screen.findByText('Add Qualification');
    //         fireEvent.click(addGroupBtn);
    //         const InputFieldCode = await screen.findByPlaceholderText('Please Enter Code');
    //         const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');
    //         const Status = await screen.getByRole('switch', { name: 'Status' });

    //         expect(InputFieldCode.value).toBe('');
    //         expect(InputFieldName.value).toBe('');
    //         // expect(DefaultGroup).toHaveValue('Y');
    //         expect(DefaultGroup).toHaveAttribute('aria-checked', 'Y');
    //         expect(Status).toHaveAttribute('aria-checked', 'Y');

    //         // fireEvent.change(InputFieldCode, { target: { value: '' } });
    //         // fireEvent.change(InputFieldName, { target: { value: '' } });
    //         // fireEvent.click(DuplicateAllowed);
    //         // fireEvent.click(DuplicateAllowedunderdifferentParent);
    //         // fireEvent.click(ChildAllowed);
    //         // fireEvent.click(Status);
    //         // expect(DuplicateAllowed).not.toBeChecked();

    //         // const saveBtn = await screen.getByRole('button', { name: 'Save' });

    //         // fireEvent.click(saveBtn);
    //         // const Validations1 = await screen.findByText('Please Enter Criticality Group Id');
    //         // const Validations2 = await screen.findByText('Please Enter Criticality Group Name');
    //         // expect(Validations1).toBeTruthy();
    //         // expect(Validations2).toBeTruthy();
    //     }, 8000);
    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const Status = await screen.getByRole('switch', { name: 'Status' });
        expect(Status).not.toBeChecked();

        const saveBtn = await screen.getByText('Save');

        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Qualification Code');
        const Validations2 = screen.findByText('Please Enter Qualification Name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 8000);

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const InputFieldCode = await screen.getByPlaceholderText('Please Enter Code');
        const InputFieldName = await screen.getByPlaceholderText('Please Enter Name');
        const Status = await screen.getByRole('switch', { name: 'Status' });

        fireEvent.change(InputFieldCode, { target: { value: '1' } });
        fireEvent.change(InputFieldName, { target: { value: '2' } });
        fireEvent.change(InputFieldCode, { target: { value: '' } });
        fireEvent.change(InputFieldName, { target: { value: '' } });
        const saveBtn = await screen.getByText('Save');
        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Qualification Code');
        const Validations2 = screen.findByText('Please Enter Qualification Name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 20000);

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const cancelBtn = await screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
    });
});
