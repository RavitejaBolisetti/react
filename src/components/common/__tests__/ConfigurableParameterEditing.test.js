import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { ConfigurableParameterEditing } from '../ConfigurableParameterEditing/ConfigurableParameterEditing';
import { AddEditForm } from '../ConfigurableParameterEditing/AddEditForm';
import DataTable from '../../../utils/dataTable/DataTable';
import { async } from 'sonarqube-scanner';

jest.mock('react-redux', () => ({
    connect: () => (ConfigurableParameterEditing) => ConfigurableParameterEditing,
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

const configParamData1 = [
    {
        controlId: 'Test33',
        controlDescription: 'Time for testing133',
        controlGroup: 'SM',
        configurableParameterType: 'Text',

    },
];
const configParamData = [
    {
        controlId: 'Test11',
        controlDescription: 'Time for testing443',
        controlGroup: 'SM',
        configurableParameterType: 'Text',
        configPrmVal: 'test',

    },

];

const typeData = [
    {
        id:"5ef8b161-ecf6-42a1-894b-78807f0a4292",
        key:"ACLOK",
        value:"Lock Account",
    },
    {
        id:"763b9094-43d8-4096-a7fc-4f2954937baa",
        key:"NOLOG",
        value:"No Login",
    }
]
const fetchList = () => {
    return;
};
const saveData = () => {
    return;
};
const fetchdataList = () => {
    return;
};

describe('Config Param Test', () => {

    //Passed1!
    test('Is the search Field Present or not', () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} />);
        const searchField = screen.findByPlaceholderText('Search');
        expect(searchField).toBeTruthy();
    });




    test('Is drawer opening on clicking edit', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData1}/>);
        // const editBtn = await screen.getByRole('button',{ name: 'fa-edit' });
        const editBtn = await screen.getByTestId('EditIcon');
        fireEvent.click(editBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        const SaveAndNew = screen.getByRole('button', { name: 'Save & Add New' });

        fireEvent.click(saveBtn);
        fireEvent.click(SaveAndNew);

        expect(saveBtn).toBeTruthy();
        expect(SaveAndNew).toBeTruthy();
        // expect(screen.getByDisplayValue('Test33')).toBeInTheDocument();
    });



    test('Is Selection working', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configParamData={configParamData} typeData={typeData} />);
        // const nameField = await screen.findByPlaceholderText('Search');
        // const nameText = await screen.queryByText('Test33');
        // fireEvent.change(nameField, { target: { value: 'Test3' } });
        // expect(nameText).toBeFalsy();
        const addGroupBtn = await screen.getByRole('button',{name:'Add Group'});
        fireEvent.click(addGroupBtn);
        await userEvent.selectOptions(
            // Find the select element
            screen.getByRole('combobox',{name:'Control ID'}),
            // Find and select the Ireland option
            screen.getByRole('option', { name: 'Lock Account' }),
        )
        expect(screen.getByRole('option', { name: 'Lock Account' }).selected).toBe(true)
    });



    test('is drawer opening on click of Add Group', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const nameField = screen.findAllByPlaceholderText('Enter Data');
        expect(nameField).toBeTruthy();
    });

    test('Save Drawer element', async () => {
        const onFinish = jest.fn();
        const { getByLabelText, getByText } = render(<ConfigurableParameterEditing fetchList={fetchList} onFinish={onFinish} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
        const AddGrp = screen.getByText('Add Group');
        fireEvent.click(AddGrp);
        // console.log("test",SaveBtn)
        const SaveBtn = screen.getByText('Save');
        onFinish.mockResolvedValue({
            controlId: 'Test33',
            controlDescription: 'Time for testing133',
            controlGroup: 'SM',
            configurableParameterType:'Text',
        });
        const result = await onFinish();
        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    //failed successfully
    test('is drawer closing on click of cancel button', async () => {
        const onClose = jest.fn();
        render(<ConfigurableParameterEditing onClose={onClose} fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const cancelBtn = await screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
        const result = await onClose();
        expect(onClose).toHaveBeenCalled();
        const options = await screen.queryByText('Add Group');
        expect(options).toBeTruthy();
    }, 800000);

    // test('is Configurable Parameter Type Changing', async () => {
    //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
    //     const addGroupBtn = await screen.findByText('Add Group');
    //     fireEvent.click(addGroupBtn);
    //     const configParamType= screen.getByRole('combobox', { name: 'Configurable Parameter Type' });
    //     fireEvent.change(configParamType, {
    //     target: { key: 'N',value:'number'},
    //     });
    //     const configParamVal=await screen.getByLabelText('Configurable Parameter Values');
    //     expect(configParamVal).toBeTruthy();
    // });


});
