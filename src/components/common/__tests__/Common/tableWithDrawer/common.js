import React from 'react';
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


export const searchFieldTest = async () => {
    const btn = await screen.findByPlaceholderText('Search');
    expect(btn).toBeTruthy();
    expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('img', { name: 'search' }));
    buttonLookAndFireEventByRole('search')
};

export const buttonLookAndFireEventByRole =(btnText ) => {
    const Btn = screen.getByRole('button', { name: btnText });
    expect(Btn).toBeTruthy();
    fireEvent.click(Btn);

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
    const InputField = await screen.findByPlaceholderText(placeholderText);
    expect(InputField.value).toBe(filledValue);
};

export const inputFieldLookAndtextChange = async (placeHoldar, inputValue, newValue = '') => {
    const InputFieldCode = await screen.findByPlaceholderText(placeHoldar);
    expect(InputFieldCode.value).toBe(inputValue);
    fireEvent.change(InputFieldCode, { target: { value: newValue } });
};

export const tablerender = async (tableTitle, looktextInTable) => {
    const tablepresent = screen.getByRole('table');
    const textfield = await screen.findByText(tableTitle);
    expect(textfield).toBeTruthy();
    const options = await screen.findByText(looktextInTable);
    expect(options).toBeTruthy();
    expect(tablepresent).toBeTruthy();
};

export const searchFunctionality = async (searchText) => {
    const nameField = await screen.findByPlaceholderText('Search');
    const nameText =  screen.getByText(searchText);
    fireEvent.change(nameField, { target: { value: searchText} });
    expect(nameText.value).toBeFalsy();
};
