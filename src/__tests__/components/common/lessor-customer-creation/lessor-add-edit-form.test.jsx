import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/common/LessorCustomerCreation/AddEditForm';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock={
        ...form,
        getFieldValue: jest.fn(),
    }
    return <AddEditForm form={myFormMock} {...props} />
}

describe('AddEditForm component render', ()=>{
    const props = {
        handleFormValueChange:jest.fn(),
        handleFormFieldChange:jest.fn(),
        onFinish:jest.fn(),
        onFinishFailed:jest.fn(),
        isVisible:true,
    }

    it('should render component when downloadForm is false', ()=>{
        const buttonData={editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn:true, formBtnActive:false}

        customRender(<FormWrapper downloadForm={false} {...props} buttonData={buttonData} uploadButtonName={'Upload Lessor Form'} validationText={'File type should be .xlxs and max file size to be 8Mb'} messageText={'Click or drop your file here to upload'} />);

        // const downloadTemplateBtn = screen.getByRole('button', {name:'Download Template'});
        // fireEvent.click(downloadTemplateBtn);

        const uploadFileBtn = screen.getByRole('button', {name:'Upload File'});
        fireEvent.click(uploadFileBtn);
    })

    it('should render component when downloadForm is true', ()=>{
        const buttonData={editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn:true, formBtnActive:false}

        const lessorData={
            docId:'123',
            documentName:'test'
        } 

        const stateData = [
            {key: "DEL2",
                parentKey: "IND",
                value: "&&&&&&"
            }
        ]

        customRender(<FormWrapper downloadForm={true} {...props} handleDownload={jest.fn()} onSuccessAction={jest.fn()} onErrorAction={jest.fn()} showGlobalNotification={jest.fn()} fetchList={jest.fn()} buttonData={buttonData} isDataLoaded={true} lessorData={lessorData}  downloadFile={jest.fn()} resetData={jest.fn()} stateData={stateData} />);

        const stateName = screen.getByRole('combobox', {name:'State Name'});
        fireEvent.change(stateName, {target:{value:'test'}});

        const downloadBtn = screen.getByRole('button', {name:'Download'});
        fireEvent.click(downloadBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    })

    it('uploadProps',()=>{
        const buttonData={editBtn: false, saveBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn:true, formBtnActive:false};

        const uploadProps = {
            ...buttonData,
            ...props,
            messageText: "Click or drop your file here to upload",
            uploadButtonName: "Upload Lessor Form",
            uploadedFile: 'test123',
            uploadedFileName: "test",
            userId: '123',
            validationText: "File type should be .xlxs and max file size to be 8Mb",
            formActionType:{viewMode:false}
        }
        customRender(<FormWrapper  {...uploadProps} />);

        const formHeader = screen.getByText('Lessor Customer Form');
        expect(formHeader).toBeTruthy();

        const desc = screen.getByText('Please download "Lessor Customer Template" using below button');
        expect(desc).toBeTruthy();

        const errorText = screen.getByText('(File type should be png, jpg or pdf and max file size to be 5Mb)');
        expect(errorText).toBeTruthy();
    })

    it('close img', ()=>{
        customRender(<FormWrapper downloadForm={true} {...props} />);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg);
    })
})