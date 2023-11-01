import '@testing-library/jest-dom/extend-expect';
import { ModalForm } from '@components/Sales/Common/ChecklistDetails/ModalForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [aggregateForm] = Form.useForm();
    const myFormMock = {
        ...aggregateForm,
        setFieldsValue: jest.fn().mockResolvedValue(props.data),
        validateFields: jest.fn(),
    };
    return <ModalForm aggregateForm={myFormMock} {...props} />;
};

describe('Deliverable checklist Modal form components', () => {
    it('should render components', () => {
        const AdvanceformData = { answerType: 'kai' };
        customRender(<FormWrapper isVisible={true} AdvanceformData={AdvanceformData} />);
    });
});
