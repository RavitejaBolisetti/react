import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { UnmappingAndCancellation } from 'components/Sales/OtfSoMappingUnmapping/MasterContainer/CancellationAndUnmapping';
import customRender from '@utils/test-utils';

describe('SO Cancellation and Unmapping Component', () => {

    it('should render so cancellation and mapping component UI', () => {
        customRender(<UnmappingAndCancellation />)
    });

    it('edit form should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTFSoMapping: {
                    OtfSoMapping: { isLoaded: true, data: { paginationData: [{ soNumber: 106, soStatus: 'Active', poNumber: 106, Date: '01/01/2001', modelDescription: 'Hello World', otfNumber: 106, customerName: 'Kai', chassisNumber: 106 }] } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <UnmappingAndCancellation />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const editBtn=screen.getByTestId('customButton');
        fireEvent.click(editBtn);

        const saveBtn=screen.getAllByRole('button', { name: 'UNMAP' });
        fireEvent.click(saveBtn[1]);

        fireEvent.click(editBtn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

    });

});