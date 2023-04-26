import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dealer } from '../DealerHierarchy/Dealer';
import { handleSuccessModal } from 'utils/responseModal';
import { dealerHierarchyDataActions } from 'store/actions/data/dealerHierarchy';
import  { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import {dealerHierarchyData as treeDatas} from './Common/Data/data';
import {fetchList,saveData,hierarchyAttributeFetchList,listShowLoading} from './Common/CommonImports/commonImports';

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



describe('dealer component', () => {
    test('Common Tree Test', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas}/>);
        commonTreeTest();
    });

    test('Opening Drawer', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        commonDrawer();
        
    });
    test('Checking Hierarchy Text on Page', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        screentext('Hierarchy');
        
        
    });
    test('Manufacturer Organization Heirarchy Page render ', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        
        findbuttonAndClick('Change History')
    });
    test('Is search working', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        
        searchIsWorking()
    });
    test('Is the search Field Present or not', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        
        searchFieldTest();
      
    });
    test('render form', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
       
        findplaceholder('Please Enter Attribute Code')
    });

    test('render hierarchy details element',async() => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        
        commonTreeTest();

    })
    test('render form element',async() => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} dealerHierarchyData={treeDatas} />);
        
        treebranchClickAndTextFinder('Attribute Level');

    })
  
    test('close drawer on click of cancel button',async() => {
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
        fireEvent.click(cancelBtn);
        const saveBtn = await screen.queryByText('Save');
        expect(saveBtn).toBeFalsy();
    })









    test('render form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const RootChildButton = screen.getByText('Add Child');
        fireEvent.click(RootChildButton);
        const codeInputField = screen.getByPlaceholderText('Please Enter Code');
        expect(codeInputField).toBeTruthy();
    });

    // test('render form element', async () => {
    //     render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = screen.getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     const CancelBtn = screen.getByText('Cancel');
    //     fireEvent.click(CancelBtn);
    //     expect(RootChildButton).toBeTruthy();
    // });

    // test('render form element', async () => {
    //     render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
    //     const RootChildButton = screen.getByText('Add Child');
    //     fireEvent.click(RootChildButton);
    //     const ResetBtn = screen.getByText('Reset');
    //     fireEvent.click(ResetBtn);
    //     const codeInputField = screen.getByPlaceholderText('Please Enter Code');
    //     const nameInputField = screen.getByPlaceholderText('Please Enter Short Description');
    //     expect(codeInputField.value).toMatch('');
    //     expect(nameInputField.value).toMatch('');
    // });

    test('input field on enetering data form element', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList}  />);
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

    test('Is tree present', async () => {
        render(<Dealer fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
        const Treepresent = screen.getAllByRole('tree');
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
        const ParentField = screen.getByRole('combobox', { name: '' });
        const DealerLevel = screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = screen.getByRole('switch', { name: 'Status' });
        expect(codeInputName).toBeDisabled();
        expect(codeInputCode).toBeDisabled();
        expect(ParentField).toBeDisabled();
        expect(DealerLevel).toBeDisabled();
        expect(codeSwitch).toBeDisabled();

        fireEvent.click(EditButton);
        expect(ParentField).not.toBeDisabled();
        expect(DealerLevel).not.toBeDisabled();
        expect(codeSwitch).not.toBeDisabled();

        const SaveBtn = screen.getByRole('button', { name: 'Save' });
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
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
        const ParentField = screen.getByRole('combobox', { name: '' });
        const DealerLevel = screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = screen.getByRole('switch', { name: 'Status' });

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
        const ParentField = screen.getByRole('combobox', { name: '' });
        const DealerLevel = screen.getByRole('combobox', { name: 'Attribute Level' });
        const codeSwitch = screen.getByRole('switch', { name: 'Status' });
        fireEvent.change(codeInputName, { target: { value: '23' } });
        fireEvent.change(codeInputCode, { target: { value: '23' } });
        fireEvent.keyDown(ParentField, { key: 'A', code: 'KeyA' });
        fireEvent.keyDown(DealerLevel, { key: 'A', code: 'KeyA' });
        fireEvent.change(codeSwitch, { target: { value: false } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        expect(saveBtn).toBeTruthy();
    });
});

