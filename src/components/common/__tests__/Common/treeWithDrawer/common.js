
import { fireEvent, screen } from '@testing-library/react';


const comonTest = async() => {
    const Treepresent = screen.getAllByRole('tree');
    expect(Treepresent).toBeTruthy();

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
    


export default comonTest;