import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// const comonTest = ({ fetchChangeHistoryList, fetchList, saveData, listShowLoading }) =>
//     test('Is the search Field Present or not qwertyuiwertyui', () => {
//         render(<QualificationMaster fetchList={fetchList} saveData={saveData} />);
//         const searchField = screen.findByPlaceholderText('Search');
//         expect(searchField).toBeTruthy();

//         const searchIcon = screen.getByRole('img', { name: 'search' });
//         expect(searchIcon).toBeTruthy();
//         fireEvent.click(searchIcon);

//         const searchBtn = screen.getByRole('button', { name: 'search' });
//         expect(searchBtn).toBeTruthy();
//         fireEvent.click(searchBtn);
//     });

//  QUAIFICATION MASTER //
export const searchFieldTest = async () => {
    const btn = await screen.findByPlaceholderText('Search');
    expect(btn).toBeTruthy();
    expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('img', { name: 'search' }));
    expect(screen.getByRole('button', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'search' }));
};

export const AddNewButton = async (btnText) => {
    const addGrp = await screen.findByText(btnText);
    expect(addGrp).toBeTruthy();
};

// check btn /fire btn
export const refreshButton = (btnText) => {
    const refBtn = screen.getByLabelText('fa-ref');
    expect(refBtn).toBeTruthy();
    fireEvent.click(refBtn);
};

export const buttonLookAndFireEventWithLabel = (btnlabel) => {
    const refBtn = screen.getByLabelText(btnlabel);
    expect(refBtn).toBeTruthy();
    fireEvent.click(refBtn);
};

export const buttonLookAndFireEventWithText = async (btnText) => {
    const CancelBtn = await screen.findByText(btnText);
    expect(CancelBtn).toBeTruthy();
    fireEvent.click(CancelBtn);
};

export const switchAvailablity = async (switchText) => {
    const Status = await screen.findByRole('switch', { name: switchText });
    expect(Status).toBeChecked();
};

export const InputFieldAvailablity = async (placeholderText) => {
    const InputFieldCode = await screen.findByPlaceholderText(placeholderText);
    expect(InputFieldCode).toBeTruthy();
};

export const InputFieldAvailablityWithTextFilled = async (placeholderText, filledValue) => {
    const InputField = await screen.findByPlaceholderText('Please enter name');
    expect(InputField.value).toBe('ZHJ');
};

export const tablerender = async (tableTitle, looktextInTable) => {
    const tablepresent = screen.getByRole('table');
    const textfield = await screen.findByText('Qualification List');
    expect(textfield).toBeTruthy();
    const options = await screen.findByText('ZHH');
    expect(options).toBeTruthy();
    expect(tablepresent).toBeTruthy();
};
