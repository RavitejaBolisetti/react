import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ManufacturerOrgHierarchy } from '../ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchy';
import { axiosCall, buttonLookAndFireEventWithText, commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ManufacturerTreeData as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY } from '../../../constants/routingApi';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { ManufacturerOrgHierarchyMain } from '../ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchy';
import { showGlobalNotification } from 'store/actions/notification';

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

describe('manufacturerorghierarchy component', () => {
    test('Manufacturer Organization Heirarchy Page render 1', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} manufacturerOrgHierarchyData={treeDatas} />);
        screentext('Hierarchy');
    });

    test('Manufacturer Organization Heirarchy Page render 2', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} manufacturerOrgHierarchyData={treeDatas} />);
        findbuttonAndClick('Change History');
    });

    test('Is search working', async () => {
        render(<ManufacturerOrgHierarchy hierarhyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchIsWorking();
    });

    test('Is the search Field Present or not', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);
        searchFieldTest();
    });

    test('render form', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please Enter Attribute Code');
    });

    test('render hierarchy details element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);

        commonTreeTest();
    });

    test('render hierarchy details element 1', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        siblingClick();
    });
    test('render form element', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        treebranchClickAndTextFinder('Attribute Level');
    });
    test('render form element on edit button', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        commonDrawer();
    });
    test('close drawer on click of cancel button', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} onCloseAction={true} manufacturerOrgHierarchyData={treeDatas} />);
        const treeBranch = await screen.findByText('parent 1');
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
    });
    test('close drawer', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        screentext('Hierarchy');
        commonTreeTest();
    });
    test('render data', async () => {
        render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} listShowLoading={listShowLoading} />);
        axiosCall(BASE_URL_MANUFACTURER_ORGANIZATION_HIERARCHY, manufacturerOrgHierarchyDataActions.fetchList);
    });
    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ManufacturerOrgHierarchy manufacturerOrgHierarchyData={treeDatas} fetchList={fetchList} saveData={saveData} />);
        screentext('Hierarchy');
        commonTreeTest();
        buttonLookAndFireEventWithText('Add Child');
        findplaceholder('Please enter Short Description');
        findplaceholder('Please enter Attribute Code');

        onFinish.mockResolvedValue({
            manufactureOrgShrtName: 'MNM',
            manufactureOrgCode: '1234',
        });

        const result = await onFinish();
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
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
    const handleAdd = () => {};
    describe('handleAdd', () => {
        test('should set form button active to false and form visibility to true', async () => {
            render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
            // Create mock functions for setFormBtnActive and setIsFormVisible
            const setFormBtnActive = jest.fn();
            const setIsFormVisible = jest.fn();

            // Call the function
            setFormBtnActive(false);
            setIsFormVisible(true);
            handleAdd();

            // Expect setFormBtnActive to have been called with false
            expect(setFormBtnActive).toHaveBeenCalledWith(false);

            // Expect setIsFormVisible to have been called with true
            expect(setIsFormVisible).toHaveBeenCalledWith(true);
        });
    });
    describe('MyComponent', () => {
        test('should initialize isFormBtnActive to false', async () => {
            // Render the component
            const { getByTestId } = render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);

            // Find the element with the test ID for isFormBtnActive
            const isFormBtnActiveEl = getByTestId('isFormBtnActive');

            // Expect the text content to be "false"
            expect(isFormBtnActiveEl.textContent).toBe('false');
        });

    });
    
    jest.mock('axios', () => ({
        fetchList: jest.fn(),
        hierarchyAttributeFetchList: jest.fn(),
        saveData: jest.fn(),
    }));

    describe('ManufacturerOrgHierarchyMain', () => {
        it('renders without crashing', () => {
            render(<ManufacturerOrgHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        });

        it('displays the tree view by default', () => {
            const { getByTestId } = render(<ManufacturerOrgHierarchyMain />);
            expect(getByTestId('tree-view')).toBeVisible();
        });

        test('does not display the form by default', () => {
            const { getByTestId } = render(<ManufacturerOrgHierarchyMain />);
            expect(getByTestId('form')).not.toBeVisible();
        });

        it('renders the search field', () => {
            const { getByLabelText } = render(<ManufacturerOrgHierarchyMain />);
            expect(getByLabelText('Search')).toBeInTheDocument();
        });

        it('searches for nodes when the search field is used', async () => {
            const { getByLabelText, getAllByRole } = render(<ManufacturerOrgHierarchyMain />);
            const searchField = getByLabelText('Search');
            const nodes = getAllByRole('treeitem');

            fireEvent.change(searchField, { target: { value: 'test' } });

            await waitFor(() => expect(nodes.length).toBe(1));
        });

        test('calls fetchList and hierarchyAttributeFetchList when the component is rendered', () => {
            render(<ManufacturerOrgHierarchyMain userId="123" fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} />);
            const spyFunction = jest.spyOn(global, 'showGlobalNotification');
            const result = showGlobalNotification();
            expect(spyFunction).toHaveBeenCalled();
            expect(result).toEqual('hello world');
            expect(fetchList).toHaveBeenCalledWith(expect.objectContaining({ userId: '123' }));
            expect(hierarchyAttributeFetchList).toHaveBeenCalledWith(expect.objectContaining({ userId: '123' }));
        });
    });
});
