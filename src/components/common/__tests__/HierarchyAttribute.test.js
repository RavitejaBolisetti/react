import { fireEvent, render, screen } from '@testing-library/react';
import { HierarchyAttribute } from '../HierarchyAttribute/HierarchyAttribute';
import comonTest from './comonTest.js';
import { showGlobalNotification } from 'store/actions/notification';

import { InputFieldAvailablity, buttonLookAndFireEventByRole, buttonLookAndFireEventWithLabel, buttonLookAndFireEventWithText, searchFieldTest, switchAvailablity } from './Common/tableWithDrawer/common';

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

const attributeData = ['TST1', 'Test1235', 'TEST12345', 'Test12345', 'TEST1234', 'Test12', 'TEST1', 'Test1', 'Product Hierarchy', 'Manufacturer Organization', 'Manufacturer Administration', 'Geographical', 'Dealer Manpower Hierarchy', 'Dealer Hierarchy'];
const detailData = {
    hierarchyAttribueType: 'Test1235',
    hierarchyAttribute: {
        duplicateAllowedAtAttributerLevelInd: true,
        duplicateAllowedAtOtherParent: true,
        hierarchyAttribueCode: 'Shaka',
        hierarchyAttribueName: 'shaka',
        id: '295a0c46-2356-454a-9ccb-dc138ae4f5b5',
        isChildAllowed: true,
        status: true,
    },
};

const hierarchyAttributeFetchList = () => {
    return;
};
const hierarchyAttributeFetchDetailList = () => {
    return;
};
const onSaveShowLoading = () => {
    return;
};
const hierarchyAttributeSaveData = () => {
    return;
};

describe('Hierarchy attributree test', () => {
    comonTest(onSaveShowLoading, hierarchyAttributeFetchList, hierarchyAttributeFetchDetailList);
    test('Is the select Field Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const options = screen.getAllByText('Test1235');
        expect(options).toBeTruthy();
    });

    test('Is searchfield Present or not', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox');
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const options = screen.getAllByText('Test1235');
        expect(options).toBeTruthy();
        searchFieldTest();
    });

    test('Is the Refresh Button Present or not', () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        buttonLookAndFireEventWithLabel('fa-ref');
    });

    test('Is Add Attribute Button Present on  render of Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        buttonLookAndFireEventWithText('Add Attribute');
        switchAvailablity('fi-switch');
        switchAvailablity('fi2-switch');
        switchAvailablity('fa-switch');
        switchAvailablity('fa2-switch');
        InputFieldAvailablity('Please enter code');
        InputFieldAvailablity('Please enter name');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('Edit Functionality in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });

        buttonLookAndFireEventWithLabel('fa-edit'); //click on edit button
    });
    test('View Functionality in Table', async () => {
        render(<HierarchyAttribute attributeData={attributeData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        const textfield = await screen.findByText('Hierarchy Attribute Type');
        expect(textfield).toBeTruthy();
        buttonLookAndFireEventWithLabel('ai-view');
        InputFieldAvailablity('Code');
        InputFieldAvailablity('Name');
        buttonLookAndFireEventByRole('Edit');
    });

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        render(<HierarchyAttribute showGlobalNotification={showGlobalNotification} attributeData={attributeData} hierarchyAttributeSaveData={hierarchyAttributeSaveData} detailData={detailData} hierarchyAttributeFetchList={hierarchyAttributeFetchList} hierarchyAttributeFetchDetailList={hierarchyAttributeFetchDetailList} />);
        const selectfield = screen.getByRole('combobox', { name: '' });
        expect(selectfield).toBeTruthy();
        fireEvent.change(selectfield, { target: { value: 'Test1235' } });
        buttonLookAndFireEventWithText('Add Attribute');
        InputFieldAvailablity('Please enter name');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            hierarchyAttribueCode: 'Shaka',
            hierarchyAttribueName: 'shaka',
        });

        const result = await onFinish();
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
