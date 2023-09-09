import '@testing-library/jest-dom/extend-expect';
import { ApportionDetailMaster } from '@components/Sales/Receipts/ApportionDetails/ApportionDetailMaster';
import customRender from '@utils/test-utils';

import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <ApportionDetailMaster form={myFormMock} {...props} />;
};

describe('Receipts party details Master components', () => {
    it('should render components', () => {
        const formActionType = {
            editMode: true,
        };
        const apportionList = [{ key: '1', value: 'kai' }];
        customRender(<FormWrapper formActionType={formActionType} isVisible={true} handleButtonClick={jest.fn()} apportionList={apportionList} />);
    });

    it('should render components when viewMode is true', () => {
        const formActionType = {
            viewMode: true,
        };
        const apportionList = [{ key: '1', value: 'kai' }];
        customRender(<FormWrapper formActionType={formActionType} isVisible={true} handleButtonClick={jest.fn()} apportionList={apportionList} />);
    });
});
