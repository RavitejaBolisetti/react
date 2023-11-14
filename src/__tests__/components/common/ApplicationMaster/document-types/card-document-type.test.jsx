import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CardDocumentType from 'components/common/ApplicationMaster/documentTypes/CardDocumentType';
import { Form } from 'antd';

const finalFormdata = {
    documentType: [
        { termAndConRequired: true, digitalSignatureRequired: true, documentTypeDescription: 'Test', documentTypeCode: '123' },
        { termAndConRequired: false, digitalSignatureRequired: true, documentTypeDescription: 'Test1', documentTypeCode: '132' },
    ],
};

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <CardDocumentType onUpdate={jest.fn()} form={form} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Card Document Type Component', () => {
    it('should render card document type component', async () => {
        customRender(<CardDocumentType setIsBtnDisabled={jest.fn()} />);
    });

    it('should delete icon button', async () => {
        const setfinalFormdata = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setfinalFormdata]);
        render(<CardDocumentType id={null} setCanFormSave={jest.fn()} setfinalFormdata={setfinalFormdata} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} status={'Active'} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false });
        fireEvent.click(buttons[1]);
        expect(setfinalFormdata).toHaveBeenCalledWith(expect.any(Function));
        const setFinalFormdataFunction = setfinalFormdata.mock.calls[0][0];
        const prev = {
            documentType: [
                { termAndConRequired: true, digitalSignatureRequired: true, documentTypeDescription: 'Test', documentTypeCode: 'Test' },
                { termAndConRequired: false, digitalSignatureRequired: true, documentTypeDescription: 'Test1', documentTypeCode: 'Test1' },
            ],
        };
        setFinalFormdataFunction(prev);
    });

    it('edit icon and save button should work', async () => {
        render(<FormWrapper onUpdate={jest.fn()} onClick={jest.fn()} forceUpdate={jest.fn()} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false });

        fireEvent.click(buttons[0]);

        const saveButton = screen.getByRole('button', { name: 'Add', exact: false });
        fireEvent.click(saveButton);
    });
});
