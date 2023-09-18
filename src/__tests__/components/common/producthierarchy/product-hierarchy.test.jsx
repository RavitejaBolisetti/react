import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ProductHierarchy } from '@components/common/ProductHierarchy/ProductHierarchy';
import { fireEvent, screen } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Producthierarchy Components', () => {
    it('should render producthierarchy component', () => {
        customRender(<ProductHierarchy />);
    });

    it('search input box should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: {
                    organizationId: true,
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ProductHierarchy />
            </Provider>
        );
        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });
    });

    it('add and edit form cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: {
                    organizationId: true,
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ProductHierarchy onCloseAction={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add' });

        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        fireEvent.click(cancelBtn);
    });

    it('Hierarchy tree select should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: {
                    organizationId: true,
                    data: [{ id: '106', prodctLongName: 'Kai', prodctShrtName: 'Kai', prodctCode: '106', active: true, attributeKey: '106' }],
                    changeHistoryVisible: true,
                    isVisible: true,
                },
                HierarchyAttributeMaster: {
                    data: [{ status: 'active' }],
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ProductHierarchy onCloseAction={jest.fn()} fetchProductDetail={jest.fn()} />
            </Provider>
        );
        const treeSelect = screen.getByText('Kai');

        fireEvent.click(treeSelect);
    });

    it('Hierarchy tree select should work with selecting tree', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ProductHierarchy: {
                    organizationId: false,
                },
                ManufacturerOrgHierarchy: {
                    data: [{ id: '106', manufactureOrgLongName: 'Kai', manufactureOrgShrtName: 'Kai', manufactureOrgCode: 'Kai', manufactureOrgParntId: 'null', active: true, attributeKey: '106', subManufactureOrg: [] }],
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ProductHierarchy onCloseAction={jest.fn()} />
            </Provider>
        );
        const treeSelect = screen.getByRole('combobox', { name: '' });
        fireEvent.change(treeSelect, { target: { value: 'Kai' } });
        const treeData = screen.getByText('Kai');

        fireEvent.click(treeData);
    });
});
