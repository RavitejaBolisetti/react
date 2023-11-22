import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { AddEditForm } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/AddEditForm';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
});

const props = { setactiveKey: jest.fn(), setIsLoading: jest.fn(), onCloseAction: jest.fn(), onCloseActionOnContinue: jest.fn() };
const formActionType = { editMode: false };
const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};

describe('Corporate customer view Details render', () => {
    it('should render view details page', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CustomerMaster: {
                    NameChangeRequest: { isLoaded: true },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} onCloseAction={jest.fn()} onCloseActionOnContinue={jest.fn()} formActionType={formActionType} setCustomerNameList={jest.fn()} />
            </Provider>
        );
    });
});
