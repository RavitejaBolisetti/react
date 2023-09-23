import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import SupportingDocumentMaster from '@components/Sales/VehicleRecieptChecklist/SupportingDocument/SupportingDocumentMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    }
    return <SupportingDocumentMaster form={myFormMock} {...props} />
}


describe('Supporting document master container', () => {

    it('Should render supporting document master  add edit form components', () => {
        const props = {
            formActionType: { viewMode: false },
            fileList: [{ key: 1, value: 'test', id: 1 }],
            payload: {key: 1, value: 'test'}
        }

        customRender(
            <FormWrapper {...props} isVisible={true} />
        )

        const fileName = screen.getByRole('textbox', { name: 'File Name' })
        fireEvent.change(fileName, { target: { value: 'test' } })

        const documents = screen.getByRole('textbox', { name: 'Document Description' })
        fireEvent.change(documents, { target: { value: 'test' } })

        const uploadFile = screen.getByRole('button', { name: 'Upload File' })
        fireEvent.click(uploadFile)

    })

    it('Should render supporting document master view form components', () => {
        const props = {
            formActionType: { viewMode: true },
            fileList: [{ key: 1, value: 'test', id: 1 }]
        }

        customRender(
            <FormWrapper {...props} isVisible={true} />
        )
    })
})