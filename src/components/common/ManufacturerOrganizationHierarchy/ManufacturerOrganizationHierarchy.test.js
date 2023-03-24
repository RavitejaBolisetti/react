import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { async } from 'sonarqube-scanner';
import { ManufacturerOrgHierarchy } from './ManufacturerOrgHierarchy';

jest.mock('react-redux', () => ({
    connect: () => (ManufacturerOrgHierarchy) => ManufacturerOrgHierarchy,
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
        manufactureOrgShrtName: 'parent 1',
        id: 'parent 1',
        subManufactureOrg: [
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
    {
        title: 'topNode',
        key: 'topNode',
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
const saveData = () => {};
const hierarchyAttributeFetchList = () => {};

describe('manufacturerorghierarchy component', () => {
    test('render child button', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const addChildBtn = screen.getByText('Add Child');
        expect(addChildBtn).toBeInTheDocument();
    });

    test('render form', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Attribute Code');
        expect(codeInputField).toBeNull();
    });

    test('render form element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Attribute Code');
        expect(codeInputField).toBeTruthy();
    });

    test('render form element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const CancelBtn = screen.getByText('Cancel');
        fireEvent.click(CancelBtn);
        expect(RootChildButton).toBeTruthy();
    });

    test('render form element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const ResetBtn = screen.getByText('Reset');
        fireEvent.click(ResetBtn);
        const codeInputField = screen.getByPlaceholderText('Please Enter Attribute Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Short Description');
        const LongDesc = await screen.findByPlaceholderText('Please Enter Long Description');
        expect(codeInputField.value).toBe('');
        expect(nameInputField.value).toBe('');
        expect(LongDesc.value).toBe('');
    });

    test('input field on enetering data form element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Attribute Code');
        const nameInputField = screen.getByPlaceholderText('Please Enter Short Description');
        const LongDesc = await screen.findByPlaceholderText('Please Enter Long Description');
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
        fireEvent.change(LongDesc, {
            target: {
                value: 'New Checkbox Item!',
            },
        });
        expect(codeInputField.value).toMatch('New Checkbox Item!');
        expect(nameInputField.value).toMatch('New Checkbox Item!');
        expect(LongDesc.value).toMatch('New Checkbox Item!');
    });

    
});
