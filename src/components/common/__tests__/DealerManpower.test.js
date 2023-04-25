import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DealerManpower } from '../DealerManpower/DealerManpower';
import LeftPanel from '../LeftPanel';
import { Tree } from 'antd';

jest.mock('react-redux', () => ({
    connect: () => (DealerManpower) => DealerManpower,
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
const treeDatas = [
    {
        dealerManpowerCode: 'parent 1',
        dealerManpowerId: 'parent 1',
        subDivision: [
            {
                dealerManpowerCode: 'node1',
                dealerManpowerId: 'node1',

                subDivision: [
                    {
                        dealerManpowerCode: 'randomNode_1',
                        dealerManpowerId: 'randomNode_1',
                    },
                    {
                        dealerManpowerCode: 'node2',
                        dealerManpowerId: 'node2',

                        subDivision: [
                            {
                                dealerManpowerCode: 'randomNode_2',
                                dealerManpowerId: 'randomNode_2',

                                subDivision: [
                                    {
                                        dealerManpowerCode: 'node3',
                                        dealerManpowerId: 'node3',

                                        subDivision: [
                                            {
                                                dealerManpowerCode: 'randomNode_3',
                                                dealerManpowerId: 'randomNode_3',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        dealerManpowerCode: 'topNode',
        dealerManpowerId: 'topNode',
        subDivision: [
            {
                dealerManpowerCode: 'node1',
                dealerManpowerId: 'node1',

                subDivision: [
                    {
                        dealerManpowerCode: 'randomNode_1',
                        dealerManpowerId: 'randomNode_1',
                    },
                    {
                        dealerManpowerCode: 'node2',
                        dealerManpowerId: 'node2',

                        subDivision: [
                            {
                                dealerManpowerCode: 'randomNode_2',
                                dealerManpowerId: 'randomNode_2',

                                subDivision: [
                                    {
                                        dealerManpowerCode: 'node3',
                                        dealerManpowerId: 'node3',

                                        subDivision: [
                                            {
                                                dealerManpowerCode: 'randomNode_3',
                                                dealerManpowerId: 'randomNode_3',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
const fetchList = () => {};
const saveData = () => {};
const hierarchyAttributeFetchList = () => {};

describe('DealerManpower component', () => {
    test('render add child button', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    // test('render Exit button', async () => {
    //     render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const Exit = screen.getByText('Exit');
    //     expect(Exit).toBeInTheDocument();
    // });

    // test('render Change History button', async () => {
    //     render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const changeHistoryBtn = screen.getByText('Change History');
    //     expect(changeHistoryBtn).toBeInTheDocument();
    // });

    test('render form', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Select');
        expect(codeInputField).toBeNull();
    });

    test('render form element', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Code');
        expect(codeInputField).toBeTruthy();
    });

    test('render form element', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const CancelBtn = screen.getByText('Cancel');
        fireEvent.click(CancelBtn);
        expect(RootChildButton).toBeTruthy();
    });

    test('render form element', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = screen.getByText('Reset');
        fireEvent.click(ResetBtn);
        const codeInputField = screen.getByPlaceholderText('Code');
        const nameInputField = screen.getByPlaceholderText('Name');
        expect(codeInputField.value).toMatch('');
        expect(nameInputField.value).toMatch('');
    });

    test('input field on enetering data form element', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Code');
        const nameInputField = screen.getByPlaceholderText('Name');
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
        const { getByLabelText, getByText } = render(<DealerManpower fetchList={fetchList} onFinish={onFinish} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        // console.log("test",SaveBtn)
        const codeInputField = getByLabelText('Code');
        const nameInputField = getByLabelText('Name');
        const SaveBtn = getByText('Save');
        onFinish.mockResolvedValue({
            dealerManpowerCode: 'ABCDE',
            dealerManpowerName: 'Asia',
            activeIndicator: true,
            attributeKey: 'Continent',
            manpowerCode: 'DMS',
        });
        const result = await onFinish();

        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('reset form button', async () => {
        const handleResetBtn = jest.fn();
        const { getByLabelText, getByText } = render(<DealerManpower handleResetBtn={handleResetBtn} fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
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

    test('Is tree present', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const Treepresent = await screen.getAllByRole('tree');
        console.log(Treepresent);

        expect(Treepresent).toBeTruthy();
    });

    test('render tree view and click branch to add child after selecting parent', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerManpowerData={treeDatas} />);
        const treeBranch = await screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        userEvent.click(treeBranch);
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const editBtn = screen.queryByRole('button', { name: 'Edit' });
        expect(editBtn).toBeInTheDocument();
    });
    test('Is data present after click of parent', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerManpowerData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const CommonAddChildButton = await screen.findByRole('button', { name: 'Add Child' });
        expect(CommonAddChildButton).toBeInTheDocument();
        const EditButton = await screen.findByRole('button', { name: 'Edit' });
        expect(EditButton).toBeInTheDocument();

        const codeInputName = screen.getByPlaceholderText('Name');
        const codeInputCode = screen.getByPlaceholderText('Code');
        const ParentField = await screen.getByRole('combobox', { name: 'Parent' });
        const DealerManpowerLevel = await screen.getByRole('combobox', { name: 'Dealer Manpower Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputName).toBeDisabled();
        expect(codeInputCode).toBeDisabled();
        expect(ParentField).toBeDisabled();
        expect(DealerManpowerLevel).toBeDisabled();
        expect(codeSwitch).toBeDisabled();

        fireEvent.click(EditButton);
        expect(ParentField).not.toBeDisabled();
        expect(DealerManpowerLevel).not.toBeDisabled();
        expect(codeSwitch).not.toBeDisabled();

        const SaveBtn = await screen.getByRole('button', { name: 'Save' });
        const cancelBtn = await screen.getByRole('button', { name: 'Cancel' });
        expect(SaveBtn).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();

        fireEvent.click(addiblingBtn);
        expect(ParentField).not.toBeDisabled();
        expect(DealerManpowerLevel).not.toBeDisabled();
        expect(codeSwitch).not.toBeDisabled();
        fireEvent.click(cancelBtn);
    });

    test('Testing After left panel tree click Add CHild button', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerManpowerData={treeDatas} />);
        const treeBranch = await screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const codeInputName = screen.getByPlaceholderText('Name');
        const codeInputCode = screen.getByPlaceholderText('Code');
        const ParentField = await screen.getByRole('combobox', { name: 'Parent' });
        const DealerManpowerLevel = await screen.getByRole('combobox', { name: 'Dealer Manpower Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });

        expect(ParentField).toBeTruthy();
        expect(DealerManpowerLevel).toBeTruthy();
        expect(codeSwitch).toBeTruthy();
        expect(codeInputName).toBeTruthy();
        expect(codeInputCode).toBeTruthy();
        const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
        fireEvent.click(addChildBtn);
        expect(addChildBtn).toBeTruthy();
    });
    test('Checking the functionality of Add Sibling after click of left panel', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerManpowerData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const addSiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addSiblingBtn).toBeTruthy();
        fireEvent.click(addSiblingBtn);
    });

    test('Testing the save function on page', async () => {
        render(<DealerManpower fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerManpowerData={treeDatas} />);
        const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
        expect(addChildBtn).toBeTruthy();
        fireEvent.click(addChildBtn);
        const codeInputName = screen.getByPlaceholderText('Name');
        const codeInputCode = screen.getByPlaceholderText('Code');
        const ParentField = await screen.getByRole('combobox', { name: 'Parent' });
        const DealerManpowerLevel = await screen.getByRole('combobox', { name: 'Dealer Manpower Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        fireEvent.change(codeInputName, { target: { value: '23' } });
        fireEvent.change(codeInputCode, { target: { value: '23' } });
        fireEvent.keyDown(ParentField, { key: 'A', code: 'KeyA' });
        fireEvent.keyDown(DealerManpowerLevel, { key: 'A', code: 'KeyA' });
        fireEvent.change(codeSwitch, { target: { value: false } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        expect(saveBtn).toBeTruthy();
    });
});
