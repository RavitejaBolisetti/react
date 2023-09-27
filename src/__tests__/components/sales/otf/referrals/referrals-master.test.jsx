import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReferralsMaster } from '@components/Sales/OTF/Referrals/ReferralsMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

jest.mock('store/actions/data/otf/referrals', () => ({
    otfReferralsDataActions: {
        innerDataActions: {
            fetchList: jest.fn(),
            saveData: jest.fn(),
            fetchData: jest.fn(),
        },
    },
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <ReferralsMaster handleFormValueChange={jest.fn()} form={myFormMock} {...props} />;
};

describe('OTF Referrals Master Component', () => {
    it('should render referrals add edit form', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('should successfully set the view form data', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        const fetchCustomerList = jest.fn();
        const fetchList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <FormWrapper selectedOrderId={106} fetchList={fetchList} fetchCustomerList={fetchCustomerList} setFilterString={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );
        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('save & next button should work', async () => {
        const buttonData = {
            saveBtn: true,
            formBtnActive: true,
        };

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    Referrals: {
                        data: [{ name: 'test106' }],
                        filter: {
                            searchType: 'test106',
                            searchParam: 'test106',
                        },
                    },
                },
            },
        });
        const fetchCustomerList = jest.fn();
        customRender(
            <Provider store={mockStore}>
                <FormWrapper buttonData={buttonData} setButtonData={jest.fn()} setFilterString={jest.fn()} fetchCustomerList={fetchCustomerList} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );
        await waitFor(() => expect(fetchCustomerList).toHaveBeenCalled());
        fetchCustomerList.mock.calls[0][0].onSuccessAction();
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});

describe('OTF Referrals View Details Component', () => {
    it('should render referrals add edit form', async () => {
        const formActionType = {
            viewMode: true,
        };
        customRender(<FormWrapper formActionType={formActionType} setFilterString={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });
});
