import React from 'react';
import customRender from '@utils/test-utils';
import { VehicleRecieptMasterMainContainer } from '@components/Sales/VehicleRecieptChecklist/VehicleRecieptMasterMainContainer';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <VehicleRecieptMasterMainContainer form={myFormMock} {...props} />;
};

describe('Vehicle Reciept Master table colcumn container', () => {
    const props = {
        formActionType: { addMode: true, editMode: true, viewMode: true },
        fileList: [{ key: 1, value: 'test' }],
        chassisNumber: '1234',
        selectedRecord: '2324',
    };

    it('Should render table colcumn components', () => {
        customRender(<VehicleRecieptMasterMainContainer isVisible={true} />);
    });

    it('should render the IndivisualCustomerDetailMaster component', () => {
        customRender(<FormWrapper isVisible={true} currentSection={1} {...props} />);
    });

    it('should render the IndividualProfileMaster component', () => {
        customRender(<FormWrapper isVisible={true} currentSection={2} {...props} />);
    });
});
