import '@testing-library/jest-dom/extend-expect';
import { MappingMaster } from 'components/Sales/OtfSoMappingUnmapping/MasterContainer/MappingAndUnmapping';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/otfSoMappingUnmapping', () => ({
    otfSoMappingSearchDataActions: {},
}));

describe('Vehicle Delivery Note Master components', () => {
    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTFSoMapping: {
                    OtfNumberSearch: { isLoaded: true, data: [{ otfNumber: 106, otfDate: '01/01/2001', customerName: 'Test', cpd: '01/01/2001', chassisNumber: 106 }] },
                    OtfSoMapping: { isLoaded: true, data: { paginationData: [{ soNumber: 106, poNumber: 106, soDate: '01/01/2001', modelDescription: 'Kai' }] } },
                },
            },
        });

        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <MappingMaster saveData={saveData} MappingUnmapping={jest.fn()} resetData={jest.fn} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const customButton = screen.getByTestId('customButton');
        fireEvent.click(customButton);

        const customButton1 = screen.getAllByTestId('customButton');
        fireEvent.click(customButton1[1]);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('test2', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTFSoMapping: {
                    OtfNumberSearch: { isLoaded: true, data: [{ otfNumber: 106, otfDate: '01/01/2001', customerName: 'Test', cpd: '01/01/2001', chassisNumber: 106 }] },
                    OtfSoMapping: { isLoaded: true, data: { paginationData: [{ soNumber: 106, poNumber: 106, soDate: '01/01/2001', modelDescription: 'Kai' }] } },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <MappingMaster fetchList={fetchList} saveData={saveData} MappingUnmapping={jest.fn()} resetData={jest.fn} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const customButton = screen.getByTestId('customButton');
        fireEvent.click(customButton);

        const customButton1 = screen.getAllByTestId('customButton');
        fireEvent.click(customButton1[0]);

        const searchtextbox = screen.getByPlaceholderText('Search Booking Number');
        fireEvent.change(searchtextbox, { target: { value: 'Test' } });

        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);
    });
});
