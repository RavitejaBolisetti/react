import '@testing-library/jest-dom/extend-expect';
import { ApplicationTree } from '@components/common/UserManagement/common/AssignUserRole/ApplicationTree';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    return <ApplicationTree form={form} {...props} />;
};

describe('Application Tree components', () => {
    it('should render Application Tree components', () => {
        const formActionType = { addMode: false };
        customRender(<FormWrapper formActionType={formActionType} webApplications={jest.fn()} />);
    });
});
