import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act, waitFor } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { HierarchyAttribute } from 'components/common/HierarchyAttribute';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

beforeEach(() => {
    jest.clearAllMocks();
});  

jest.mock('store/actions/data/hierarchyAttributeMaster', () => ({
    hierarchyAttributeMasterDataActions: {},
}))

describe('Hierarchy Attribute - Add edit form component', () => {

    it('add button, form inputs and cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HierarchyAttributeMaster: { 
                    detailData: { 
                        hierarchyAttribute: [{name: 'test'}] 
                    } 
                },
            },
        });

        const hierarchyAttributeFetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute hierarchyAttributeFetchList={hierarchyAttributeFetchList} resetData={jest.fn()} />
            </Provider>
        );

        hierarchyAttributeFetchList.mock.calls[0][0].onSuccessAction();
        hierarchyAttributeFetchList.mock.calls[0][0].onErrorAction();

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
        const codeInput=screen.getByRole('textbox', { name: 'Code' });
        fireEvent.change(codeInput, { target: { value: 'Hello World' } });
        const nameInput=screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(nameInput, { target: { value: 'Hello World' } });
        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('form should work and submitted successfully', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HierarchyAttributeMaster: { 
                    detailData: { 
                        hierarchyAttribute: [{name: 'test'}] 
                    } 
                },
            },
        });

        const hierarchyAttributeSaveData=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute hierarchyAttributeFetchList={jest.fn()} hierarchyAttributeSaveData={hierarchyAttributeSaveData} />
            </Provider>
        );

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const codeInput=screen.getByRole('textbox', { name: 'Code' });
        fireEvent.change(codeInput, { target: { value: '106' } });

        const nameInput=screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(nameInput, { target: { value: 'Hello World' } });

        const saveBtn=screen.getByRole('button', { name: 'Save and New' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(hierarchyAttributeSaveData).toHaveBeenCalled());

        hierarchyAttributeSaveData.mock.calls[0][0].onSuccess();
    });

});

describe('Hierarchy Attribute Master component', () => {

    it('should render the hierarchy attribute master component', () => {
        customRender(<HierarchyAttribute />);
    });

    it('search, select type and refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HierarchyAttributeMaster: { 
                    data: ['Tax Test', 'Charges Test'],
                    detailData: { 
                        hierarchyAttribute: [{name: 'test'}] 
                    } 
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute hierarchyAttributeFetchList={jest.fn()} hierarchyAttributeFetchDetailList={jest.fn()} />
            </Provider>
        );

        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Hello' } });
        const searchBtn=screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchBtn);  

        const hierarchyType=screen.getByRole('combobox', { name: '' });
        act(() => {
            fireEvent.change(hierarchyType, { target: { value: 'Tax Test' } });
            const optionSelect=screen.getAllByText(/Tax Test/i);
            fireEvent.click(optionSelect[1]);
        });

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);
        
    });

    it('select type with refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HierarchyAttributeMaster: { 
                    data: ['Tax Test', 'Charges Test'],
                    detailData: { 
                        hierarchyAttribute: [{name: 'test'}] 
                    } 
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute hierarchyAttributeFetchList={jest.fn()} hierarchyAttributeFetchDetailList={jest.fn()} />
            </Provider>
        );
        const hierarchyType=screen.getByRole('combobox', { name: '' });
        act(() => {
            fireEvent.change(hierarchyType, { target: { value: 'Tax Test' } });
            const optionSelect=screen.getAllByText(/Tax Test/i);
            fireEvent.click(optionSelect[1]);
        });  

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);
    });

});
