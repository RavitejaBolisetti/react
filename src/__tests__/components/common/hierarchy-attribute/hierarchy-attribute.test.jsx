import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { HierarchyAttribute } from 'components/common/HierarchyAttribute';

beforeEach(() => {
    jest.clearAllMocks();
});  

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
        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute />
            </Provider>
        );
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
        customRender(
            <Provider store={mockStore}>
                <HierarchyAttribute onFinish={jest.fn()} onFinishFailed={jest.fn()}/>
            </Provider>
        );
        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
        const codeInput=screen.getByRole('textbox', { name: 'Code' });
        fireEvent.change(codeInput, { target: { value: 'Hello World' } });
        const nameInput=screen.getByRole('textbox', { name: 'Name' });
        fireEvent.change(nameInput, { target: { value: 'Hello World' } });
        // const saveBtn=screen.getByRole('button', { name: 'Save' });
        // fireEvent.click(saveBtn);
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
                <HierarchyAttribute onFinish={jest.fn()} />
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
                <HierarchyAttribute onFinish={jest.fn()} />
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
