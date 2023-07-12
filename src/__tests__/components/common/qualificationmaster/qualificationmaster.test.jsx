import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { render, screen, fireEvent, userEvent, getByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { QualificationMaster } from '@components/common/QualificationMaster/QualificationMaster';

describe('Qualification Master Test', () => {
    it('should render qualification master page', () => {
        customRender(<QualificationMaster />);
        expect(screen.getAllByText(/Qualification Name/i)).toBeTruthy();
    });
    it('should able to search data', async () => {
        customRender(<QualificationMaster />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        expect(inputBox.value.includes('Dmatest'));
        await act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
    });
    it('should click add', async () => {
        customRender(<QualificationMaster />);
        await act(async () => {
            const buttonClick = screen.getByRole('button', { name: /Add/i });
            fireEvent.click(buttonClick);
        });
    });

    it('should validate search', async () => {
        customRender(<QualificationMaster />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dm' } });
        // expect(inputBox.value.includes('Dmatest'));
        await act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
        expect(
            await screen.findByText('Please enter atleast 3 character to search', undefined, {
                timeout: 5000,
            })
        ).toBeVisible();
    });
});
