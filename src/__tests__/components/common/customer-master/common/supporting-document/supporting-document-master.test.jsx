import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { SupportingDocumentMaster } from 'components/common/CustomerMaster/Common/SupportingDocument';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Supporting Document component', () => {

    it('should render the supporting document component', () => {
        const formActionType={
            viewMode: false
        }
        customRender(<SupportingDocumentMaster formActionType={formActionType} />);
    });

    it('save button should work', () => {
        const formActionType={
            viewMode: true
        }
        const buttonData={
            saveBtn: true,
            formBtnActive: false
        }
        customRender(<SupportingDocumentMaster formActionType={formActionType} buttonData={buttonData} setButtonData={jest.fn()}/>);

        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});

describe('View Detail component', () => {

    it('download and delete file icon button should work', () => {
        const formActionType={
            viewMode: false
        }

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: {CUST_FILES: [{id: 1}] }},
                SupportingDocument: { 
                    data: [{id: 1}]
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <SupportingDocumentMaster formActionType={formActionType} selectedCustomerId={'Kai'}   />
            </Provider>
        );

        const downloadBtn=screen.getByTestId('downloadBtn');
        fireEvent.click(downloadBtn);

        const deleteFileBtn=screen.getByTestId('deleteFileBtn');
        fireEvent.click(deleteFileBtn);
    });

});