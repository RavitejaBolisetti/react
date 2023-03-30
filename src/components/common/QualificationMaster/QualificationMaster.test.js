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
        qualificationMasterCode: 'indian',
        qualificationMasterName: 'hindustan',
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
        qualificationMasterCode: 'Hello',
        qualificationMasterName: 'Name',
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

    //f
    test('Is table Rendering on Data', async () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} listShowLoading={listShowLoading} qualificationData={qualificationMasterData1}/>);
        const textfield = await screen.findByText( 'Qualification Code');
        expect(textfield).toBeTruthy();
        const options = await screen.findByText('indian');
        expect(options).toBeTruthy();
    });

    test('Is table present', async () => {
        render(<QualificationMaster fetchList={fetchList} listShowLoading={listShowLoading} />);
        const Tablepresent = screen.getByRole('table');
        // console.log(Tablepresent);

        expect(Tablepresent).toBeTruthy();
    });

    // test('Edit Functionality in Table', async () => {
    //     render(<QualificationMaster {...qualificationMasterData} qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
    //     const selectfield = await screen.findByText('Qualification List');
    //     expect(selectfield).toBeTruthy();

    //     const EditButton = screen.getByTestId('Editicon');
    //     expect(EditButton).toBeTruthy();
    //     fireEvent.click(EditButton);
    //     const InputFieldCode = await screen.findByPlaceholderText('Please Enter Code');
    //     const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');
    

    //     expect(InputFieldCode.value).toBe('Shaka');
    //     expect(InputFieldName).toBeTruthy();

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });
    //     const SaveAndNew = screen.getByRole('button', { name: 'Save and New' });

    //     fireEvent.click(saveBtn);
    //     fireEvent.click(SaveAndNew);

    //     expect(saveBtn).toBeTruthy();
    //     expect(SaveAndNew).toBeTruthy();
    // });
    
    // test('Is drawer opening on clicking edit', async () => {
    //     render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //     const editBtn =  screen.getByLabelText('fi-edit', {exact:false});
    //     fireEvent.click(editBtn);
    //     const nameField = await screen.findByPlaceholderText('Please Enter Name');
    //     expect(nameField).toBeInTheDocument();
    //     expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    // });
    
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
    //     render(<QualificationMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);

    //     const nameField = await screen.findByPlaceholderText('Search');
    //     const nameText = screen.getByText('indian');
    //     fireEvent.change(nameField, { target: { value: 'indian' } });
    //     expect(nameText).toBeFalsy();
    // });


    // test('Is switch in table disabled', async () => {
    //     render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
    //     const switchBtn = screen.getAllByRole('switch')[0];
    //     expect(switchBtn).toHaveAttribute('disabled');
    // });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const nameField = screen.findByPlaceholderText('Please Enter Name');
        const nameField2 = screen.findByPlaceholderText('Please Enter Code');
        expect(nameField).toBeTruthy();
        expect(nameField2).toBeTruthy();
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const Status = screen.getByRole('switch', { name: 'Status' });
        expect(Status).not.toBeChecked();

        const saveBtn =  screen.getByText('Save');

        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Qualification Code');
        const Validations2 = screen.findByText('Please Enter Qualification Name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 8000);

    // test('is drawer opening on click of Add Qualification', async () => {
    //     render(<QualificationMaster qualificationMasterData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
    //     const addGroupBtn = await screen.findByText('Add Qualification');
    //     fireEvent.click(addGroupBtn);
    //     const InputFieldCode = await screen.getByPlaceholderText('Please Enter Code');
    //     const InputFieldName = await screen.getByPlaceholderText('Please Enter Name');
    //     const Status = await screen.getByRole('switch', { name: 'Status' });

    //     fireEvent.change(InputFieldCode, { target: { value: '1' } });
    //     fireEvent.change(InputFieldName, { target: { value: '2' } });
    //     fireEvent.change(InputFieldCode, { target: { value: '' } });
    //     fireEvent.change(InputFieldName, { target: { value: '' } });
    //     const saveBtn = await screen.getByText('Save');
    //     fireEvent.click(saveBtn);
    //     const Validations1 = screen.findByText('Please Enter Qualification Code');
    //     const Validations2 = screen.findByText('Please Enter Qualification Name');
    //     expect(Validations1).toBeTruthy();
    //     expect(Validations2).toBeTruthy();
    // }, 20000);

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const cancelBtn =  screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
    });
});
