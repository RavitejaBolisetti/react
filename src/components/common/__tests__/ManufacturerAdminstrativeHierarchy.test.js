import { fireEvent, render, screen, waitFor, getByPlaceholderText } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '../ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ManufacturerTreeData as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { async } from 'sonarqube-scanner';
import userEvent from '@testing-library/user-event';
jest.mock('react-redux', () => ({
    connect: () => (ManufacturerAdminstrativeHierarchy) => ManufacturerAdminstrativeHierarchy,
}));

jest.mock('react-redux', () => ({
    connect: () => (ManufacturerAdminHierarchyChangeHistory) => ManufacturerAdminHierarchyChangeHistory,
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

describe('manufacturerAdminHierarchy component', () => {
    test('manufacturer administration hierarchy page render', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} manufacturerOrgHierarchyData={treeDatas} />);
        screentext('Hierarchy');
    });
    test('Manufacturer adminsration hierarchy page renders', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} manufacturerOrgHierarchyData={treeDatas} />);
        findbuttonAndClick('Upload');
    });
    // test.only('Manufacturer adminsration hierarchy page renders', async () => {
    //     render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} manufacturerOrgHierarchyData={treeDatas} />);
    //     findbuttonAndClick('Change History');
    // });
    test('Is search working', async () => {
        render(<ManufacturerAdminstrativeHierarchy hierarhyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} fetchList={fetchList} saveData={saveData} />);
        searchIsWorking();
    });
    test('Is the search field present or not', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} saveData={saveData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);
        searchFieldTest();
    });
    test('render form', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} listShowLoading={listShowLoading} />);

        findplaceholder('Please Enter Attribute Code');
    });

    test('render hierarchy details element', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);

        commonTreeTest();
    });
    test('render form element', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        treebranchClickAndTextFinder('Attribute Level');
    });
    test('render form element on edit button', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        commonDrawer();
    });

    test('close drawer', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        screentext('Hierarchy');
        commonTreeTest();
    });
    // test.only('render form card element on edit button', async () => {
    //     render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
    //     commonDrawer();
    //     const card = screen.queryByText('Authority Details');
    //     expect(card).toBeInTheDocument();
    //     fireEvent.click(card);
    // });
});
