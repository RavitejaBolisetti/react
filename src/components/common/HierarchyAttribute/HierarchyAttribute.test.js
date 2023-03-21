import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Table } from 'antd';
import userEvent from '@testing-library/user-event';
import { HierarchyAttribute } from './HierarchyAttribute';
import DataTable from '../../../utils/dataTable/DataTable';

jest.mock('react-redux', () => ({
    connect: () => (HierarchyAttribute) => HierarchyAttribute,
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
const attributeData = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'];
const detailData = {
    hierarchyAttribueId: 'id',
    hierarchyAttribute: [
        {
            hierarchyAttribueCode: 'Shaka',
            hierarchyAttribueName: 'shaka',
            duplicateAllowedAtAttributerLevelInd: '',
            duplicateAllowedAtOtherParent: '',
            isChildAllowed: '',
            status: '',
            action: '',
        },
    ],
};
const hierarchyAttributeFetchList = () => {
    return;
};
const hierarchyAttributeFetchDetailList = () => {
    return;
};

describe('Hierarchy attributree test', () => {
    test('Is the select Field Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
    });
    test('Is Drop Down coming on click of select Field', async () => {
        render(<HierarchyAttribute attributeData={attributeData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = screen.getAllByText('option 1');
        expect(options).toBeTruthy();
    });
    test('Is table Rendering on Data', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 7' } });
        const options = await screen.findAllByText('Shaka');
        expect(options).toBeTruthy();
    });
    test('Is Edit Button Present in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: 'Hierarchy Attribute Type' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'option 1' } });
        const options = await screen.findAllByText('Shaka');
        expect(options).toBeTruthy();
        // const EditButton=await screen.getAllByRole('list',{name:""});
        // expect(EditButton).toBeTruthy();
        // fireEvent.click(EditButton);
        const AddAttributeBtn = await screen.findByText('Add Attribute');
        expect(AddAttributeBtn).toBeInTheDocument();
        fireEvent.click(AddAttributeBtn);

        const InputField = await screen.findByPlaceholderText('Please Input Code');
        expect(InputField).toBeTruthy();

        const CancelBtn = await screen.findByText('Cancel');
        expect(CancelBtn).toBeTruthy();
        fireEvent.click(CancelBtn);

        
        const InputFieldAfterClose = await screen.findByPlaceholderText('Please Input Code');
        
        expect(InputFieldAfterClose).toBeFalsy();

    });
});
