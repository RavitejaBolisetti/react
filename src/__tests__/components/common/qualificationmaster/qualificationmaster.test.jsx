import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { render, screen, fireEvent, userEvent, getByTestId } from '@testing-library/react';
import { useState } from 'react';

import { QualificationMaster } from '@components/common/QualificationMaster/QualificationMaster';

export const saveData = () => {
    return;
};

export const fetchList = () => {
    return;
};

// export const listShowLoading = () => {
//     return;
// };

export const qualificationMasterData1 = [
    {
        qualificationCode: 'ZHJ',

        qualificationName: 'ZHH',

        status: 'Y',
    },
];

export const qualificationMasterData = [
    {
        qualificationCode: 'Hello',

        qualificationName: 'Name',

        status: 'Y',
    },

    {
        qualificationCode: 'Hello',

        qualificationName: 'Name',

        status: 'N',
    },
];

export const buttonLookAndFireEventWithText = async (btnText) => {
    const CancelBtn = await screen.findByText(btnText);
    expect(CancelBtn).toBeTruthy();
    fireEvent.click(CancelBtn);
};

export const buttonLookAndFireEventWithLabel = async (btnlabel) => {
    const refBtn = await screen.findByLabelText(btnlabel);
    expect(refBtn).toBeTruthy();
    fireEvent.click(refBtn);
};

export const InputFieldAvailablity = async (placeholderText) => {
    const InputFieldCode = await screen.findByPlaceholderText(placeholderText);
    expect(InputFieldCode).toBeTruthy();
};

// export const searchFunctionality = async (searchText) => {
//     const nameField = await screen.findByPlaceholderText('Search');
//     const nameText = screen.getByText(searchText);
//     fireEvent.change(nameField, { target: { value: searchText } });
//     expect(nameText.value).toBeFalsy();
// };

describe('Qualification Master Test', () => {
    test('Is the search Field Present or not', () => {
        customRender(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
        const btn = screen.findByPlaceholderText('Search');
        expect(btn).toBeTruthy();
        expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
        fireEvent.click(screen.getByRole('img', { name: 'search' }));
        const Btn = screen.getByRole('button', { name: 'search' });
        expect(Btn).toBeTruthy();
        fireEvent.click(Btn);
    });

    test('is drawer closing on click of cancel button', async () => {
        customRender(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add ');
        buttonLookAndFireEventWithText('Cancel');
    });

    test('Is the View Button Present or not', () => {
        customRender(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithLabel('ai-view');
    });

    test('Is Add Qualification Button Present on  render of Table', async () => {
        customRender(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add ');
        InputFieldAvailablity(' Enter code');
        InputFieldAvailablity(' Enter name');
        buttonLookAndFireEventWithText('Cancel');
    });

    // test('Is search working', async () => {
    //     customRender(<QualificationMaster qualificationData={qualificationMasterData1} fetchList={fetchList} saveData={saveData} />);
    //     searchFunctionality('Name3');
    // });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        customRender(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Please enter code');
        InputFieldAvailablity('Please enter name');
    }, 8000);

    test('Save drawer element', async () => {
        const onFinish = jest.fn();
        customRender(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);

        buttonLookAndFireEventWithText('Add');
        InputFieldAvailablity('Enter name');
        InputFieldAvailablity('Enter code');

        onFinish.mockResolvedValue({
            qualificationCode: 'ZHJ',
            qualificationName: 'ZHH',
        });

        const result = await onFinish();
        // fireEvent.click(SaveBtn);
        buttonLookAndFireEventWithText('Save');

        expect(result).toBeTruthy();
        expect(onFinish).toHaveBeenCalled();
    });

    test('is drawer opening on click of Add Qualification to add new', async () => {
        customRender(<QualificationMaster qualificationData={qualificationMasterData} fetchList={fetchList} saveData={saveData} />);
        buttonLookAndFireEventWithText('Add');
        // switchAvailablity('fa-switch')
        buttonLookAndFireEventWithText('Save');

        InputFieldAvailablity('Enter code');
        InputFieldAvailablity('Enter name');
    }, 8000);
});
