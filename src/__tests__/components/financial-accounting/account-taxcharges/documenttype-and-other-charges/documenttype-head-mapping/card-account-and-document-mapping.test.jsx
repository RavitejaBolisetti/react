/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import  CardDocTypeAcMapping  from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocTypeAcHeadMapping/CardDocTypeAcMapping';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("CardDocTypeAcMapping component",()=>{
    const cardProps = {
        buttonData: {cancelBtn: true, formBtnActive: false, editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false},
        disableSaveButton: false,
        formActionType: {addMode: false, editMode: true, viewMode: false},
        viewMode:false,
        isVisible:true,
    }
    it('Cancel Button', () => {
        const uniqueCardEdit = '1234';
        const internalId = '1234';
        customRender(<CardDocTypeAcMapping formEdit={true} internalId={internalId} uniqueCardEdit={uniqueCardEdit} setButtonData={jest.fn()} {...cardProps} setFormEdit={jest.fn()} setDropdownItems={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })
})