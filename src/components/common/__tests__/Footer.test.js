import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer/Footer';
import Copyright from './Copyright';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
        const HomeText = await screen.findByText('Home');
        const DashboardCardTitle = await screen.findByText('Dashboard');
        const ViewDashboardButton = await screen.findByText('View Dashboard');
        const ActionItems = await screen.findByText('Action Items');
        const BirthdayCalendar = await screen.findByText('Birthday Calendar');
        const Enquiriestobefollowedup = await screen.findByText('Enquiries to be followed up');
        const PendingPOstobereleased = await screen.findByText('Pending POs to be released');
        const Vehiclestobedelivered = await screen.findByText('Vehicles to be delivered');
        const News = await screen.findByText('News');
        const anandMahindra = await screen.findByText('Anand Mahindra Highlights Car Price Hikes Over 50 Years Ago');
        const AnandMahindra = await screen.findByText('Anand Mahindra continues to amuse the netizens with his posts. This time he has highlighted car price hikes from 50 years ago.');
        const ViewDashboard = await screen.findByText('View Dashboard');
        const ElectriSuv = await screen.findByText("What to expect from Mahindra's' Born Electric concept SUVs");
        const Sales66 = await screen.findByText('Mahindra SUV sales up 66%');
        const UpcomingTrainings = await screen.findByText('Upcoming Trainings');
        const FirstNameLastName = await screen.findByText('First Name, Last Name');
        const Today = await screen.findByText('Today');
        const KnowledgeCenter = await screen.findByText('Knowledge Center');

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
