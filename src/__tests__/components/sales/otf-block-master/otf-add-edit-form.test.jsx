import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/Sales/OtfBlockMaster/AddEditForm';
import { fireEvent, screen } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

const mockStore = createMockStore({
    auth: { userId: 1232 },
    data: {
        ManufacturerAdmin: {
            ManufacturerAdminHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        },
        DealerBlockMaster: { isLoaded: true, data: [{ id: 1, value: 'testValue', key: 1 }] }
    },
});

const fieldNames = {
    title: 'test',
};
const props = {
    fieldNames: fieldNames,
    isVisible: true,
    setSelectedTreeSelectKey: jest.fn(),
    setShowProductAttribute: jest.fn(),
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<FormWrapper {...props} store={mockStore} fetchListHierarchyAttributeName={jest.fn()} userId={106} />);
    });

    it('form fields should work properly', async () => {
        customRender(<FormWrapper {...props} setFormBtnActive={jest.fn()} />);
        const modelGroupCode = screen.getByRole('textbox', { name: 'Product Hierarchy', exact: false });
        fireEvent.change(modelGroupCode, { target: { value: 'Dmatest' } });

        const code = screen.getByRole('combobox', { name: 'Dealer Code', exact: false });
        fireEvent.change(code, { target: { value: 'Dmatest' } });

        const hierarchyMstId = screen.getByRole('combobox', { name: '' });
        fireEvent.change(hierarchyMstId, { target: { value: 'Dmatest' } });
    });

    it('Should render userId components', () => {
        const formData = { status: true, dealerCode: "test2" }
        customRender(<Provider store={mockStore}><FormWrapper formData={formData} isVisible={true} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()}/></Provider>);

        const hierarchyMstId = screen.getByRole('combobox', { name: '' });
        fireEvent.change(hierarchyMstId, { target: { value: 'Dmatest' } })
    });
});
