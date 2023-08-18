import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import UploadUtils from 'components/common/CustomerMaster/Common/UploadUtils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

describe('Upload Utils Component', () => {

    it('should render the upload utils component', () => {
        const formData={
            docId: 'test106'
        }
        customRender(<UploadUtils uploadedFile={true} formData={formData}/>);
    });

    it('replace image button should work', () => {
        const formData={
            docId: 'test106'
        }
        customRender(<UploadUtils isReplacing={false} base64Img={true} uploadedFile={true} formData={formData} isLoading={false} />);
        const eyeBtn=screen.getByRole('img', { name: 'eye' });
        fireEvent.click(eyeBtn);
        const replaceImageBtn=screen.getByRole('button', { name: 'Replace Image' });
        fireEvent.click(replaceImageBtn);
    });

    it('uploading the image should work correctly with id', async () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
        });

        const formActionType={
            viewMode: true
        }

        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });
        
        customRender(
            <Provider store={mockStore}>
                <UploadUtils handleUpload={jest.fn()} isReplacing={false} isAdding={true} base64Img={false} isLoading={false} formActionType={formActionType} />
            </Provider>
        );

        const uploadFile = screen.getByRole('button', { name: 'Upload File' });

        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });

        const cancelBtn= screen.getByRole('img', { name: '' });
        fireEvent.click(cancelBtn);

        const cancelBtn1= screen.getByRole('img', { name: 'eye' });
        fireEvent.click(cancelBtn1);

    });

    it('uploading the image should not work without id', async () => {

        const formActionType={
            viewMode: true
        }

        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });
        
        customRender( <UploadUtils handleUpload={jest.fn()} isReplacing={false} isAdding={true} base64Img={false} isLoading={false} formActionType={formActionType} /> );

        const uploadFile = screen.getByRole('button', { name: 'Upload File' });

        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });

    });

});