import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header/Header';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';

import axios from 'axios';

import LeftPanel from '../LeftPanel';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { Tree } from 'antd';
import { geoDataActions } from 'store/actions/data/geo';
jest.mock('react-redux', () => ({
    connect: () => (Header) => Header,
}));
window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };
const loginUserData = {
    firstName: 'Nikhil',
    lastName: 'Dabeer',
    mobileNo: '',
    dealerName: 'Mahindra & Mahindra LTD',
    dealerLocation: 'Mumbai',
    notificationCount: '3',
    userType: '',
};

describe('Testing Header of every page', () => {
    test('Testing image components in header', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Header loginUserData={loginUserData} />} />
                </Routes>
            </BrowserRouter>
        );
        const MahindraAndMahindra = await screen.queryByText('Mahindra & Mahindra LTD');
        const DealerLocationCheck = await screen.findByText('Mumbai');
        const NotificationCounter = await screen.findByText('3');
        const Links = await screen.findAllByRole('link');
        const firstName = await screen.queryByText('Nikhil');
        const lastName = await screen.queryByText('Dabeer');
        expect(MahindraAndMahindra).toBeDefined();
        expect(DealerLocationCheck).toBeTruthy();
        expect(NotificationCounter).toBeTruthy();
        expect(Links).toHaveLength(4);
        expect(firstName).toBeDefined();
        expect(lastName).toBeDefined();
    });
});
