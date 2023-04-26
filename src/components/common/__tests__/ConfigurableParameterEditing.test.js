import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigurableParameterEditing } from '../ConfigurableParameterEditing/ConfigurableParameterEditing';
import { buttonLookAndFireEventWithLabel, searchFieldTest } from './Common/tableWithDrawer/common';

jest.mock('react-redux', () => ({
    connect: () => (ConfigurableParameterEditing) => ConfigurableParameterEditing,
    connect: () => (DataTable) => DataTable,
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

const configParamData = [
    {
        controlId: 'OTP Expiry',
        controlDescription: 'Time (in minutes) for which OTP is valid',
        controlGroup: 'Common',
        configurableParameterType: 'Boolean',
        configPrmVal: 'No',
    },
];

const typeData = [
    {
        id: '5ef8b161-ecf6-42a1-894b-78807f0a4292',
        key: 'ACLOK',
        value: 'Lock Account',
    },
    {
        id: '763b9094-43d8-4096-a7fc-4f2954937baa',
        key: 'NOLOG',
        value: 'No Login',
    },
];

const fetchList = () => {
    return;
};

const saveData = () => {
    return;
};

const fetchDataList = () => {
    return;
};


describe('Config Param Test', () => {
    //Passed2!
    // test('Is Add Group Button Working', async () => {
    //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchDataList={fetchDataList} configData={configParamData} />);
    //     const addGroupBtn = await screen.getByTestId('addGroup');
    //     expect(addGroupBtn).toBeTruthy();
    //     fireEvent.click(addGroupBtn);
    //     // expect(Drawer).toBeTruthy();
    //     // const textArea = await screen.findByPlaceholderText('Enter Data');
    //     // expect(textArea).toBeTruthy();
    // });

    //Passed1!
    test('Is the search Field Present or not', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchDataList={fetchDataList} configData={configParamData} />);
        searchFieldTest()
    });
    test('Is the Refresh Button Present or not', () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref')
    });
    test('Is the View Button Present or not', () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view')

    });
    // test('Edit Functionality in Table', async () => {
    //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} configData={configParamData} />);
    //     const textfield = await screen.findByText('Configurable Parameter Editing');
    //     expect(textfield).toBeTruthy();

    //     const editBtn = await screen.getAllByRole('button', { Name: '' });
    //     expect(editBtn).toBeTruthy();
    //     userEvent.click(editBtn);

        // const InputFieldName = await screen.findByPlaceholderText('Enter Data');
        // expect(InputFieldName.value).toBe('Time (in minutes) for which OTP is valid');

        // fireEvent.change(InputFieldName, { target: { value: '' } });

        // const Validations2 = await screen.findAllByText('Control Description');
        // const saveBtn = screen.getByRole('button', { name: 'Save' });
        // fireEvent.click(saveBtn);

        // expect(Validations2).toBeTruthy();
        // expect(saveBtn).toBeTruthy();


    // test('Is Selection working', async () => {
    //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configParamData={configParamData} typeData={typeData} />);
    //     // const nameField = await screen.findByPlaceholderText('Search');
    //     // const nameText = await screen.queryByText('Test33');
    //     // fireEvent.change(nameField, { target: { value: 'Test3' } });
    //     // expect(nameText).toBeFalsy();
    //     const addGroupBtn = await screen.getByRole('button',{name:'Add Group'});
    //     fireEvent.click(addGroupBtn);
    //     await userEvent.selectOptions(
    //         // Find the select element
    //         screen.getByRole('combobox',{name:'Control ID'}),
    //         // Find and select the Ireland option
    //         screen.getByRole('option', { name: 'Lock Account' }),
    //     )
    //     expect(screen.getByRole('option', { name: 'Lock Account' }).selected).toBe(true)
    // });

    // test('is drawer opening on click of Add Group', async () => {
    //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
    //     const addGroupBtn = await screen.findByText('Add Group');
    //     fireEvent.click(addGroupBtn);
    //     const nameField = screen.findAllByPlaceholderText('Enter Data');
    //     expect(nameField).toBeTruthy();
    // });

    // test('Save Drawer element', async () => {
    //     const onFinish = jest.fn();
    //     const { getByLabelText, getByText } = render(<ConfigurableParameterEditing fetchList={fetchList} onFinish={onFinish} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
    //     const AddGrp = screen.getByText('Add Group');
    //     fireEvent.click(AddGrp);
    //     // console.log("test",SaveBtn)
    //     const SaveBtn = screen.getByText('Save');
    //     onFinish.mockResolvedValue({
    //         controlId: 'Test33',
    //         controlDescription: 'Time for testing133',
    //         controlGroup: 'SM',
    //         configurableParameterType:'Text',
    //     });
    //     const result = await onFinish();
    //     fireEvent.click(SaveBtn);
    //     expect(result).toBeTruthy();
    //     expect(onFinish).toHaveBeenCalled();
    // });

    // //failed successfully
    // test('is drawer closing on click of cancel button', async () => {
    //     const onClose = jest.fn();
    //     render(<ConfigurableParameterEditing onClose={onClose} fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
    //     const addGroupBtn = await screen.findByText('Add Group');
    //     fireEvent.click(addGroupBtn);
    //     const cancelBtn = await screen.getByText('Cancel');
    //     fireEvent.click(cancelBtn);
    //     const result = await onClose();
    //     expect(onClose).toHaveBeenCalled();
    //     const options = await screen.queryByText('Add Group');
    //     expect(options).toBeTruthy();
    // }, 800000);

    // // test('is Configurable Parameter Type Changing', async () => {
    // //     render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData} />);
    // //     const addGroupBtn = await screen.findByText('Add Group');
    // //     fireEvent.click(addGroupBtn);
    // //     const configParamType= screen.getByRole('combobox', { name: 'Configurable Parameter Type' });
    // //     fireEvent.change(configParamType, {
    // //     target: { key: 'N',value:'number'},
    // //     });
    // //     const configParamVal=await screen.getByLabelText('Configurable Parameter Values');
    // //     expect(configParamVal).toBeTruthy();
    // // });
});
