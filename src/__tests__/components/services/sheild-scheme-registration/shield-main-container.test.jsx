import React from 'react';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { ShieldSchemeMainConatiner } from '@components/Services/ShieldSchemeRegistartion/ShieldSchemeMainConatiner';

const FormWrapper = (props) => {
    const [shieldDetailForm] = Form.useForm();
    const myFormMock = {
        ...shieldDetailForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <ShieldSchemeMainConatiner shieldDetailForm={myFormMock} {...props} />;
};

const typeData = {
    INDNT_STATS: [{ id: 106 }],
};

describe('Shield scheme registration Main Cotainer component render', () => {
    it('should render main container component', () => {
        customRender(<FormWrapper isVisible={true} typeData={typeData} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test1', () => {
        const currentSection = 1;

        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test2', () => {
        const currentSection = 2;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    it('test3', () => {
        const currentSection = 3;
        customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    });
    // it('test4', () => {
    //     const currentSection = 4;
    //     customRender(<FormWrapper isVisible={true} typeData={typeData} currentSection={currentSection} handleFormValueChange={jest.fn()} setButtonData={jest.fn()} />);
    // });
});
