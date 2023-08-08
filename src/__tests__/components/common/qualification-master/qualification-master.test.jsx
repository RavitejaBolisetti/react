/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

import { QualificationMaster } from '@components/common/QualificationMaster/QualificationMaster';

const props = {
    isDataLoaded: jest.fn(),
    data: '',
    userId: '',
    filterString: jest.fn(),
    handleButtonClick: jest.fn(),
};

describe('Qualification Master Test', () => {
    it('should render qualification master page', () => {
        customRender(<QualificationMaster {...props} />);
        screen.debug();
        const qualificationName = screen.getAllByText('Qualification Name');
        expect(qualificationName).toBeTruthy();
    });
    it('should able to search data', async () => {
        customRender(<QualificationMaster {...props} />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        expect(inputBox.value.includes('Dmatest'));
        await act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
    });

    it('should click refresh', async () => {
        customRender(<QualificationMaster {...props} />);
        const buttonClick = screen.getByTestId('refreshBtn');
        expect(buttonClick).toBeTruthy();
        fireEvent.click(buttonClick);
    });

    it('should click img', async () => {
        customRender(<QualificationMaster {...props} />);
        const imgSearch = screen.getByRole('img', { name: 'search' });
        expect(imgSearch).toBeTruthy();
        fireEvent.click(imgSearch);

        const imgPlus = screen.getByRole('img', { name: 'plus' });
        expect(imgPlus).toBeTruthy();
        fireEvent.click(imgPlus);
    });

    it('should validate search', async () => {
        jest.setTimeout(200000);
        customRender(<QualificationMaster {...props} />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dm' } });
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

    it('add button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                QualificationMaster: {
                    qualificationnData: [],
                    applicationCriticalityGroupData: [
                        { id: 1, qualificationCode: 'A', qualificationDescription: 'hello', qualificationName: 'kartik', status: 0 },
                        { id: 2, qualificationCode: 'B', qualificationDescription: 'hello', qualificationName: 'Gupta', status: 1 },
                        { id: 3, qualificationCode: 'C', qualificationDescription: 'hello', qualificationName: 'kartik', status: 0 },
                    ],
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <QualificationMaster />
            </Provider>
        );
        const addButton = await screen.getByRole('button', { name: /Add/i });
        screen.getByRole('button', { name: /plus add/i });
        expect(addButton).toBeInTheDocument();
        fireEvent.click(addButton);
    });
});
