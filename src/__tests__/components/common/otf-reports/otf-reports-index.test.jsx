import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { OtfReportsMaster } from '@components/common/OTFReports/OtfReportsMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Booking Reports components', () => {
    it('should render OTFReports components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OtfReports: { isLoaded: false, data: [{ status: 'Active' }] },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfReportsMaster />
            </Provider>
        );
    });

    it('download button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OtfReports: { isLoaded: true, data: [{ status: 'Active' }] },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfReportsMaster />
            </Provider>
        );
        const selectColumn = screen.getByRole('button', { name: 'Download' });
        fireEvent.click(selectColumn);
    });

    it('test for all fields', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OtfReports: { isLoaded: true, data: [{ status: 'Active' }] },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <OtfReportsMaster />
            </Provider>
        );

        const modelGrp = screen.getByRole('combobox', { name: 'Model Group' });
        fireEvent.change(modelGrp, { target: { value: 'Dmatest' } });

        const location = screen.getByRole('combobox', { name: 'Location' });
        fireEvent.change(location, { target: { value: 'Dmatest' } });

        const aging = screen.getByRole('combobox', { name: 'Aging' });
        fireEvent.change(aging, { target: { value: 'Dmatest' } });

        const selectColumn = screen.getByRole('combobox', { name: 'Column' });
        fireEvent.change(selectColumn, { target: { value: 'Dmatest' } });
    });
});
