import { render, screen } from '@testing-library/react';

import { Splash } from '../../Splash/Splash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as IMAGES from 'assets';
import { commonDrawer, commonTreeTest, findbuttonAndClick, findplaceholder, screentext, findImage, buttonLookAndFireEventWithText, searchFieldTest, searchIsWorking, treebranchClickAndTextFinder } from './Common/treeWithDrawer/common';
import { ManufacturerTreeData as treeDatas } from './Common/Data/data';
import { fetchList, saveData, hierarchyAttributeFetchList, listShowLoading } from './Common/CommonImports/commonImports';

jest.mock('react-redux', () => ({
    connect: () => (Splash) => Splash,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return { matches: false, addListener: function () {}, removeListener: function () {} };
    };

describe('Testing Images in splash', () => {
    test('Testing image components in Dashboard', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Splash />} />
                </Routes>
            </BrowserRouter>
        );
        findImage();
    });

    test('Finding text on screen', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Splash />} />
                </Routes>
            </BrowserRouter>
        );
        screentext('Powered by');

    });
});
