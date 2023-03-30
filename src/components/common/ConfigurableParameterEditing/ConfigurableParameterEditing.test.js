import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { ConfigurableParameterEditing } from './ConfigurableParameterEditing';
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
            addListener: function () {},
            removeListener: function () {},
        };
    };
// const  = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
	 			
const configParamData1 = [
    {
        controlId: 'Test33',
        controlDescription: 'Time for testing133',
        controlGroup: 'SM',
        configurableParameterType:'Text',

    },
];
const configParamData = [
    {
        controlId: 'Test11',
        controlDescription: 'Time for testing443',
        controlGroup: 'SM',
        configurableParameterType:'Text',
        configPrmVal: 'test',

    },
    {
        controlId: 'Test22',
        controlDescription: 'Time for testing223',
        controlGroup: 'SM',
        configurableParameterType:'Text',
        configPrmVal: 'manage',

       
    },
];
const fetchList = () => {
    return;
};
const saveData = () => {
    return;
};
const fetchdataList= () => {
    return;
};

describe('Config Param Test', () => {
    test('Is the search Field Present or not', () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} />);
        const searchField = screen.findByPlaceholderText('Search');

        expect(searchField).toBeTruthy();
    });

    test('Is the Add Group Button Present or not', () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} />);
        const addGrp = screen.findByText('Add Group');
        expect(addGrp).toBeTruthy();
    });
    test('Is Add Group Button working or not ', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData}/>);
        const addGroupBtn =  await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const selectfield =  screen.getByRole('combobox', { name: 'Control ID' });
        expect(selectfield).toBeTruthy();
    });

    test('Is table Rendering on Data', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData1}/>);
        const options = await screen.findByText('Test33');
        expect(options).toBeTruthy();
    });

    test('Is drawer opening on clicking edit', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData1}/>);
        const editBtn = await screen.getByRole('button',{ name: "fa-edit" });
        fireEvent.click(editBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        // const SaveAndNew = screen.getByRole('button', { name: 'Save and New' });

        // fireEvent.click(saveBtn);
        // fireEvent.click(SaveAndNew);

        expect(saveBtn).toBeTruthy();
        // expect(SaveAndNew).toBeTruthy();
        const nameField = await screen.findByText('Test33');
        expect(nameField).toBeInTheDocument();
        // expect(screen.getByDisplayValue('Test33')).toBeInTheDocument();
    });

   

    test('Is search working', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData1}/>);
        const nameField = await screen.findByPlaceholderText('Search');
        
        const nameText = await screen.getByText('Test33');
      
        fireEvent.change(nameField, { target: { value: 'Test33' } });
       
        expect(nameText.value).toBeFalsy();
    });

  

    test('is drawer opening on click of Add Group', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData}/>);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const nameField = screen.findAllByPlaceholderText('Enter Data');
        expect(nameField).toBeTruthy();
    });

    

   

    test('is drawer closing on click of cancel button', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchdataList={fetchdataList} configData={configParamData}/>);
        const addGroupBtn = await screen.findByText('Add Group');
        fireEvent.click(addGroupBtn);
        const cancelBtn = await screen.getByText('Cancel');
        fireEvent.click(cancelBtn);
        const options = await screen.findByText('Test11');
        expect(options).toBeTruthy();
    });

    
  
    
});
