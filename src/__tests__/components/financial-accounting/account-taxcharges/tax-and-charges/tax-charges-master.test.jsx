/* eslint-disable jest/no-mocks-import */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { TaxChargesMaster } from 'components/FinancialAccounting';

afterEach(() => {
    jest.restoreAllMocks();
});

const data={
    HierarchyAttributeMaster: { data: [{hierarchyAttribueId: "TXCHTP", status: 'Active'}] },
    FinancialAccounting: {
        TaxCharges: { data: [
            {"id":null,"attributeTypeCode":"TXCHTP","parentCode":"DMS","parent":null,"taxChargesTypeCode":"TAXX1","taxChargesTypeDescription":"TAX FOR DESCRIPTION","calculationType":null,"rate":null,"percentage":null,"documentTypeCode":null,"financialAccountHeadCode":null,"status":true,"subChargeTypes":null},
            {"id":null,"attributeTypeCode":"TEST106","parentCode":"DMSS","parent":null,"taxChargesTypeCode":"TEST106","taxChargesTypeDescription":"TAX FOR DESCRIPTION","calculationType":null,"rate":null,"percentage":null,"documentTypeCode":null,"financialAccountHeadCode":null,"status":true,"subChargeTypes":null}
    ] },
    },
};

describe('TaxChargesMaster Component', () => {

    it('should render tax charges master component', () => {
        customRender(<TaxChargesMaster />);
    });

    it('tree select, edit and cancel button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: data,
        });
        customRender(
            <Provider store={mockStore}>
                <TaxChargesMaster />
            </Provider>
        );

        const treeField=screen.getByText('TAXX1');
        fireEvent.click(treeField);
        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('form should submitted successfully', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: data
        });
        customRender(
            <Provider store={mockStore}>
                <TaxChargesMaster handleSelectTreeClick={jest.fn()} />
            </Provider>
        );

        const treeField=screen.getByText('TAXX1');
        fireEvent.click(treeField);
        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const description=screen.getByRole('textbox', { name: 'Tax/Charge Type Descrption' });
        fireEvent.change(description, { target: { value: 'Test' } })
        
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('form should return errors on incorrect fields', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: data
        });
        customRender(
            <Provider store={mockStore}>
                <TaxChargesMaster handleSelectTreeClick={jest.fn()} />
            </Provider>
        );

        const treeField=screen.getByText('TAXX1');
        fireEvent.click(treeField);
        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const description=screen.getByRole('textbox', { name: 'Tax/Charge Type Descrption' });
        fireEvent.change(description, { target: { value: '' } })
        
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
    
    it('search and add button should work', () => {
        customRender(<TaxChargesMaster />);
        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Hello' }  });
        fireEvent.keyPress(searchBox, { key: "Enter", code: 13, charCode: 13 });
        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });

});
