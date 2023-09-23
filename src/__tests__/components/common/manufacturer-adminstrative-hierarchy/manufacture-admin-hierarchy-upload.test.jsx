import '@testing-library/jest-dom/extend-expect';
import { ManufactureAdminHierarchyUpload } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufactureAdminHierarchyUpload';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <ManufactureAdminHierarchyUpload form={form} {...props} />;
};

describe('Manufacture Admin Hierarchy Upload view components', () => {

    it("Should render upload", () => {
        customRender(<ManufactureAdminHierarchyUpload isVisible={true} />)
    })


    it('Should render  Manufacture Admin Hierarchy Upload components', async () => {
        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });
        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
        }
        customRender(<FormWrapper setButtonData={jest.fn()} setEmptyList={jest.fn()} downloadForm={true} setFileList={jest.fn()} uploadedFile={true} isVisible={true} buttonData={buttonData} fetchDocumentFileDocId={jest.fn()} handleFormFieldChange={jest.fn()} getDocIdFromOrgId={jest.fn()} handleFormValueChange={jest.fn()} uploadButtonName={"Upload Authority Form"} />)

        const downloadBtn = screen.getByRole('button', { name: "Download Template", exact: false });
        act(() => {
            fireEvent.click(downloadBtn)
        })

        const closeBtn = screen.getByRole('button', { name: "Close", exact: false });
        act(() => {
            fireEvent.click(closeBtn)
        })

        const uploadFile = screen.getByRole('button', { name: "Upload Authority Form", exact: false });
        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });

        const dropBtn = screen.getByRole('heading', { name: "Click or drop your file here to upload", exact: false });
        act(() => {
            fireEvent.click(dropBtn)
        })

        const closeImg = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeImg);
    })


    it('Should render Submit components', async () => {

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
            formBtnActive: true
        }
        

        const buttonProps = {
            buttonData: buttonData,
            setButtonData: jest.fn()
        };

        customRender(<FormWrapper
            isVisible={true}
            {...buttonProps}
            saveButtonName={"Save"}
            onFinish={jest.fn()}
            handleUpload={jest.fn()}
            setFileList={jest.fn()}
            onFinishFailed={jest.fn()}
            setIsLoading={true}
            onError={jest.fn()}
            onSuccess={jest.fn()}
            fetchDocumentFileDocId={jest.fn()}
            onSuccessAction={jest.fn()}
            showGlobalNotification={jest.fn()}
        />)

        const saveBtn = screen.getByRole('button', { name: "Save", exact: false });
        act(() => {
            fireEvent.click(saveBtn)
        })
    })

    it('Should render Submit error components', async () => {

        const buttonData = {
            cancelBtn: true,
        }

        const buttonProps = {
            buttonData: buttonData,
        };

        customRender(<FormWrapper
            isVisible={true}
            {...buttonProps}

        />)

        const cancelBtn = screen.getByRole('button', { name: "Cancel", exact: false });
        act(() => {
            fireEvent.click(cancelBtn)
        })

    })
})