import { render, screen } from '@testing-library/react';
import { ConfigurableParameterEditing } from '../ConfigurableParameterEditing/ConfigurableParameterEditing';
import { InputFieldAvailablity, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, searchFieldTest, switchAvailablity } from './Common/tableWithDrawer/common';
import { tablerender } from './Common/tableWithDrawer/common';
import { buttonLookAndFireEventByRole } from './Common/tableWithDrawer/common';

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

const configParamData = [
    {
        controlId: 'OTP Expiry',
        controlDescription: 'Time (in minutes) for which OTP is valid',
        controlGroup: 'Common',
        configurableParameterType: 'Boolean',
        configPrmVal: 'No',
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
const listShowLoading = () => {
    return;
};

describe('Config Param Test', () => {
    test('Is Add Group Button Present on  render of Table', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchDataList={fetchDataList} configData={configParamData} />);

        buttonLookAndFireEventWithText('Add Group');
        switchAvailablity('fa-switch');
        InputFieldAvailablity('Select Parameter Type');
        InputFieldAvailablity('Enter Data');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is the search Field Present or not', async () => {
        render(<ConfigurableParameterEditing fetchList={fetchList} saveData={saveData} fetchDataList={fetchDataList} configData={configParamData} />);
        searchFieldTest();
    });
    test('Is the Refresh Button Present or not', () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('fa-ref');
    });
    test('Is the View Button Present or not', () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });
    test('Is table rendering data', async () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} listShowLoading={listShowLoading} />);
        tablerender('Configurable Parameter Editing', 'OTP Expiry');
    });
    test('is drawer closing on click of cancel button', async () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Cancel');
    });
    test('View Functionality in Table', async () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        const textfield = await screen.findByText('Configurable Parameter Editing');
        expect(textfield).toBeTruthy();

        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Select Parameter Type');
        InputFieldAvailablity('Enter Data');

        buttonLookAndFireEventByRole('Edit');
    });
    test('is drawer opening on click of Add Qualification', async () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        InputFieldAvailablity('Select Parameter Type');
        InputFieldAvailablity('Enter Data');
    });
    test('is drawer opening on click of Add Qualification to add new', async () => {
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        switchAvailablity('fa-switch');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Select Parameter Type');
        InputFieldAvailablity('Enter Data');
    }, 8000);
    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ConfigurableParameterEditing configData={configParamData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Group');
        InputFieldAvailablity('Select');
        InputFieldAvailablity('Enter Data');

        onFinish.mockResolvedValue({
            controlId: 'OTP Expiry',
            controlDescription: 'Time (in minutes) for which OTP is valid',
        });

        const result = await onFinish();
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
