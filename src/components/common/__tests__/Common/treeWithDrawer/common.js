import { fireEvent, screen } from '@testing-library/react';
import { async } from 'sonarqube-scanner';

export const childSiblingEdit = async () => {
    const addChildBtn = await screen.findByRole('button', { name: 'Add Child' });
    expect(addChildBtn).toBeInTheDocument();
    const addiblingBtn = await screen.findByRole('button', { name: 'Add Sibling' });
    expect(addiblingBtn).toBeInTheDocument();
    const editBtn = await screen.findByRole('button', { name: 'Edit' });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(addChildBtn);
    const cancelBtn = await screen.findByRole('Cancel');
    expect(cancelBtn).toBeTruthy();
    const saveBtn = await screen.findByRole('Save');
    expect(saveBtn).toBeTruthy();
};

export const commonTreeTest = async () => {
    const Treepresent = screen.getByRole('tree');
    expect(Treepresent).toBeTruthy();
    fireEvent.click(Treepresent);
    childSiblingEdit();
};
export const commonDrawer = async () => {
    commonTreeTest();
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
export const findplaceholder =async(placeholderText)=>{
    const codeInputField = await screen.findByPlaceholderText(placeholderText);
    expect(codeInputField).toBeTruthy();
}
export const searchIsWorking =async()=>{

    findplaceholder('Search')
    const nameText = await screen.findByText('ZHJ');
    fireEvent.change(nameField, { target: { value: 'ZHJ' } });

    expect(nameText.value).toBeFalsy();
}
export const treebranchClickAndTextFinder =async(text)=>{
    const treeBranch =  await screen.findByText('parent 1');
        expect(treeBranch).toBeInTheDocument();
        fireEvent.click(treeBranch);
        const attributeText = await screen.findByText(text);
        expect(attributeText).toBeInTheDocument();
}
