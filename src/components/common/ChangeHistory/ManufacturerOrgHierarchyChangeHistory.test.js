import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { ChangeHistory } from './ChangeHistory';
import { ManufacturerOrgHierarchyChangeHistory } from './ManufacturerOrgHierarchyChangeHistory';
import DataTable from '../../../utils/dataTable/DataTable';

jest.mock('react-redux', () => ({
    connect: () => (ChangeHistory) => ChangeHistory,
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
const ChangeHistoryDataManufacturerOrg = {
    changedDate: '2023-',
    changedBy: 'Mahindra',
    parentManufactOrgHie: 'Parent',
    hierarchyCode: 'IND',
    attributeCode: 'INDIA',
    shortDescript: 'AS121',
    longDescript: 'ASIA',
};
const ChangeHistoryData = {
    changedDate: '',
    changedBy: '',
    parentManufactOrgHie: '',
    hierarchyCode: '',
    attributeCode: '',
    shortDescript: '',
    longDescript: '',
    Status: '',
};


describe('ChangeHistory ManuOrg', () => {
    test('Is change History Text Present', async () => {
        render(<ManufacturerOrgHierarchyChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataManufacturerOrg} />);
        const ChangeHistoryPresent = screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test.only('Is Table Present', async () => {
        render(<ManufacturerOrgHierarchyChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryDataManufacturerOrg} />);
        const ModifiedDatePresent = screen.getByText('Changed Date');
        const ChangedBy = screen.getByText('Changed By');
        const parentManufactOrgHie = screen.getByText('Parent');
        const hierarchyCode = screen.getByText('Code');
        const longDescript = screen.getByText('Long Description');
        const attributeCode = screen.getByText('Attribute');
        const shortDescript = screen.getByText('Short Description');
        expect(ModifiedDatePresent).toBeInTheDocument();
        expect(ChangedBy).toBeInTheDocument();
        expect(shortDescript).toBeInTheDocument();
        expect(attributeCode).toBeInTheDocument();
        expect(longDescript).toBeInTheDocument();
        expect(hierarchyCode).toBeInTheDocument();
        expect(parentManufactOrgHie).toBeInTheDocument();
    });
});


describe('ChangeHistory Common', () => {
    test('Is change History Text Present', async () => {
        render(<ChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryData} />);
        const ChangeHistoryPresent = screen.getByText('Change History');
        expect(ChangeHistoryPresent).toBeInTheDocument();
    });
    test('Is Table Present', async () => {
        render(<ChangeHistory fetchChangeHistoryList={fetchChangeHistoryList} changeHistoryData={ChangeHistoryData} />);
        const ModifiedDatePresent = screen.getByText('Changed/Modified Date');
        const ChangedBy = screen.getByText('Changed By');
        const AttributeType = screen.getByText('Attribute');
        const HierarchyCode = screen.getByText('Code');
        const HierarchyName = screen.getByText('Parent');
        const ParentHierarchyCode = screen.getByText('Short Description');
        const ParentHierarchyName = screen.getByText('Long Description');
        expect(ModifiedDatePresent).toBeInTheDocument();
        expect(ChangedBy).toBeInTheDocument();
        expect(AttributeType).toBeInTheDocument();
        expect(HierarchyCode).toBeInTheDocument();
        expect(HierarchyName).toBeInTheDocument();
        expect(ParentHierarchyCode).toBeInTheDocument();
        expect(ParentHierarchyName).toBeInTheDocument();
    });
});
