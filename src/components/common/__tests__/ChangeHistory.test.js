import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';
import { ChangeHistoryGeo } from '../ChangeHistory/ChangeHistoryGeo';
import DataTable from '../../../utils/dataTable/DataTable';

jest.mock('react-redux', () => ({
    connect: () => (ChangeHistoryGeo) => ChangeHistoryGeo,
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
const saveData = () => {
    return;
};
const ChangeHistoryDataGeo = [
    {
        changedDate: '2023-3-4',
        changedBy: 'Mahindra',
        attributeType: 'Parent',
        geoCode: 'IND',
        geoName: 'INDIA',
        parentCode: 'AS121',
        parentName: 'ASIA',
    },
];
const ChangeHistoryData = [
    {
        changedDate: '2023-3-4',
        changedBy: 'Mahindra',
        parentAttributeName: 'DMS-1',
        prodctCode: 'IND',
        parntHeirarchyCode: 'INDIA',
        prodctShrtDescription: 'AS121',
        prodctLongDiscription: 'ASIA',
        status:"Active",
    },
];


describe('ChangeHistory Geo', () => {
    test('Is change History Text Present', async () => {
        render(<ChangeHistoryGeo fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataGeo} />);
        const ChangeHistoryPresent = await screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test('Is Table Present', async () => {
        render(<ChangeHistoryGeo fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataGeo} />);
        const ModifiedDatePresent = await screen.getByText('Changed/Modified Date');
        const ChangedBy = await screen.getByText('Changed By');
        const AttributeType = await screen.getByText('Attribute Type');
        const HierarchyCode = await screen.getByText('Hierarchy Code');
        const HierarchyName = await screen.getByText('Hierarchy Name');
        const ParentHierarchyCode = await screen.getByText('Parent Hierarchy Code');
        const ParentHierarchyName = await screen.getByText('Parent Hierarchy Name');
        expect(ModifiedDatePresent).toBeInTheDocument();
        expect(ChangedBy).toBeInTheDocument();
        expect(AttributeType).toBeInTheDocument();
        expect(HierarchyCode).toBeInTheDocument();
        expect(HierarchyName).toBeInTheDocument();
        expect(ParentHierarchyCode).toBeInTheDocument();
        expect(ParentHierarchyName).toBeInTheDocument();
    });
});
describe('ChangeHistory Common', () => {
    test('Is change History Text Present', async () => {
        render(<ChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryData}   />);
        const ChangeHistoryPresent = await screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test('Is Table Present', async () => {
        render(<ChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryData} />);
        const ModifiedDatePresent = await screen.getByText('Changed/Modified Date');
        const ChangedBy = await screen.getByText('Changed By');
        const AttributeType = await screen.getByText('Attribute');
        const HierarchyCode = await screen.getByText('Code');
        const HierarchyName = await screen.getByText('DMS-1');
        const ParentHierarchyCode = await screen.getByText('Short Description');
        const ParentHierarchyName = await screen.getByText('Long Description');
        expect(ModifiedDatePresent).toBeInTheDocument();
        expect(ChangedBy).toBeInTheDocument();
        expect(AttributeType).toBeInTheDocument();
        expect(HierarchyCode).toBeInTheDocument();
        expect(HierarchyName).toBeInTheDocument();
        expect(ParentHierarchyCode).toBeInTheDocument();
        expect(ParentHierarchyName).toBeInTheDocument();
    });
});
