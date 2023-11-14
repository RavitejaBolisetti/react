/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/CustomerMaster/CorporateCustomer/SupportingDocument/AddEditForm';
import { fireEvent, screen } from '@testing-library/react';

describe('add edit form component', () => {
    it('should render add edit form component', () => {
        customRender(<AddEditForm isVisible={true} />);
        const uploadFile = screen.getByRole('button', { name: 'Upload File' });
        fireEvent.click(uploadFile);
        const closeCircle = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircle);
    });

    it('should able to select option', async () => {
        const typeData = [
            { id: '123', value: 'test123', title: 'success' },
            { id: '12', value: 'test', title: 'error' },
        ];
        customRender(<AddEditForm typeData={typeData} setEmptyList={jest.fn()} />);
        const documentType = screen.getByRole('combobox', { name: 'Document Type' });
        fireEvent.change(documentType, { target: { value: 'success' } });
        const fileName = screen.getByRole('textbox', { name: 'File Name' });
        fireEvent.click(fileName);
    });
});
