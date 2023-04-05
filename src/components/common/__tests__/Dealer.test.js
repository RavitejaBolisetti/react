import { fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dealer } from '../DealerHierarchy/Dealer';
import { handleSuccessModal } from 'utils/responseModal';
import { dealerHierarchyDataActions } from 'store/actions/data/dealerHierarchy';

jest.mock('react-redux', () => ({
    connect: () => (Dealer) => Dealer,
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
        shortDescription: 'parent 1',
        id: 'parent 1',
        children: [
            {
                shortDescription: 'asian',
                id: 'AS',

                children: [
                    {
                        shortDescription: 'India',
                        id: 'IND',
                    },
                    {
                        title: 'node2',
                        key: 'node2',

                        children: [
                            {
                                title: 'randomNode_2',
                                key: 'randomNode_2',

                                children: [
                                    {
                                        title: 'node2',
                                        key: 'node2',

                                        children: [
                                            {
                                                title: 'randomNode_3',
                                                key: 'randomNode_3',
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
        shortDescription: 'topNode',
        id: 'topNode',
        children: [
            {
                title: 'node1',
                key: 'node1',

                children: [
                    {
                        title: 'randomNode_1',
                        key: 'randomNode_1',
                    },
                    {
                        title: 'node2',
                        key: 'node2',

                        children: [
                            {
                                title: 'randomNode_2',
                                key: 'randomNode_2',

                                children: [
                                    {
                                        title: 'node2',
                                        key: 'node2',

                                        children: [
                                            {
                                                title: 'randomNode_3',
                                                key: 'randomNode_3',
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
const hierarchyAttributeFetchList = () => {};

describe('dealer component', () => {
    test('render add child button', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    test('render form', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Short Description');
        expect(codeInputField).toBeTruthy();
    });

    test('render form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeTruthy();
    });

    test('render form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const CancelBtn = screen.getByText('Cancel');
        fireEvent.click(CancelBtn);
        expect(RootChildButton).toBeTruthy();
    });

    test('render form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = screen.getByText('Reset');
        fireEvent.click(ResetBtn);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Short Description');
        expect(codeInputField.value).toMatch('');
        expect(nameInputField.value).toMatch('');
    });

    test('input field on enetering data form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Short Description');
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
        const { getByLabelText, getByText } = render(<Dealer fetchList={fetchList} onFinish={onFinish} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        // console.log("test",SaveBtn)
        const codeInputField = getByLabelText('Code');
        const nameInputField = getByLabelText('Short Description');
        const SaveBtn = getByText('Save');
        onFinish.mockResolvedValue({
            code: 'ABCDE',
            shortDescription: 'Asia',
            status: true,
            attributeId: 'Continent',
            parentId: 'DMS',
        });
        const result = await onFinish();
        fireEvent.click(SaveBtn);
        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('reset form button', async () => {
        const handleResetBtn = jest.fn();
        const { getByLabelText, getByText } = render(<Dealer handleResetBtn={handleResetBtn} fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = getByText('Reset');
        const codeInputField = getByLabelText('Code');
        const nameInputField = getByLabelText('Short Description');
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
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const Treepresent = await screen.getAllByRole('tree');
        console.log(Treepresent);

        expect(Treepresent).toBeTruthy();
    });

    test('render tree view and click branch to add child after selecting parent', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        userEvent.click(treeBranch);
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const editBtn = screen.queryByRole('button', { name: 'Edit' });
        expect(editBtn).toBeInTheDocument();
    });
    test('Is data present after cick of parent', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const CommonAddChildButton = await screen.findByRole('button', { name: 'Add Child' });
        expect(CommonAddChildButton).toBeInTheDocument();
        const EditButton = await screen.findByRole('button', { name: 'Edit' });
        expect(EditButton).toBeInTheDocument();

        const codeInputName = screen.getByPlaceholderText('Please Enter Code');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Short Description');
        const ParentField = await screen.getByRole('combobox', { name: '' });
        const DealerLevel = await screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        expect(codeInputName).toBeDisabled();
        expect(codeInputCode).toBeDisabled();
        expect(ParentField).toBeDisabled();
        expect(DealerLevel).toBeDisabled();
        expect(codeSwitch).toBeDisabled();

        fireEvent.click(EditButton);
        expect(ParentField).not.toBeDisabled();
        expect(DealerLevel).not.toBeDisabled();
        expect(codeSwitch).not.toBeDisabled();

        const SaveBtn = await screen.getByRole('button', { name: 'Save' });
        const cancelBtn = await screen.getByRole('button', { name: 'Cancel' });
        expect(SaveBtn).toBeInTheDocument();
        expect(cancelBtn).toBeInTheDocument();

        fireEvent.click(addiblingBtn);
        expect(ParentField).not.toBeDisabled();
        expect(DealerLevel).not.toBeDisabled();
        expect(codeSwitch).not.toBeDisabled();
        fireEvent.click(cancelBtn);
    });

    test('Testing After left panel tree click Add CHild button', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const codeInputName = screen.getByPlaceholderText('Please Enter Code');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Short Description');
        const ParentField = await screen.getByRole('combobox', { name: '' });
        const DealerLevel = await screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });

        expect(ParentField).toBeTruthy();
        expect(DealerLevel).toBeTruthy();
        expect(codeSwitch).toBeTruthy();
        expect(codeInputName).toBeTruthy();
        expect(codeInputCode).toBeTruthy();
        const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
        fireEvent.click(addChildBtn);
        expect(addChildBtn).toBeTruthy();
    });
    test('Checking the functionality of Add Sibling after click of left panel', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        fireEvent.click(treeBranch);
        const addSiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addSiblingBtn).toBeTruthy();
        fireEvent.click(addSiblingBtn);
    });

    test('Testing the save function fail in Geo', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
        expect(addChildBtn).toBeTruthy();
        fireEvent.click(addChildBtn);
        const codeInputName = screen.getByPlaceholderText('Please Enter Code');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Short Description');
        const ParentField = await screen.getByRole('combobox', { name: '' });
        const DealerLevel = await screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        const FindTree = await screen.findByText('topNode');
        expect(FindTree).toBeTruthy();
        fireEvent.click(FindTree);
        const EditBTn = await screen.findByText('Edit');
        fireEvent.click(EditBTn);

        fireEvent.change(codeInputName, { target: { value: 'Mahindra' } });
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        expect(saveBtn).toBeTruthy();
        fireEvent.click(saveBtn);
        render(handleSuccessModal({ title: 'SUCCESS', message: 'Data Saved' }));
    }, 800000);

    test('Testing the save function on page', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} geoData={treeDatas} />);
        const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
        expect(addChildBtn).toBeTruthy();
        fireEvent.click(addChildBtn);
        const codeInputName = screen.getByPlaceholderText('Please Enter Short Description');
        const codeInputCode = screen.getByPlaceholderText('Please Enter Code');
        const ParentField = await screen.getByRole('combobox', { name: '' });
        const DealerLevel = await screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = await screen.getByRole('switch', { name: 'Status' });
        fireEvent.change(codeInputName, { target: { value: '23' } });
        fireEvent.change(codeInputCode, { target: { value: '23' } });
        fireEvent.keyDown(ParentField, { key: 'A', code: 'KeyA' });
        fireEvent.keyDown(DealerLevel, { key: 'A', code: 'KeyA' });
        fireEvent.change(codeSwitch, { target: { value: false } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        expect(saveBtn).toBeTruthy();
    });
});
global.fetch = jest.fn(() => {
    Promise.resolve({
        json: () => promise.resolve({ data: { id: 'f7d7c0ca-e03f-4d7b-8af8-30c17cd783cc', geoCode: 'ASI12', geoName: 'ASIA24', attributeKey: '59077c54-6cbf-46d0-9729-8cb6fbb7cd87', isActive: 'N', geoParentCode: 'DMS' } }),
    });
});

describe('This is to test the Axios Call using Jest', () => {
    test('This is the Api call test', async () => {
        const Fetclists = await dealerHierarchyDataActions.fetchList();
        console.log(Fetclists);
    });
});
