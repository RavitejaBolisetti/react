import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Geo } from './Geo';

jest.mock('react-redux', () => ({
    connect: () => (Geo) => Geo,
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

const fetchList = () => {};
const hierarchyAttributeFetchList = () => {};

describe('geo component', () => {
    test('render add child button', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    test('render form', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeNull();
    });

    test('render Code Field in  form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeTruthy();
    });
    test('render Enter Name Field in form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Name');
        expect(codeInputField).toBeTruthy();
    });
    test('render Geographical Attribute Level Placeholder in form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = await screen.getByRole('combobox', { name: 'Geographical Attribute Level' });

        expect(codeInputField).toBeTruthy();
    });
    test('render Please Select Parent Placeholder in form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = await screen.getByRole('combobox', { name: '' });
        expect(codeInputField).toBeTruthy();
        const options = screen.getByRole('option', { name: 'Ireland' });
        expect(options).toBeTruthy();
    });
    test('render Switch of Active and Inactive', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputField).toBeTruthy();
    });
    test('render Switch of Active and Inactive', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputField).not.toBeDisabled();
    });
    test('Check Cancel Functionality of Form Element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const cancelbutton = screen.getByText('Cancel');
        fireEvent.click(cancelbutton);
        expect(RootChildButton).toBeTruthy();
    });
    test('Check Reset Functionality of Form Element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetButton = screen.getByText('Reset');
        fireEvent.click(ResetButton);
        const codeInputName = screen.getByPlaceholderText('Please Enter Name');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Code');
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputName.value).toMatch('');
        expect(codeInputCode.value).toMatch('');
        expect(codeSwitch).not.toBeDisabled();
    });
    test('Check Reset Functionality of Form Element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetButton = screen.getByText('Reset');
        fireEvent.click(ResetButton);
        const codeInputName = screen.getByPlaceholderText('Please Enter Name');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Code');
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputName.value).toMatch('');
        expect(codeInputCode.value).toMatch('');
        expect(codeSwitch).not.toBeDisabled();
    });
});
