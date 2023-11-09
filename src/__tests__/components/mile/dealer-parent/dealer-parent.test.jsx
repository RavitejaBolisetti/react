/* eslint-disable jest/no-mocks-import */
import '@testing-library/jest-dom/extend-expect';
import { DealerParent } from 'components/Mile/DealerParent/DealerParent';
import { fireEvent, screen, waitFor } from "@testing-library/react";
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('store/actions/data/dealer/dealerParent', () => ({
    dealerParentDataActions: {}
}));

jest.mock('components/Mile/DealerParent/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction }) => <div><button onClick={onFinish}>Save</button><button onClick={onCloseAction}>Cancel</button></div>;
    return {
        __esModule: true,
        AddEditForm,
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('DealerParent Component Render', () => {

    it('should render table header', () => {
        customRender(<DealerParent />);
    });

    it('search should work', ()=>{
        customRender(<DealerParent />);

        const groupNameTextBox = screen.getByRole('textbox', {name:'Group Name'});
        fireEvent.change(groupNameTextBox, {target: {value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);

        const clearBtn=screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(clearBtn);

        fireEvent.change(groupNameTextBox, {target: {value:''}});
        fireEvent.click(searchImg);

    });

    it('should load the data', ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
        });

        const fetchList=jest.fn();
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onErrorAction();
        fetchList.mock.calls[0][0].onSuccessAction();
    });


    it('save button should work onFinishFailed', async ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: { isLoaded: false, data: [] },
                },
            },
        });

        const saveData=jest.fn();
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent saveData={saveData} fetchList={jest.fn()} />
            </Provider>
        );   

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('view and save button should work', async ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: { isLoaded: true, isLoading: false, data: [{code: 106, name: 'Kai', title: 'Example Title', ownerName: 'Example Owner'}] },
                },
            },
        });

        const saveData=jest.fn();
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent saveData={saveData} fetchList={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const groupNameTextBox = screen.getByRole('textbox', { name:'Group Name' });
        fireEvent.change(groupNameTextBox, { target: { value:'Kai' } });

        const searchImg = screen.getByRole('img', { name:'search' });
        fireEvent.click(searchImg);

        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        saveData.mock.calls[0][0].onError();
        saveData.mock.calls[0][0].onSuccess();
    });

    it('close button should work', async ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: { isLoaded: true, isLoading: false, data: [{code: 106, name: 'Kai', title: 'Example Title', ownerName: 'Example Owner'}] },
                },
            },
        });

        const saveData=jest.fn();
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent saveData={saveData} fetchList={jest.fn()} />
            </Provider>
        );

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('refresh button should work', async ()=>{
        const mockStore = createMockStore({
            auth: { userId:'123' },
            data: {
                DealerHierarchy: {
                    DealerParent: { isLoaded: true, isLoading: false, data: [{code: 106, name: 'Kai', title: 'Example Title', ownerName: 'Example Owner'}] },
                },
            },
        });
        
        customRender(
            <Provider store={mockStore}>
                <DealerParent fetchList={jest.fn()} />
            </Provider>
        );

        const refreshBtn=screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);
    });

});
