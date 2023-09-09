import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import AddEditForm from 'components/Sales/DeliveryNoteInvoiceCancellation/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Add Edit Form Component', () => {

    it('should render add edit form component UI', () => {
        const typeData={
            'DEL_INV_CAN_TYP': [{key: 'Test', value: 'Test'}],
            'CDLR_INV_APP_STATUS': [{key: 'Test', value: 'Test'}],
            'INV_DEL_NOT_REQ_TYP': [{key: 'Test', value: 'Test'}],
        };
        const requestDetailData={
            requestType: 'Test',
            invoiceStatus: 'Test',
            reqStatus: 'Test'
        };
        customRender(<FormWrapper isVisible={true} requestDetailData={requestDetailData} isDetailLoaded={true} typeData={typeData} />)
    });

    it('close and cancel request button should work', () => {
        const buttonData={
            closeBtn: true,
            cancelRequest: true
        }
        customRender(<FormWrapper isVisible={true} buttonData={buttonData} handleCancelRequest={jest.fn()}/>)
        const closeBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn[1]);
        const cancelRequest=screen.getByRole('button', { name: 'Cancel Request' });
        fireEvent.click(cancelRequest);
    });

});