import { fireEvent, render, screen, waitFor, getByPlaceholderText } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '../ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ManufacturerTreeData as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { async } from 'sonarqube-scanner';
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
});
