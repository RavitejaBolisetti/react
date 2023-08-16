import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import UploadUtils from 'components/common/CustomerMaster/Common/UploadUtils';

describe('Customer Change History component', () => {

    it('should render the customer change history component', () => {
        customRender(<UploadUtils />);
    });

    it('test1', () => {
        const formData={
            docId: 'test106'
        }
        customRender(<UploadUtils isReplacing={false} base64Img={true} uploadedFile={true} formData={formData} isLoading={false} />);
        const eyeBtn=screen.getByRole('img', { name: 'eye' });
        fireEvent.click(eyeBtn);
        const replaceImageBtn=screen.getByRole('button', { name: 'Replace Image' });
        fireEvent.click(replaceImageBtn);
    });

    it('test2', () => {
        const formData={
            docId: 'test106'
        }
        customRender(<UploadUtils uploadedFile={true} formData={formData}/>);
    });

    // it('test3', () => {
    //     const formActionType={
    //         viewMode: true
    //     }
    //     const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    //     customRender(<UploadUtils isReplacing={false} isAdding={true} base64Img={false} isLoading={false} formActionType={formActionType} />);
    //     const uploadFile=screen.getByRole('button', { name: 'Upload your contact picture (File type should be png, jpg or pdf and max file size to be 5Mb) Upload File' });
    //     fireEvent.change(uploadFile, { target: { files: [file] } });
    // });

});