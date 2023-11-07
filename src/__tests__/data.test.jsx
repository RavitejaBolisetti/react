/* eslint-disable no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('dashboardNavTabs components', () => {
    it('should render dashboardNavTabs components UI', () => {
        customRender(<dashboardNavTabs />);
    });
});

describe('upCommingTraining components', () => {
    it('should render upCommingTraining components UI', () => {
        customRender(<upCommingTraining />);
    });
});
describe('news components', () => {
    it('should render news components UI', () => {
        customRender(<news />);
    });
});
describe('crmContent components', () => {
    it('should render crmContent components UI', () => {
        customRender(<crmContent />);
    });
});
describe('serviceContent components', () => {
    it('should render serviceContent components UI', () => {
        customRender(<serviceContent />);
    });
});
describe('partsContent components', () => {
    it('should render partsContent components UI', () => {
        customRender(<partsContent />);
    });
});
describe('salesContent components', () => {
    it('should render salesContent components UI', () => {
        customRender(<salesContent />);
    });
});
