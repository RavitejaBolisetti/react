import React from 'react';
import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import DocumentTypes from 'components/common/ApplicationMaster/documentTypes/DocumentTypes';

const finalFormdata = {
    documentType: [
        { termAndConRequired: true, digitalSignatureRequired: true, documentTypeDescription: 'Test', documentTypeCode: 'Test' },
        { termAndConRequired: false, digitalSignatureRequired: true, documentTypeDescription: 'Test1', documentTypeCode: 'Test1' },
    ],
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Document Types Component', () => {
    it('should render document types component', async () => {
        customRender(<DocumentTypes onFinish={jest.fn()} />);
    });

    it('form fields should work', async () => {
        const finalFormdata1 = { documentType: [] };
        const setFinalFormdata=jest.fn();

        render(<DocumentTypes finalFormdata={finalFormdata1} setFinalFormdata={setFinalFormdata} isBtnDisabled={false} setCanFormSave={jest.fn()} onDocumentFormFinish={jest.fn()} onFinishFailed={jest.fn()} onFinish={jest.fn()} />);

        const documentCode = screen.getByRole('textbox', { name: 'Code', exact: false });
        fireEvent.change(documentCode, { target: { value: '123' } });

        const documentName = screen.getByRole('textbox', { name: 'Document Name', exact: false });
        fireEvent.change(documentName, { target: { value: 'Test' } });

        const submitButton = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(submitButton);

        await waitFor(() => expect(setFinalFormdata).toHaveBeenCalled());
        setFinalFormdata.mock.calls[0][0]();
        // expect(setFinalFormdata).toHaveBeenCalled();
    });

    it('cancel button should work', async () => {
        render(<DocumentTypes forceUpdate={jest.fn()} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false });
        act(() => {
            fireEvent.click(buttons[0]);
        });
        await act(async () => {
            const cancelButton = screen.getByRole('button', { name: 'Cancel', exact: false });
            fireEvent.click(cancelButton);
        });
    });

    it('edit icon and save button should work', async () => {
        render(<DocumentTypes id={null} forceUpdate={jest.fn()} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false });
        act(() => {
            fireEvent.click(buttons[0]);
        });
        const saveButton = screen.getByRole('button', { name: 'Save', exact: false });
        act(() => {
            fireEvent.click(saveButton);
        });
    });
});
