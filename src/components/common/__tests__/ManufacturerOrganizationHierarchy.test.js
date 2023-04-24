import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { async } from 'sonarqube-scanner';
import { ManufacturerOrgHierarchy } from '../ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchy';

jest.mock('react-redux', () => ({
    connect: () => (ManufacturerOrgHierarchy) => ManufacturerOrgHierarchy,
}));

jest.mock('react-redux', () => ({
    connect: () => (ManufacturerOrgHierarchyChangeHistory) => ManufacturerOrgHierarchyChangeHistory,
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

const fetchList = () => {
    return;
};
const saveData = () => {
    return;
};
const hierarchyAttributeFetchList = () => {
    return;
};
const listShowLoading = () => {
    return;
};


describe('manufacturerorghierarchy component', () => {
    test('Manufacturer Organization Heirarchy Page render ', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading}/>);
        const hierarchyText = await screen.getByText('Hierarchy');
        expect(hierarchyText).toBeInTheDocument();
    });
    // test('Manufacturer Organization Heirarchy Page render ', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading}/>);
    //     const changeHistoryBtn = await screen.getByText('Change History');
    //     expect(changeHistoryBtn).toBeInTheDocument();
    // });
    // test('Is search working', async () => {
    //     render(<ManufacturerOrgHierarchy hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);

    //     const nameField = await screen.findByPlaceholderText('Search');
    //     const nameText = await screen.getByText('ZHJ');
    //     fireEvent.change(nameField, { target: { value: 'ZHJ' } });
    //     expect(nameText.value).toBeFalsy();
    // });
    test('Is the search Field Present or not', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);
        const searchField = await screen.findByPlaceholderText('Search');
        expect(searchField).toBeTruthy();
        const searchIcon = screen.getByRole('img', { name: 'search' });
        expect(searchIcon).toBeTruthy();
        fireEvent.click(searchIcon);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        expect(searchBtn).toBeTruthy();
        fireEvent.click(searchBtn);
    });
    test('render form', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading}/>);
        const codeInputField = screen.queryByPlaceholderText('Please Enter Attribute Code');
        expect(codeInputField).toBeNull();
    });

    test('render hierarchy details element',async() => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        const treeBranch =  await screen.findByText('parent 1');
        expect(treeBranch).toBeInTheDocument();
        fireEvent.click(treeBranch);
        const attributeText = await screen.findByText('Attribute Level');
        expect(attributeText).toBeInTheDocument();
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const editBtn = screen.queryByRole('button', { name: 'Edit' });
        expect(editBtn).toBeInTheDocument();
    })
    test('render form element',async() => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        const treeBranch =  await screen.findByText('parent 1');
        expect(treeBranch).toBeInTheDocument();
        fireEvent.click(treeBranch);
        const attributeText = await screen.findByText('Attribute Level');
        expect(attributeText).toBeInTheDocument();
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        fireEvent.click(addiblingBtn);
        const cancelBtn = await screen.getByText('Cancel');
        expect(cancelBtn).toBeTruthy();
    })
    test('render form element on edit button',async() => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        const treeBranch =  await screen.findByText('parent 1');
        expect(treeBranch).toBeInTheDocument();
        fireEvent.click(treeBranch);
        const attributeText = await screen.findByText('Attribute Level');
        expect(attributeText).toBeInTheDocument();
        const addiblingBtn = await screen.findByRole('button', { name: 'Edit' });
        expect(addiblingBtn).toBeInTheDocument();
        fireEvent.click(addiblingBtn);
        const saveBtn = await screen.getByText('Save');
        expect(saveBtn).toBeTruthy();
    })
    // test('close drawer on click of cancel button',async() => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} onCloseAction={true} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch =  await screen.findByText('parent 1');
    //     expect(treeBranch).toBeInTheDocument();
    //     fireEvent.click(treeBranch);
    //     const attributeText = await screen.findByText('Attribute Level');
    //     expect(attributeText).toBeInTheDocument();
    //     const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
    //     expect(addiblingBtn).toBeInTheDocument();
    //     fireEvent.click(addiblingBtn);
    //     const cancelBtn = await screen.getByText('Cancel');
    //     expect(cancelBtn).toBeTruthy();
    //     fireEvent.click(cancelBtn);
    //     const saveBtn = await screen.findByText('Save');
    //     expect(saveBtn).toBeFalsy();
    // })


    // test('render form element', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch =  await screen.findByText('parent 1');
    //     expect(treeBranch).toBeInTheDocument();
    //     fireEvent.click(treeBranch);
    //     const attributeText = await screen.findByText('Attribute Level');
    //     expect(attributeText).toBeInTheDocument();
    //     const childButton = screen.getByText('Add Child');
    //     expect(childButton).toBeTruthy();
    //     fireEvent.click(childButton);
    // });
    // test('is drawer opening on click of Add Child button', async () => {
    //     render(<ManufacturerOrgHierarchy hierarchyAttributeFetchList={hierarchyAttributeFetchList} fetchList={fetchList} saveData={saveData} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch =  await screen.findByText('parent 1');
    //     expect(treeBranch).toBeInTheDocument();
    //     fireEvent.click(treeBranch);
    //     const attributeText = await screen.findByText('Attribute Level');
    //     expect(attributeText).toBeInTheDocument();
    //     const childButton = screen.findByText('Add Child');
    //     fireEvent.click(childButton);
    //     const nameField = screen.findByPlaceholderText('Please select Attribute Type Code');
    //     const nameField2 = screen.findByPlaceholderText('Please enter Attribute Code');
    //     expect(nameField).toBeTruthy();
    //     expect(nameField2).toBeTruthy();
    // });

    // test('render form element', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = screen.getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     const ResetBtn = screen.getByText('Reset');
    //     fireEvent.click(ResetBtn);
    //     const codeInputField = screen.getByPlaceholderText('Please Enter Attribute Code');
    //     const ShortDesc = screen.getByPlaceholderText('Please Enter Short Description');
    //     const LongDesc = await screen.findByPlaceholderText('Please Enter Long Description');
    //     expect(codeInputField.value).toBe('');
    //     expect(ShortDesc.value).toBe('');
    //     expect(LongDesc.value).toBe('');
    // });

    // test('input field on enetering data form element', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = screen.getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     const codeInputField = screen.getByPlaceholderText('Please Enter Attribute Code');
    //     const ShortDesc = screen.getByPlaceholderText('Please Enter Short Description');
    //     const LongDesc = await screen.findByPlaceholderText('Please Enter Long Description');
    //     fireEvent.change(codeInputField, {
    //         target: {
    //             value: 'New Checkbox Item!',
    //         },
    //     });
    //     fireEvent.change(ShortDesc, {
    //         target: {
    //             value: 'New Checkbox Item!',
    //         },
    //     });
    //     fireEvent.change(LongDesc, {
    //         target: {
    //             value: 'New Checkbox Item!',
    //         },
    //     });
    //     expect(codeInputField.value).toMatch('New Checkbox Item!');
    //     expect(ShortDesc.value).toMatch('New Checkbox Item!');
    //     expect(LongDesc.value).toMatch('New Checkbox Item!');
    // });

    // test('Save form element', async () => {
    //     const onFinish = jest.fn();
    //     const { getByLabelText, getByText } = render(<ManufacturerOrgHierarchy fetchList={fetchList} onFinish={onFinish} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = screen.getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     // console.log("test",SaveBtn)
    //     const codeInputField = getByLabelText('Attribute Code');
    //     const ShortDesc = getByLabelText('Short Description');
    //     const LongDesc = getByLabelText('Long Description');
    //     const SaveBtn = getByText('Save');
    //     onFinish.mockResolvedValue({
    //         manufactureOrgCode: 'ABCDE',
    //         manufactureOrgLongName: 'Asia',
    //         manufactureOrgShrtName: 'Asia',
    //         active: true,
    //         attributeKey: 'Continent',
    //         manufactureOrgParntId: 'DMS',
    //     });
    //     const result = await onFinish();
    //     // fireEvent.change(codeInputField, {
    //     //     target: {
    //     //         value: 'ABCDE',
    //     //     },
    //     // });

    //     // fireEvent.change(nameInputField, {
    //     //     target: {
    //     //         value: 'ABCDEFG',
    //     //     },
    //     // });

    //     fireEvent.click(SaveBtn);
    //     expect(result).toBeTruthy();
    //     expect(onFinish).toHaveBeenCalled();
    // });

    test('Is tree present', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const Treepresent = screen.getAllByRole('tree');
        console.log(Treepresent);

        expect(Treepresent).toBeTruthy();
    });

    test('render tree view and click branch to add child after selecting parent', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        const treeBranch = screen.queryByText('parent 1');
        expect(treeBranch).toBeTruthy();
        userEvent.click(treeBranch);
        const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
        expect(addiblingBtn).toBeInTheDocument();
        const editBtn = screen.queryByRole('button', { name: 'Edit' });
        expect(editBtn).toBeInTheDocument();
    });

    // test('Is data present after cick of parent', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch = screen.queryByText('parent 1');
    //     expect(treeBranch).toBeTruthy();
    //     fireEvent.click(treeBranch);
    //     const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
    //     expect(addiblingBtn).toBeInTheDocument();
    //     const CommonAddChildButton = await screen.findByRole('button', { name: 'Add Child' });
    //     expect(CommonAddChildButton).toBeInTheDocument();
    //     const EditButton = await screen.findByRole('button', { name: 'Edit' });
    //     expect(EditButton).toBeInTheDocument();

    //     const ShortDesc = screen.getByPlaceholderText('Please Enter Short Description');
    //     const LongDesc = screen.getByPlaceholderText('Please Enter Long Description');
    //     const codeInputCode = screen.getByPlaceholderText('Please Enter Attribute Code');
    //     const ParentField = screen.getByRole('combobox', { name: '' });
    //     const ManuOrgLevel = screen.getByRole('combobox', { name: 'Attribute Type Code' });
    //     const codeSwitch = screen.getByRole('switch', { name: 'Status' });

    //     expect(ShortDesc).toBeDisabled();
    //     expect(LongDesc).toBeDisabled();
    //     expect(codeInputCode).toBeDisabled();
    //     expect(ParentField).toBeDisabled();
    //     expect(ManuOrgLevel).toBeDisabled();
    //     expect(codeSwitch).toBeDisabled();

    //     fireEvent.click(EditButton);
    //     expect(ParentField).not.toBeDisabled();P
    //     expect(ManuOrgLevel).not.toBeDisabled();
    //     expect(codeSwitch).not.toBeDisabled();

    //     const SaveBtn = screen.getByRole('button', { name: 'Save' });
    //     const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    //     expect(SaveBtn).toBeInTheDocument();
    //     expect(cancelBtn).toBeInTheDocument();

    //     fireEvent.click(addiblingBtn);
    //     expect(ParentField).not.toBeDisabled();
    //     expect(ManuOrgLevel).not.toBeDisabled();
    //     expect(codeSwitch).not.toBeDisabled();
    //     fireEvent.click(cancelBtn);
    // });

    // test('Testing After left panel tree click Add CHild button', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch = screen.queryByText('parent 1');
    //     expect(treeBranch).toBeTruthy();
    //     fireEvent.click(treeBranch);
    //     const ShortDesc = screen.findByPlaceholderText('Please Short Description');
    //     const codeInputCode = screen.getByPlaceholderText('Please Enter Attribute Code');
    //     const LongDesc = screen.getByPlaceholderText('Please Enter Long Description');
    //     const ParentField = screen.getByRole('combobox', { name: '' });
    //     const ManuOrgLevel = screen.getByRole('combobox', { name: 'Attribute Type Code' });
    //     const codeSwitch = screen.getByRole('switch', { name: 'Status' });

    //     expect(ParentField).toBeTruthy();
    //     expect(ManuOrgLevel).toBeTruthy();
    //     expect(codeSwitch).toBeTruthy();
    //     expect(ShortDesc).toBeTruthy();
    //     expect(LongDesc).toBeTruthy();
    //     expect(codeInputCode).toBeTruthy();
    //     const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
    //     fireEvent.click(addChildBtn);
    //     expect(addChildBtn).toBeTruthy();
    // });

    // test('Checking the functionality of Add Child after click of left panel', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     const treeBranch = screen.findAllByText('parent 1');
    //     expect(treeBranch).toBeTruthy();
    //     fireEvent.click(treeBranch);
    //     const addSiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
    //     expect(addSiblingBtn).toBeTruthy();
    //     fireEvent.click(addSiblingBtn);
    // });

    // test('Testing the save function on page', async () => {
    //     render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
    //     expect(addChildBtn).toBeTruthy();
    //     fireEvent.click(addChildBtn);
    //     const ShortDesc = screen.getByPlaceholderText('Please Enter Short Description');
    //     const codeInputCode = screen.getByPlaceholderText('Please Enter Attribute Code');
    //     const LongDesc = screen.getByPlaceholderText('Please Enter Long Description');
    //     const ParentField = screen.getByRole('combobox', { name: '' });
    //     const ManuOrgLevel = screen.getByRole('combobox', { name: 'Attribute Type Code' });
    //     const codeSwitch = screen.getByRole('switch', { name: 'Status' });
    //     fireEvent.change(ShortDesc, { target: { value: '23' } });
    //     fireEvent.change(codeInputCode, { target: { value: '23' } });
    //     fireEvent.change(LongDesc, { target: { value: '24' } });
    //     fireEvent.keyDown(ParentField, { key: 'A', code: 'KeyA' });
    //     fireEvent.keyDown(ManuOrgLevel, { key: 'A', code: 'KeyA' });
    //     fireEvent.change(codeSwitch, { target: { value: false } });

    //     const saveBtn = screen.getByRole('button', { name: 'Save' });
    //     expect(saveBtn).toBeTruthy();
    // });
});
