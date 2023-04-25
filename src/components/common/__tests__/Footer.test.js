import { render, screen } from '@testing-library/react';

import { Footer } from '../Footer/Footer';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

jest.mock('react-redux', () => ({
    connect: () => (Footer) => Footer,
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
                    <Route path="*" element={<Footer />} />
                </Routes>
            </BrowserRouter>
        );
        const FooterText = await screen.findByText('Copyright © 2023 ROBIN.');
        expect(FooterText).toBeTruthy();
    });

    test('Testing Routing', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Footer />} />
                </Routes>
            </BrowserRouter>
        );
    });
});
