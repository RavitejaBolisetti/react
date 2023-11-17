import React from 'react';
import { fireEvent, screen } from "@testing-library/react";
import { AddEditForm }  from 'components/Sales/DigitalSignatureMapping/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Add Edit Form Component', () => {

    it('should render add edit form component UI', () => {
        const formActionType={
            viewMode: true
        };
        const typeData={
            'YES_NO_FLG': 'Test'
        };
        customRender(<AddEditForm isVisible={true} formActionType={formActionType} typeData={typeData} />)

    });

    it('input and save button should work', () => {
        const formActionType={
            viewMode: false
        };
        const typeData={
            'YES_NO_FLG': 'Test'
        };
        customRender(<AddEditForm isVisible={true} formActionType={formActionType} typeData={typeData} setButtonData={jest.fn()} handleSave={jest.fn()}/>);

        const dealerName=screen.getByRole('textbox', { name: 'Dealer Name' });
        fireEvent.change(dealerName, { target: { value: 'Test' } });

        const switchField=screen.getAllByRole('switch', { name: 'Yes No' });
        fireEvent.click(switchField[1]);

        const saveBtn=screen.getByTestId('save');
        fireEvent.click(saveBtn);
    });

});