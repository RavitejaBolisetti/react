import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductHierarchy } from '../ProductHierarchy/ProductHierarchy';
import { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ProductDatas as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { async } from 'sonarqube-scanner';

jest.mock('react-redux', () => ({
    connect: () => (ProductHierarchy) => ProductHierarchy,
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

describe('Product Hierarchy component', () => {
    test('Product Heirarchy Page render ', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} productHierarchyData={treeDatas} />);

        screentext('Hierarchy');
    });
    test('Product Hierarchy  Page render ', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} productHierarchyData={treeDatas} />);
        findbuttonAndClick('Change History');
    });
    test('Is search working', async () => {
        render(<ProductHierarchy hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchIsWorking();
    });
    test('Is the search Field Present or not', async () => {
        render(<ProductHierarchy fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);
        searchFieldTest();
    });
    test('render form', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please enter Code');
    });

    test('render hierarchy details element', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);

        commonTreeTest();
    });
    test('render form element', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);
        treebranchClickAndTextFinder('Attribute Level');
    });
    test('render form element on edit button', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);
        commonDrawer();
    });

    test('render tree view and click branch to add child after selecting parent', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);
        commonTreeTest();
    });
    test('render hierarchy dropdown', async()=>{
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);
            const hierarchDropdown = await screen.findByRole('combobox', {name:''});
            expect(hierarchDropdown).toBeTruthy();
    });
});
