import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ManufacturerOrgHierarchyChangeHistory } from '../ManufacturerOrganizationHierarchy/ManufacturerOrgHierarchyChangeHistory';

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
        parentManufactOrgHie: 'DMS-1',
        hierarchyCode: 'IND',
        attributeCode: 'INDIA',
        shortDescript: 'AS121',
        longDescript: 'ASIA',
        status: 'Y',
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
        render(<ManufacturerOrgHierarchyChangeHistory fetchList={fetchList} hierarchyAttributeFetchList={hierarchyAttributeFetchList} fetchChangeHistoryList={fetchChangeHistoryList} />);

        const ChangeHistoryPresent = await screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test('Is Table Present', async () => {
        render(<ManufacturerOrgHierarchyChangeHistory fetchList={fetchList} fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataManuOrg} />);

        const ModifiedDatePresent = screen.getByText('Changed Date');
        const ChangedBy = await screen.getByText('Changed By');
        const AttributeType = screen.getByText('Attribute');
        const HierarchyCode = screen.getByText('Code');
        const HierarchyName = screen.getByText('DMS-1');
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
    });
});
