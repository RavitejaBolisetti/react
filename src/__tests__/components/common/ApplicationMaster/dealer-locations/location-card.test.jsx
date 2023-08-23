import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import LocationCard from '@components/common/ApplicationMaster/dealerLocations/LocationCard';

const props = {
    locationName: '',
    id: '',
    handleDeleteLocation: jest.fn(),
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Location card component render', () => {
    it('should render card', async () => {
        customRender(<LocationCard {...props} />);
        const text = screen.findByText('NaN');
        expect(text).toBeTruthy();
        const renderButton = screen.getByRole('button');
        expect(renderButton).toBeTruthy();
        fireEvent.click(renderButton);
    });
});
