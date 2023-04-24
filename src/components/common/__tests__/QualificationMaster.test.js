import { fireEvent, getAllByLabelText, getAllByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Switch, Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { QualificationMaster } from '../QualificationMaster/QualificationMaster';
import DataTable from '../../../utils/dataTable/DataTable';
import { qualificationDataActions } from 'store/actions/data/qualificationMaster';
import comonTest from './comonTest.js'
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
    comonTest(listShowLoading,saveData,fetchList)
    test('Is the search Field Present or not', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        const searchField = screen.findByPlaceholderText('Search');
        expect(searchField).toBeTruthy();

        const searchIcon = screen.getByRole('img', { name: 'search' });
        expect(searchIcon).toBeTruthy();
        fireEvent.click(searchIcon);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        expect(searchBtn).toBeTruthy();
        fireEvent.click(searchBtn);
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

    test('Is the View Button Present or not', () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const refBtn = screen.getByLabelText('ai-view');
        expect(refBtn).toBeTruthy();
        fireEvent.click(refBtn);
    });

    // test('Refresh data button', async () => {
    //     const handleRefereshBtn = jest.fn();
    //     console.log(handleRefereshBtn);
    //    render(<QualificationMaster handleRefereshBtn={handleRefereshBtn} qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} listShowLoading={listShowLoading}  />);

    //     // const refBtn = screen.getByLabelText('fa-ref');

    //     // fireEvent.click(refBtn);
    //     // expect(handleRefereshBtn).toHaveBeenCalled();
    // });

    test('Is Add Qualification Button Present on  render of Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const options = await screen.findByText('ZHJ');
        expect(options).toBeTruthy();

        const AddQualificationBtn = await screen.findByText('Add Qualification');
        expect(AddQualificationBtn).toBeInTheDocument();
        fireEvent.click(AddQualificationBtn);

        const Status = screen.getByRole('switch', { name: 'fa-switch' });
        expect(Status).toBeChecked();

        const InputFieldCode = await screen.findByPlaceholderText('Please enter code');
        const InputFieldName = await screen.findByPlaceholderText('Please enter name');

        expect(InputFieldCode).toBeTruthy();
        expect(InputFieldName).toBeTruthy();

        const CancelBtn = await screen.findByText('Cancel');
        expect(CancelBtn).toBeTruthy();
        fireEvent.click(CancelBtn);
    });

    test('Is table rendering data', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} listShowLoading={listShowLoading} />);
        const Tablepresent = screen.getByRole('table');
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();
        const options = await screen.findByText('ZHH');
        expect(options).toBeTruthy();
        expect(Tablepresent).toBeTruthy();
    });

    test('Edit Functionality in Table', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Qualification List');
        expect(textfield).toBeTruthy();

        const editBtn = screen.getByLabelText('fa-edit');
        expect(editBtn).toBeTruthy();
        fireEvent.click(editBtn);

        const InputFieldCode = await screen.findByPlaceholderText('Please enter code');
        const InputFieldName = await screen.findByPlaceholderText('Please enter name');
        expect(InputFieldCode.value).toBe('ZHJ');
        expect(InputFieldName.value).toBe('ZHH');

        fireEvent.change(InputFieldCode, { target: { value: '' } });
        fireEvent.change(InputFieldName, { target: { value: '' } });

        const Validations1 = await screen.findAllByText('Qualification Code');
        const Validations2 = await screen.findAllByText('Qualification Name');

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
        expect(saveBtn).toBeTruthy();
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
        const nameText = await screen.getByText('ZHJ');
        fireEvent.change(nameField, { target: { value: 'ZHJ' } });
        expect(nameText.value).toBeFalsy();
    });

    // test('Is switch in table disabled', async () => {
    //     render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
    //     const AddQualificationBtn = await screen.findByText('Add Qualification');
    //     expect(AddQualificationBtn).toBeInTheDocument();
    //     fireEvent.click(AddQualificationBtn);
    //     expect(screen.getByTestId('switchbtn')).toBeDisabled();
    //     // fireEvent.click(switchBtn);
    // });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const AddQualificationBtn = await screen.findByText('Add Qualification');
        fireEvent.click(AddQualificationBtn);
        const nameField = screen.findByPlaceholderText('Please enter name');
        const nameField2 = screen.findByPlaceholderText('Please enter code');
        expect(nameField).toBeTruthy();
        expect(nameField2).toBeTruthy();
    });

    test('is drawer opening on click of Add Qualification', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const AddQualificationBtn = await screen.findByText('Add Qualification');
        fireEvent.click(AddQualificationBtn);
        const Status = screen.getByRole('switch', { name: 'fa-switch' });
        expect(Status).toBeChecked();

        const saveBtn = screen.getByText('Save');

        fireEvent.click(saveBtn);
        const Validations1 = screen.findByText('Please enter code');
        const Validations2 = screen.findByText('Please enter name');
        expect(Validations1).toBeTruthy();
        expect(Validations2).toBeTruthy();
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        const { getByLabelText, getByText } = render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const AddQualificationBtn = screen.getByText('Add Qualification');
        fireEvent.click(AddQualificationBtn);
        const nameInputField = screen.findByPlaceholderText('Please enter name');
        const codeInputField = screen.findByPlaceholderText('Please enter code');
        const SaveBtn = getByText('Save');
        onFinish.mockResolvedValue({
            qualificationCode: 'ZHJ',
            qualificationName: 'ZHH',

        });
        const result = await onFinish();
        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(nameInputField).toBeTruthy();
        expect(codeInputField).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer closing on click of cancel button', async () => {
        render(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        const AddQualificationBtn = await screen.findByText('Add Qualification');
        expect(AddQualificationBtn).toBeInTheDocument();
        fireEvent.click(AddQualificationBtn);
        const cancelBtn = screen.getByText('Cancel');
        expect(cancelBtn).toBeTruthy();
        fireEvent.click(cancelBtn);
    });

});

describe('This is to test the Axios Call using Jest', () => {
    test('This is the Api call test', async () => {
        const Fetchlist = await qualificationDataActions.fetchList();
        console.log(Fetchlist);
    });
});
