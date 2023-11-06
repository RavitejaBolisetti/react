import '@testing-library/jest-dom/extend-expect';
import { UnMappingMaster } from '@components/Sales/OtfSoMappingUnmapping/MasterContainer/MappingAndUnmapping/UnmappingMaster/UnmappingMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/otfSoMappingUnmapping', () => ({
    otfSoMappingDataActions: {},
}));

describe('Vehicle Delivery Note Master components', () => {
    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTFSoMapping: {
                    OtfSoMapping: { isLoaded: true, data: { paginationData: [{ soNumber: 106, poNumber: 106, Date: '01/01/2001', modelDescription: 'Kai', otfNumber: 106, customerName: 'kartik', chassisNumber: 12121 }] } },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <UnMappingMaster saveData={saveData} fetchList={fetchList} MappingUnmapping={jest.fn()} resetData={jest.fn} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const customButton = screen.getByTestId('customButton');
        fireEvent.click(customButton);

        const customButton1 = screen.getAllByRole('button', { name: 'UNMAP' });
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
                    OtfSoMapping: { isLoaded: true, data: { paginationData: [{ soNumber: 106, poNumber: 106, Date: '01/01/2001', modelDescription: 'Kai', otfNumber: 106, customerName: 'kartik', chassisNumber: 12121 }] } },
                },
            },
        });

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <UnMappingMaster saveData={saveData} fetchList={fetchList} MappingUnmapping={jest.fn()} resetData={jest.fn} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const customButton = screen.getByTestId('customButton');
        fireEvent.click(customButton);

        const customButton1 = screen.getAllByRole('button', { name: 'UNMAP' });
        fireEvent.click(customButton1[0]);

        const cancelBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelBtn);
    });
});
