/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { render, screen, fireEvent, userEvent, getByTestId } from '@testing-library/react';
import { useState } from 'react';

import { CriticalityGroup } from '@components/common/CriticalityGroup/CriticalityGroup';

const fetchData = () => {
    return;
};
const saveData = () => {
    return;
};

const criticalityGroupData1 = [
    {
        criticalityGroupCode: 'Test50',
        criticalityGroupName: 'Test50',
        status: 1,
        defaultGroup: '1',
        allowedTimings: [
            {
                startTime: '11:00',
                endTime: '12:00',
            },
        ],
    },
];

export const buttonLookAndFireEventWithText = async (btnText) => {
    const CancelBtn = await screen.findByText(btnText);
    expect(CancelBtn).toBeTruthy();
    fireEvent.click(CancelBtn);
};

export const InputFieldAvailablity = async (placeholderText) => {
    const InputFieldCode = await screen.findByPlaceholderText(placeholderText);
    expect(InputFieldCode).toBeTruthy();
};

describe('CriticalityGroup Components', () => {
    it('should render CriticalityGroup components', () => {
        customRender(<CriticalityGroup />);
    });
});

describe('Criticality Group Test', () => {
    test('Is the search Field Present or not', () => {
        customRender(<CriticalityGroup fetchData={fetchData} saveData={saveData} />);
        const btn = screen.findByPlaceholderText('Search');
        expect(btn).toBeTruthy();
        expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
        fireEvent.click(screen.getByRole('img', { name: 'search' }));
        const Btn = screen.getByRole('button', { name: 'search' });
        expect(Btn).toBeTruthy();
        fireEvent.click(Btn);
    });

    test('is drawer closing on click of cancel button', async () => {
        customRender(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('is drawer opening on click of Add Criticality', async () => {
        customRender(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add Group');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter code');
    });
    test('should render page title', () => {
        customRender(<CriticalityGroup />);
        const value = screen.getAllByText('Criticality Group Name');
        expect(value).toBeTruthy();
    });

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        customRender(<CriticalityGroup criticalityGroupData={criticalityGroupData1} fetchData={fetchData} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add Group');
        InputFieldAvailablity('Please enter id');
        InputFieldAvailablity('Please enter code');

        onFinish.mockResolvedValue({
            criticalityGroupCode: 'Test50',
            criticalityGroupName: 'Test50',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });
});
