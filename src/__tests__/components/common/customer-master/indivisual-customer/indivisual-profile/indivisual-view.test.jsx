import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewDetail } from '@components/common/CustomerMaster/IndividualCustomer/IndividualProfile/ViewDetail';
import customRender from '@utils/test-utils';

describe('ViewDetailMain Component', () => {
    it('should toggle Collapse panel on header click', () => {
        const setActiveKey = jest.fn();
        const activeKey = [1];
        const formData = {
            dateOfBirth: '1990-01-01',
            gender: 'MALE',
            martialStatus: 'MARRIED',
        };
        const isLoading = false;
        const appCategoryData = {
            GENDER_CD: [{ key: 'MALE', value: 'Male' }],
            MARITAL_STATUS: [{ key: 'MARRIED', value: 'Married' }],
        };

        customRender(<ViewDetail setActiveKey={setActiveKey} activeKey={activeKey} formData={formData} isLoading={isLoading} appCategoryData={appCategoryData} />);

        const panelHeader = screen.getByText('Individual Information');
        fireEvent.click(panelHeader);

        expect(setActiveKey).toHaveBeenCalledWith([]);

        setActiveKey.mockReset();

        fireEvent.click(panelHeader);

        expect(setActiveKey).toHaveBeenCalledWith([1]);
    });
});
