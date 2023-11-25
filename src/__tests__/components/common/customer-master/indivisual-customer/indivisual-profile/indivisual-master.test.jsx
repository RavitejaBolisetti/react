import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { IndividualProfileMaster } from 'components/common/CustomerMaster/IndividualCustomer/IndividualProfile/IndividualProfileMaster';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';
import { indiviualProfileDataActions } from 'store/actions/data/customerMaster/individual/individualProfile/indiviualProfile';

jest.mock('components/common/CustomerMaster/CustomerFormButton', () => {
    const CustomerFormButton = ({ buttonData, setButtonData }) => { 
        return(
            <div>
                <button onClick={(e) => setButtonData({ ...buttonData, saveAndNewBtnClicked: false })} htmlType="submit" type="primary">Save & Next</button>
            </div>
        )
    };
    return {
        __esModule: true,
        CustomerFormButton,
    };
});

jest.mock('components/common/CustomerMaster/IndividualCustomer/IndividualProfile/AddEditForm', () => {
    const AddEditForm = ({ onCloseAction  }) => { 
        return(
            <div>
                <button onClick={onCloseAction}>Cancel</button>
            </div>
        )
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/customerMaster/individual/individualProfile/indiviualProfile', () => ({
    indiviualProfileDataActions: {}
}))

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <IndividualProfileMaster form={form} {...props} />;
};

const props2 = {
    formActionType: { viewMode: false },
    isFormVisible: true,
    setIsFormVisible: jest.fn(),
    handleButtonClick: jest.fn(),
};

describe('Indivisual Master  Component', () => {

    const defaultBtnVisiblity = { editBtn: true, saveBtn: true, cancelBtn: true, saveAndNewBtn: true, saveAndNewBtnClicked: true, closeBtn: true, formBtnActive: true, cancelOTFBtn: true, transferOTFBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNote: true, changeHistory: true, };

    it('should render indivisual Master', async () => {
        customRender(<FormWrapper resetData={jest.fn()}  {...props2} />);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });

        const saveData=jest.fn();
        const res={
            data: { name: 'Test' }
        };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props2} fetchList={jest.fn()} resetData={jest.fn()} saveData={saveData} selectedCustomerId={'kai'} setButtonData={jest.fn()} onSuccessAction={jest.fn()} showGlobalNotification={jest.fn()} onError={jest.fn()} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} resetData={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getByRole('button', { name: /save & next/i });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() })

        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    test('should check view details', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<FormWrapper resetData={jest.fn()} {...prop} />);
    });
});
