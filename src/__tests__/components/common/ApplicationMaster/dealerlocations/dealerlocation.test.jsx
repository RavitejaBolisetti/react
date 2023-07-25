import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId, change } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { act } from 'react-dom/test-utils';
import { AccessibleDealerLocations } from '@components/common/ApplicationMaster/dealerLocations/AccessibleDealerLocations';

const props = {
    handleDeleteLocation: jest.fn(),
    setCanFormSave: jest.fn(),
    userId: '',
    dealerLocations: '',
    setFinalFormdata: jest.fn(),
    finalFormdata: { accessibleLocation: [{ id: 'ace07c15-2d0b-451a-838d-7dc43722ef3b', dealerMasterLocationId: '2e8b2c85-7b16-46a2-a805-530167ad77f5', locationName: 'Agra' }] },
    fetchDealerLocations: jest.fn(),
    locationDataLoding: jest.fn(),
    showGlobalNotification: jest.fn(),
};

describe('Dealer Location component render', () => {
    it('should able to search data', async () => {
        customRender(<AccessibleDealerLocations notFoundContent="No location found" {...props} />);
        screen.debug();

        const inputBox = screen.getByRole('combobox');
        fireEvent.change(inputBox, { target: { value: 'Agra' } });
        expect(inputBox.value.includes('Agra'));
        await act(async () => {
            const searchButton = screen.getByRole('img', { name: /search/i });
            fireEvent.click(searchButton);
        });
        expect(
            await screen.findByText('No location found', undefined, {
                timeout: 5000,
            })
        ).not.toBeVisible();

        const renderText = screen.findByText('Agra');
        expect(renderText).toBeTruthy();
    });
});
