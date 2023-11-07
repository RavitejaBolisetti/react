import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { SupportingDocumentMaster } from 'components/Sales/VehicleDetail/SupportingDocument';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

jest.mock('store/actions/data/vehicle/vehicleDetailDocument', () => ({
    vehicleDetailDocumentDataActions: {}
}))

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myMock = {
        ...form,
    };

    return <SupportingDocumentMaster form={myMock} {...props} />;
};

const formActionType={ viewMode: false };

describe('Supporting Document Master Component', () => {

    it('should render supporting document master component', () => {
        customRender(<FormWrapper formActionType={formActionType} />);
    });

    it('form should work completely', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { CUST_FILES: [{ key: 106, value: 'Kai' }]} },
                Vehicle: {
                    VehicleDetailDocument: { isLoaded: true, data: { supportingDocuments: [{ documentId: 106, documentTitle: 'Doc Kai' }] } },
                },
            },
        });

        const buttonData={
            saveBtn: true,
            formBtnActive: true
        };

        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });
        const saveData=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper formActionType={formActionType} fetchList={jest.fn()} setIsFormVisible={jest.fn()} saveData={saveData} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const documentTypeCd=screen.getByRole('combobox', { name: 'Document Type' });
        fireEvent.change(documentTypeCd, { target: { value: 'Kai' } });
        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('Kai'));

        const documentTitle=screen.getByRole('textbox', { name: 'Document Name' });
        fireEvent.change(documentTitle, { target: { value: 'Kai' } });

        const uploadFile = screen.getByRole('button', { name: 'Upload File' });

        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });

        await waitFor(() => { expect(screen.getAllByText('Kai')[1]).toBeInTheDocument() });

        const submitBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(submitBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

        await waitFor(() => { expect(screen.getByText('Doc Kai')).toBeInTheDocument() });

        const downloadBtn=screen.getByTestId('downloadFile');
        fireEvent.click(downloadBtn);

    });

    it('form should not work without upload files', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { CUST_FILES: [{ key: 106, value: 'Kai' }]} },
            },
        });

        const buttonData={
            saveBtn: true,
            formBtnActive: true
        };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper formActionType={formActionType} fetchList={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const documentTypeCd=screen.getByRole('combobox', { name: 'Document Type' });
        fireEvent.change(documentTypeCd, { target: { value: 'Kai' } });
        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });
        fireEvent.click(screen.getByText('Kai'));

        const documentTitle=screen.getByRole('textbox', { name: 'Document Name' });
        fireEvent.change(documentTitle, { target: { value: 'Kai' } });

        const submitBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(submitBtn);

    });

    it('collapse should work', () => {
        customRender(<FormWrapper formActionType={formActionType} />);

        const minusCollapse=screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusCollapse)
    });

    it('another collapse should work', () => {
        customRender(<FormWrapper formActionType={formActionType} />);

        const plusCollapse=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusCollapse)
    });
});