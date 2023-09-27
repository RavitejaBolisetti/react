import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { LoyaltySchemeMaster } from '@components/Sales/Common/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';

const StatusBar = () => <div>No Status Bar</div>;
const FormActionButton = () => <div><Button htmlType="submit" type="primary"> Save </Button></div>

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <LoyaltySchemeMaster form={form} {...props} />;
};

describe('Booking loyalty scheme master render', () => {

    it('should render loyalty view details', () => {
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={{viewMode: true}} />)
    });

    it('save button should work', () => {
        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: { make: true, vehicleModelGroup: 106, customerCode: 106 } },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} selectedOrderId={106} />
            </Provider>
        );

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

    });

});
