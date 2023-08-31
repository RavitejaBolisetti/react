import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ReferralsMaster } from '@components/Sales/OTF/Referrals/ReferralsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

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
        customRender(<FormWrapper /> );
    });

    it('test 1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper selectedOrderId={106} />
            </Provider>
        );
    });

    it('test 2', async () => {
        const buttonData = {
            saveBtn: true
        }

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    Referrals: { 
                        data: [{name: 'test106'}],
                        filter: {
                            searchType: 'test106',
                            searchParam: 'test106'
                        }
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper buttonData={buttonData} />
            </Provider>
        );
        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});

describe('OTF Referrals View Details Component', () => {

    it('should render referrals add edit form', async () => {
        const formActionType={
            viewMode: true
        }
        customRender(<FormWrapper formActionType={formActionType} /> );
    });

});