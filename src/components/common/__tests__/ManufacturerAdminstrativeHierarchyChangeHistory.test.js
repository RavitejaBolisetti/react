import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';

import { ManufacturerAdminHierarchyChangeHistory } from '../ManufacturerAdminstrativeHierarchy/ManufacturerAdminHierarchyChangeHistory';

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

const fetchChangeHistoryList = () => {
    return;
};
const hierarchyAttributeFetchList = () => {
    return;
};
const fetchList = () => {
    return;
};

const ChangeHistoryDataManuOrg = [
    {
        changedDate: '2023',
        changedBy: 'Mahindra',
        attributeCode: 'DMS-1',
        authorityType: 'IND',
        employeeCode: 'INDIA',
        shortDescript: 'AS121',
        longDescript: 'ASIA',
        status: 'Y',
        employeeName: 'INDIA',
        dateEffectiveFrom: '2022',
        dateEffectiveTo: '2022',
        parent: 'DMS',
    },
];
// const ChangeHistoryData = {
//     changedDate: '',
//     changedBy: '',
//     parentManufactOrgHie: '',
//     hierarchyCode: '',
//     attributeCode: '',
//     shortDescript: '',
//     longDescript: '',
//     Status: '',
// };

///Change History Test Cases///

describe('ChangeHistory ManuOrg', () => {
    test('Is change History Text Present', async () => {
        render(<ManufacturerAdminHierarchyChangeHistory fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} fetchChangeHistoryList={fetchChangeHistoryList} />);

        const ChangeHistoryPresent = await screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test('Is Table Present', async () => {
        render(<ManufacturerAdminHierarchyChangeHistory fetchList={fetchList} fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataManuOrg} />);

        const ModifiedDatePresent = screen.getByText('Changed/Modified Date');
        const ChangedBy = screen.getByText('Changed By');
        const AttributeType = screen.getByText('Attribute Code');
        const HierarchyCode = screen.getByText('Authority type');
        const HierarchyName = screen.getByText('Employee Code');
        const EmployeeName = screen.getByText('Employee Name');
        const DateEffectiveFrom = screen.getByText('Date Effective From');
        const DateEffectiveTo = screen.getByText('Date Effective To');
        const Parent = screen.getByText('Parent');
        const ParentHierarchyCode = screen.getByText('Short Description');
        const ParentHierarchyName = screen.getByText('Long Description');
        const Status = screen.getByText('Active');
        expect(ModifiedDatePresent).toBeInTheDocument();
        expect(ChangedBy).toBeInTheDocument();
        expect(AttributeType).toBeInTheDocument();
        expect(HierarchyCode).toBeInTheDocument();
        expect(HierarchyName).toBeInTheDocument();
        expect(ParentHierarchyCode).toBeInTheDocument();
        expect(ParentHierarchyName).toBeInTheDocument();
        expect(Status).toBeInTheDocument();
        expect(Parent).toBeInTheDocument();
        expect(DateEffectiveFrom).toBeInTheDocument();
        expect(DateEffectiveTo).toBeInTheDocument();
        expect(EmployeeName).toBeInTheDocument();
    });
});
