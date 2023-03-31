import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dashboard } from './Dashboard';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';
import customMenuLink, { addToolTip } from 'utils/customMenuLink';
import { FaChartPie, FaChartArea, FaClock, FaNewspaper, FaChalkboard, FaBirthdayCake } from 'react-icons/fa';
import { mapStateToProps } from './Dashboard';

import axios from 'axios';

import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { Tree } from 'antd';
import { geoDataActions } from 'store/actions/data/geo';
jest.mock('react-redux', () => ({
    connect: () => (Dashboard) => Dashboard,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };
describe('Testing DashBoard', () => {
    test('Testing image components in Dashboard', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        );
        const HomeText = screen.findByText('Home');
        const DashboardCardTitle = screen.findByText('Dashboard');
        const ViewDashboardButton = screen.findByText('View Dashboard');
        const ActionItems = screen.findByText('Action Items');
        const BirthdayCalendar = screen.findByText('Birthday Calendar');
        const Enquiriestobefollowedup = screen.findByText('Enquiries to be followed up');
        const PendingPOstobereleased = screen.findByText('Pending POs to be released');
        const Vehiclestobedelivered = screen.findByText('Vehicles to be delivered');
        const News = screen.findByText('News');
        const anandMahindra = screen.findByText('Anand Mahindra Highlights Car Price Hikes Over 50 Years Ago');
        const AnandMahindra = screen.findByText('Anand Mahindra continues to amuse the netizens with his posts. This time he has highlighted car price hikes from 50 years ago.');
        const ViewDashboard = screen.findByText('View Dashboard');
        const ElectriSuv = screen.findByText("What to expect from Mahindra's' Born Electric concept SUVs");
        const Sales66 = screen.findByText('Mahindra SUV sales up 66%');
        const UpcomingTrainings = screen.findByText('Upcoming Trainings');
        const FirstNameLastName = screen.findByText('First Name, Last Name');
        const Today = screen.findByText('Today');
        const KnowledgeCenter = screen.findByText('Knowledge Center');

        expect(HomeText).toBeTruthy();
        expect(DashboardCardTitle).toBeTruthy();
        expect(ViewDashboardButton).toBeTruthy();
        expect(ActionItems).toBeTruthy();
        expect(BirthdayCalendar).toBeTruthy();
        expect(Enquiriestobefollowedup).toBeTruthy();
        expect(PendingPOstobereleased).toBeTruthy();
        expect(Vehiclestobedelivered).toBeTruthy();
        expect(News).toBeTruthy();
        expect(anandMahindra).toBeTruthy();
        expect(AnandMahindra).toBeTruthy();
        expect(ViewDashboard).toBeTruthy();
        expect(ElectriSuv).toBeTruthy();
        expect(Sales66).toBeTruthy();
        expect(UpcomingTrainings).toBeTruthy();
        expect(FirstNameLastName).toBeTruthy();
        expect(Today).toBeTruthy();
        expect(KnowledgeCenter).toBeTruthy();
    });
    test('Testing Routing', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        );
    });
});
