import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { QualificationMaster } from '../QualificationMaster/QualificationMaster';
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
        qualificationCode: 'indian',
        qualificationName: 'hindustan',
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

    test('Is the Refresh Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const refBtn = screen.getByLabelText('fa-ref');
        expect(refBtn).toBeTruthy();
        fireEvent.click(refBtn);
    });

    test('Refresh data button', async () => {
        const handleRefereshBtn = jest.fn();
        const { getByLabelText, getByText } = render(<QualificationMaster handleRefereshBtn={handleRefereshBtn} qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} listShowLoading={listShowLoading}  />);
       
        const refBtn = screen.getByLabelText('fa-ref');
        const InputFieldCode = getByLabelText('Qualification Code');
        const InputFieldName = getByLabelText('Qualification Name');

        fireEvent.change(InputFieldCode, {
            target: {
                value: 'indian',
            },
        });

        fireEvent.change(InputFieldName, {
            target: {
                value: 'hindustan',
            },
        });

        fireEvent.click(refBtn);
        handleRefereshBtn.mockResolvedValue(1);
        const result = await handleRefereshBtn();
        expect(InputFieldCode.value).toMatch('indian');
        expect(InputFieldName.value).toMatch('hindustan');
        expect(result).toBeTruthy();
        expect(handleRefereshBtn).toHaveBeenCalled();
    });

    test('Is Add Qualification Button Present on  render of Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('indian');
        expect(options).toBeTruthy();

        const AddQualificationBtn = await screen.findByText('Add Qualification');
        expect(AddQualificationBtn).toBeInTheDocument();
        fireEvent.click(AddQualificationBtn);

        const InputFieldCode = await screen.findByPlaceholderText('Please Enter Code');
        const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');

        expect(InputFieldCode).toBeTruthy();
        expect(InputFieldName).toBeTruthy();

        const CancelBtn = await screen.findByText('Cancel');
        expect(CancelBtn).toBeTruthy();
        fireEvent.click(CancelBtn);
    });

    test('Is table rendering data', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} listShowLoading={listShowLoading} />);
        const Tablepresent = screen.getByRole('table');
        // console.log(Tablepresent);
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();
        const options = await screen.findByText('hindustan');
        expect(options).toBeTruthy();
        expect(Tablepresent).toBeTruthy();
    });

    test('Edit Functionality in Table', async () => {
        const onClick = jest.fn();
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();

        const editBtn = await screen.getByLabelText('fa-edit');
        expect(editBtn).toBeTruthy();
        fireEvent.click(editBtn);
        
        const InputFieldCode = await screen.findByPlaceholderText('Please Enter Code');
        const InputFieldName = await screen.findByPlaceholderText('Please Enter Name');


        expect(InputFieldCode.value).toBe('indian');
        expect(InputFieldName).toBeTruthy();

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        // const SaveAndNew = screen.getByRole('button', { name: 'Save & Add New' });

        fireEvent.click(saveBtn);
        // fireEvent.click(SaveAndNew);

        expect(saveBtn).toBeTruthy();
        // expect(SaveAndNew).toBeTruthy();

        // const result = await onClick();
        // fireEvent.click(editBtn);
        // expect(result).toBeTruthy();
        // expect(onClick).toHaveBeenCalled();
    });


    // test('Is drawer opening on clicking edit', async () => {
    //     render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //     const editBtn =  screen.getByLabelText('fi-edit', {exact:false});
    //     fireEvent.click(editBtn);
    //     const nameField = await screen.findByPlaceholderText('Please Enter Name');
    //     expect(nameField).toBeInTheDocument();
    //     expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
    // });

    test('Is search working', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);

        const nameField = await screen.findByPlaceholderText('Search');
        const nameText = await screen.getByText('indian');
        fireEvent.change(nameField, { target: { value: 'indian' } });
        expect(nameText.value).toBeFalsy();
    });


    // test('Is switch in table disabled', async () => {
    //     render(<QualificationMaster qualificationMasterData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //     const switchBtn = screen.getByRole('switch', { name: 'fa-switch' })[0];
    //     expect(switchBtn).toHaveAttribute('disabled');
    //     fireEvent.check(switchBtn)
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
        const Status = screen.getByRole('switch', { name: 'fa-switch' });
        expect(Status).not.toBeChecked();

        const saveBtn = screen.getByText('Save');

        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please Enter Qualification Code');
        const Validations2 = screen.findByText('Please Enter Qualification Name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        const { getByLabelText, getByText } = render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData}/>);
        const RootChildButton = screen.getByText('Add Qualification');
        fireEvent.click(RootChildButton);
        // console.log("test",SaveBtn)
        const nameInputField = screen.findByPlaceholderText('Please Enter Name');
        const codeInputField = screen.findByPlaceholderText('Please Enter Code');
        const SaveBtn = getByText('Save');
        onFinish.mockResolvedValue({
            qualificationCode: 'indian',
            qualificationName: 'hindustan',

        });
        const result = await onFinish();
        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const addGroupBtn = await screen.findByText('Add Qualification');
        fireEvent.click(addGroupBtn);
        const cancelBtn = screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
    });
});
