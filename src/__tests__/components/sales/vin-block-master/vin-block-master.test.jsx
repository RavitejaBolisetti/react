import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { VinBlockMaster } from 'components/Sales/VinBlockMaster';

jest.mock('store/actions/data/vehicle/vinBlockMasterAction', () => ({
    vinBlockMasterAction: {}
}));

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vin Block Master Component', () => {

    it('should render vin block master component', async () => {
        customRender(<VinBlockMaster />);
    });

    it('search should work', async () => {
        customRender(<VinBlockMaster setFilterString={jest.fn()} />);

        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('data should work, view and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VinBlockMasterDetails: { isLoaded: true, data: { paginationData: [{ vin: 106, modelDescription: 'Kai', dealerCode: 106 }] } },
                },
            },
        });

        const fetchVinBlockList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <VinBlockMaster fetchVinBlockList={fetchVinBlockList} />
            </Provider>
        );

        fetchVinBlockList.mock.calls[0][0].onErrorAction();
        fetchVinBlockList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });
        
        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);

    });

    it('remove filter and clear button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Vehicle: {
                    VinBlockMasterDetails: { isLoaded: true, data: { paginationData: [{ vin: 106, modelDescription: 'Kai', dealerCode: 106 }] }, filter: { vin: 106, modelDescription: 'Kai', dealerCode: 106, advanceFilter: true } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <VinBlockMaster fetchVinBlockList={jest.fn()} setFilterString={jest.fn()} />
            </Provider>
        );

        const removeFilter = screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[1]);

        const clearBtn=screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);

    });

});
