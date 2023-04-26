import { fireEvent, screen } from '@testing-library/react';
import { async } from 'sonarqube-scanner';
import axios from 'axios';

export const childSiblingEdit = async () => {
    const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
    expect(addChildBtn).toBeInTheDocument();
    const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
    expect(addiblingBtn).toBeInTheDocument();
    const editBtn = await screen.findByRole('button', { name: 'Edit' });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(addChildBtn);
    buttonLookAndFireEventWithText('Cancel');
    // const cancelBtn = await screen.findByRole('Cancel');
    // expect(cancelBtn).toBeTruthy();
    // const saveBtn = await screen.findByRole('Save');
    // expect(saveBtn).toBeTruthy();
};

export const commonTreeTest = async () => {
    const Treepresent = screen.getByRole('tree');
    expect(Treepresent).toBeTruthy();
    fireEvent.click(Treepresent);
    childSiblingEdit();
};
export const commonDrawer = async () => {
    const attributeText = await screen.findByText('Attribute Level');
    expect(attributeText).toBeInTheDocument();
    const addiblingBtn = await screen.findByRole('button', { name: 'Edit' });
    expect(addiblingBtn).toBeInTheDocument();
    fireEvent.click(addiblingBtn);
    const saveBtn = await screen.getByText('Save');
    expect(saveBtn).toBeTruthy();
};

export const screentext = async (text) => {
    const hierarchyText = await screen.getByText(text);
    expect(hierarchyText).toBeInTheDocument();
};
export const findbuttonAndClick = async (buttonName) => {
    const btn = screen.getByRole('button', { name: buttonName });
    expect(btn).toBeTruthy();
    fireEvent.click(btn);
};
export const searchFieldTest = async () => {
    const btn = await screen.findByPlaceholderText('Search');
    expect(btn).toBeTruthy();
    expect(screen.getByRole('img', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('img', { name: 'search' }));
    expect(screen.getByRole('button', { name: 'search' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'search' }));
};
export const findplaceholder = async (placeholderText) => {
    const codeInputField = await screen.findByPlaceholderText(placeholderText);
    expect(codeInputField).toBeTruthy();
};
export const searchIsWorking = async () => {
    findplaceholder('Search');
    const nameText = await screen.findByText('ZHJ');
    fireEvent.change(nameField, { target: { value: 'ZHJ' } });

    expect(nameText.value).toBeFalsy();
};
export const treebranchClickAndTextFinder = async (text) => {
    const treeBranch = await screen.findByText('parent 1');
    expect(treeBranch).toBeInTheDocument();
    fireEvent.click(treeBranch);
    const attributeText = await screen.findByText(text);
    expect(attributeText).toBeInTheDocument();
};
export const findImage = async () => {
    const findImages = await screen.findAllByRole('img');
    expect(findImages).toBeTruthy();
    expect(findImages).toHaveLength(7);
};
export const buttonLookAndFireEventWithText = async (btnText) => {
    const CancelBtn = await screen.findByText(btnText);
    expect(CancelBtn).toBeTruthy();
    fireEvent.click(CancelBtn);
};
export const axiosCall = async(BASE_URL,fetchList,listShowLoading)=>{
    axios.get = jest.fn()
    axios.get(BASE_URL);
    jest.mock("axios");
    const users = [
        { id: 1, name: "reena" },
        { id: 2, name: "shakambhar" },
      ];
      axios.get.mockResolvedValueOnce(users);
      const result = await fetchList();
      expect(axios.get).toHaveBeenCalledWith(BASE_URL);
      console.log(axios.get.mock.calls);
      //expect(result).toMatchObject(users);
      

}
