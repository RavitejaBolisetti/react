import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { async } from 'sonarqube-scanner';
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
const saveData = () => {};
const hierarchyAttributeFetchList = () => {};

describe('geo component', () => {
    test('render add child button', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    test('render Exit button', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const Exit = screen.getByText('Exit');
        expect(Exit).toBeInTheDocument();
    });

    test('render Change History button', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const changeHistoryBtn = screen.getByText('Change History');
        expect(changeHistoryBtn).toBeInTheDocument();
    });

    test('render form', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeNull();
    });

    test('render form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeTruthy();
    });

    test('render form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const CancelBtn = screen.getByText('Cancel');
        fireEvent.click(CancelBtn);
        expect(RootChildButton).toBeTruthy();
    });

    test('render form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = screen.getByText('Reset');
        fireEvent.click(ResetBtn);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Name');
        expect(codeInputField.value).toMatch('');
        expect(nameInputField.value).toMatch('');
    });

    test('input field on enetering data form element', async () => {
        render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Name');
        fireEvent.change(codeInputField, {
            target: {
                value: 'New Checkbox Item!',
            },
        });
        fireEvent.change(nameInputField, {
            target: {
                value: 'New Checkbox Item!',
            },
        });
        expect(codeInputField.value).toMatch('New Checkbox Item!');
        expect(nameInputField.value).toMatch('New Checkbox Item!');
    });

    test('Save form element', async () => {
        const onFinish = jest.fn();
        const { getByLabelText, getByText } = render(<Geo fetchList={fetchList} onFinish={onFinish} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        // console.log("test",SaveBtn)
        const codeInputField = getByLabelText('Code');
        const nameInputField = getByLabelText('Name');
        const SaveBtn = getByText('Save');
        onFinish.mockResolvedValue({
            geoCode: 'ABCDE',
            geoName: 'Asia',
            isActive: true,
            attributeKey: 'Continent',
            geoParentCode: 'DMS',
        });
        const result = await onFinish();
        // fireEvent.change(codeInputField, {
        //     target: {
        //         value: 'ABCDE',
        //     },
        // });

        // fireEvent.change(nameInputField, {
        //     target: {
        //         value: 'ABCDEFG',
        //     },
        // });

        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('reset form button', async () => {
        const handleResetBtn = jest.fn();
        const { getByLabelText, getByText } = render(<Geo handleResetBtn={handleResetBtn} fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = getByText('Reset');
        const codeInputField = getByLabelText('Code');
        const nameInputField = getByLabelText('Name');
        fireEvent.change(codeInputField, {
            target: {
                value: 'ABCDE',
            },
        });

        fireEvent.change(nameInputField, {
            target: {
                value: 'ABCDEFG',
            },
        });
        fireEvent.click(ResetBtn);
        handleResetBtn.mockResolvedValue(1);
        const result = await handleResetBtn();
        expect(codeInputField.value).toMatch('');
        expect(nameInputField.value).toMatch('');
        expect(result).toBeTruthy();
        expect(handleResetBtn).toHaveBeenCalled();
    });

    test('tree exists in geo page ', async () => {
        
    });

    // test('tree visiblity', async () => {
    //     render(<Geo fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     const ResetBtn = getByText('Reset');
    //     const codeInputField = getByLabelText('Code');
    //     const nameInputField = getByLabelText('Name');
    //     fireEvent.change(codeInputField, {
    //         target: {
    //             value: 'ABCDE',
    //         },
    //     });

    //     fireEvent.change(nameInputField, {
    //         target: {
    //             value: 'ABCDEFG',
    //         },
    //     });
    //     fireEvent.click(ResetBtn);
    //     expect(codeInputField.value).toMatch('');
    //     expect(nameInputField.value).toMatch('');
    //     await waitFor(() => expect(handleResetBtn).toHaveBeenCalled());
    // });
});
