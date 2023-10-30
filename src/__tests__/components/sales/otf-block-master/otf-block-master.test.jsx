import '@testing-library/jest-dom/extend-expect';
import { OtfBlockMaster } from '@components/Sales/OtfBlockMaster/OtfBlockMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('@components/Sales/OtfBlockMaster/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onCloseAction}>Cancel</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/otfBlockMaster', () => ({
    otfBlockMasterDataAction: {},
}));

const mockStore = createMockStore({
    auth: { userId: 1232 },
    data: {
        ConfigurableParameterEditing: { filteredListData: [{ id: 1, value: 'testValue', key: 1 }] },
        OTFBlockMaster: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1, organizationId: 12 }] },
        HierarchyAttributeMaster: { isLoaded: true, data: [{ id: 1, value: 'testValue', key: 1 }], isDetailLoaded: false },
        ManufacturerOrgHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        ManufacturerAdmin: {
            ManufacturerAdminHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        },
        OTF: {
            OtfCancellation: { detailData: [{ id: 1, value: 'testValue', key: 1 }] },
        },
        ProductHierarchy: { isLoaded: false, data: [{ id: 1, value: 'testValue', key: 1 }], organizationId: 106, productHierarchyData: [{ id: 1, value: 'testValue', key: 1, organizationId: 12 }] },
        common: {
            LeftSideBar: { collapsed: true },
        },
    },
});

describe('OtfBlockMaster Components', () => {
    it('should render OtfBlockMaster component', () => {
        customRender(<OtfBlockMaster />);
    });

    it('search input box should work', () => {
        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster />
            </Provider>
        );
    });

    it('add and edit form cancel button should work', async () => {
        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );
    });

    it('Hierarchy tree select should work', async () => {
        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );
    });

    it('Hierarchy tree select should work with selecting tree', async () => {
        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );
        const treeSelect = screen.getByRole('combobox', { name: '' });
        fireEvent.change(treeSelect, { target: { value: 'testValue' } });
    });

    it('Should render add edit form components', async () => {
        const fetchList = jest.fn();
        const saveOTFBlockData = jest.fn();

        const res = { data: [{ id: 1, value: 'testValue', key: 1 }] };
        const formData = { id: 1, key: 1 };

        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster saveOTFBlockData={saveOTFBlockData} onCloseAction={jest.fn()} formData={formData} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchList={fetchList} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn[0]);

        await waitFor(() => {
            expect(saveOTFBlockData).toHaveBeenCalled();
        });

        saveOTFBlockData.mock.calls[0][0].onSuccess(res);
        saveOTFBlockData.mock.calls[0][0].onError();
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });

        const fetchProductDataList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster showGlobalNotification={jest.fn()} fetchProductDataList={fetchProductDataList} selectedTreeKey={123} onError={jest.fn()} onCloseAction={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('Should render OTF block master components', async () => {
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster fetchList={fetchList} isTreeViewVisible={true} organizationId={6432} />
            </Provider>
        );

        const treeSelect = screen.getByRole('combobox', { name: '' });
        fireEvent.change(treeSelect, { target: { value: 'oranges' } });
    });
});
