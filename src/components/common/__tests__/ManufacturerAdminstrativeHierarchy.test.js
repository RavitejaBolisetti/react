import { fireEvent, render, screen, waitFor, getByPlaceholderText } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '../ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import { axiosCall, commonDrawer, commonTreeTest, editClickAfterTreeSelect, findbuttonAndClick, findplaceholder, screentext, searchFieldTest, searchIsWorking, textFindAfterClick, textFindAfterClickinDrawer, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ManufacturerTreeData as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';
import { async } from 'sonarqube-scanner';
import userEvent from '@testing-library/user-event';
import { BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY } from '../../../constants/routingApi';
import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, inputFieldLookAndtextChange } from './Common/tableWithDrawer/common';
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

    test('render data', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} listShowLoading={listShowLoading} />);
        axiosCall(BASE_URL_MANUFACTURER_ADMINISTRATION_HIERARCHY, manufacturerAdminHierarchyDataActions.fetchList);
    });
    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<ManufacturerAdminstrativeHierarchy manufacturerOrgHierarchyData={treeDatas} fetchList={fetchList} saveData={saveData} />);
        screentext('Hierarchy');
        commonTreeTest();
        buttonLookAndFireEventWithText('Add Child');
        findplaceholder('Please enter Short Description');
        findplaceholder('Please enter Attribute Code');

        onFinish.mockResolvedValue({
            manufactureAdminShortName: 'MNM',
            manufactureAdminCode: '1234',
        });

        const result = await onFinish();
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
    test('after drawer opening clicking on authority details ', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        textFindAfterClickinDrawer();
        buttonLookAndFireEventWithText('Authority Details');
        findplaceholder('Select Authority Type');
        findplaceholder('Please enter Token');
    });
    test('after drawer opening clicking on authority details ', async () => {
        render(<ManufacturerAdminstrativeHierarchy fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} manufacturerOrgHierarchyData={treeDatas} />);
        textFindAfterClickinDrawer();
        buttonLookAndFireEventWithText('Authority Details');
        buttonLookAndFireEventWithLabel('Authority Details');
        findplaceholder('Select Authority Type');
        findplaceholder('Please enter Token');
    });
});
