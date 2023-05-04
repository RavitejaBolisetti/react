import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProductHierarchy } from '../ProductHierarchy/ProductHierarchy';
import { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ProductDatas as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { async } from 'sonarqube-scanner';
import { switchAvailablity } from './Common/tableWithDrawer/common';

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

// const Dropdata = ['Product SKU', 'Product Division', 'Model', 'Model Family'];

const Dropdata = [
    {
        id: '7d09b115-4d62-4dc1-a8fc-9a0b39e8a228',
        hierarchyAttribueName: 'Product Hierarchy',
        hierarchyAttribueType: 'Product Hierarchy',
        hierarchyAttribueCode: 'PRC',
        duplicateAllowedAtOtherParent: true,
        duplicateAllowedAtAttributerLevelInd: false,
        isChildAllowed: true,
        status: false,
    },

    {
        id: '63ec10a2-520d-44a4-85f6-f55a1d6911f3',
        hierarchyAttribueName: 'Product SKU',
        hierarchyAttribueType: 'Product Hierarchy',
        hierarchyAttribueCode: 'SKU',
        duplicateAllowedAtOtherParent: false,
        duplicateAllowedAtAttributerLevelInd: false,
        isChildAllowed: false,
        status: true,
    },
    {
        id: '340ae59c-c8b9-423c-a9ba-3d9fc4f08d19',
        hierarchyAttribueName: 'Product Division',
        hierarchyAttribueType: 'Product Hierarchy',
        hierarchyAttribueCode: 'PD',
        duplicateAllowedAtOtherParent: false,
        duplicateAllowedAtAttributerLevelInd: false,
        isChildAllowed: true,
        status: true,
    },
];

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

        findplaceholder('Please Enter Attribute Code');
    });
    test('render form', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please enter code');
    });
    test('render form', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please enter short description');
    });
    test('render form', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please enter long description');
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
    test('render status button', async () => {
        render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} />);
        commonDrawer();
        switchAvailablity('Status');
    });

    // test.only('render sku details ', async () => {
    //     render(<ProductHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} productHierarchyData={treeDatas} attributeData={Dropdata} />);
    //     commonTreeTest();
    //     treebranchClickAndTextFinder();
    //     const SkuField = await screen.getByRole('combobox', { name: '' });
    //     expect(SkuField).toBeTruthy();
    //     fireEvent.change(SkuField, { target: { value: 'Product SKU' } });

    //     const text = await screen.queryByText('Product Atrribute Details');
    //     expect(text).toBeInTheDocument();
    // });
});
