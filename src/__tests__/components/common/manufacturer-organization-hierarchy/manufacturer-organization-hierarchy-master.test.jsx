import '@testing-library/jest-dom/extend-expect';
import { ManufacturerOrgHierarchy } from '@components/common/ManufacturerOrganizationHierarchy';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer Org Hierarchy Change History components', () => {
    it('should render ManufacturerOrgHierarchy components', async () => {
        customRender(<ManufacturerOrgHierarchy />);

        const addBtn = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelBtn);
    });

    it('test for search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ManufacturerOrgHierarchy: {
                    isLoaded: true,
                    data: [
                        { id: '1', value: 'kai' },
                        { id: '2', value: 'kai' },
                    ],
                },
                HierarchyAttributeMaster: {
                    isLoaded: true,
                    data: [
                        { key: '1', value: 'kai' },
                        { key: '2', value: 'kai' },
                    ],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ManufacturerOrgHierarchy />
            </Provider>
        );

        const searchBox = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchBox, { target: { value: 'Test' } });
        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);

        const changeHistoryBtn = screen.getByRole('button', { name: /Change History/i });
        fireEvent.click(changeHistoryBtn);
    });
});
