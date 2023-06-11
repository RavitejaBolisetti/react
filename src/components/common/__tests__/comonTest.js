import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QualificationMaster } from '../QualificationMaster/QualificationMaster';

const comonTest = ({ fetchChangeHistoryList, fetchList, saveData, listShowLoading }) =>
    test('Is the search Field Present or not qwertyuiwertyui', () => {
        render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        const searchField = screen.findByPlaceholderText('Search');
        expect(searchField).toBeTruthy();

        const searchIcon = screen.getByRole('img', { name: 'search' });
        expect(searchIcon).toBeTruthy();
        fireEvent.click(searchIcon);

        const searchBtn = screen.getByRole('button', { name: 'search' });
        expect(searchBtn).toBeTruthy();
        fireEvent.click(searchBtn);
    });

export default comonTest;
