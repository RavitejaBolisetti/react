/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/LessorCustomerCreation/AddEditForm';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const typeData = {
    PARAM_MASTER: {
        FILE_DOWNLOAD_TMPLT: { id: 'FILE_DOWNLOAD_TMPLT', title: 'Template download' },
    },
};

describe('AddEditForm component render', () => {
    it('render', () => {
        customRender(<AddEditForm isVisible={true} typeData={[typeData]} downloadFile={jest.fn()} resetData={jest.fn()} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

        const downloadTemplate = screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);

        const uploadFile = screen.getByRole('button', { name: 'Upload File' });
        fireEvent.click(uploadFile);

        const clickBtn = screen.getByRole('heading', { name: 'Click or drop your file here to upload the signed and scanned customer form.' });
        fireEvent.click(clickBtn);
    });

    it('should able to select option', () => {
        customRender(<AddEditForm isVisible={true} downloadForm={true} fetchList={jest.fn()} downloadFile={jest.fn()} resetData={jest.fn()} />);
        const stateName = screen.getByRole('combobox', { name: 'State Name' });
        fireEvent.change(stateName, { target: { value: 'test121' } });

        const downloadBtn = screen.getByRole('button', { name: 'Download' });
        fireEvent.click(downloadBtn);
    });
});
