import '@testing-library/jest-dom/extend-expect';
import { ManufacturerAdminstrativeHierarchy } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import { screen, fireEvent } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';


afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <ManufacturerAdminstrativeHierarchy form={form} {...props} />;
};

const mockStore = createMockStore({
    auth: { userId: 1232 },
    data: {
        ConfigurableParameterEditing: { filteredListData: [{ id: 1, value: "testValue", key: 1 }] },
        HierarchyAttributeMaster: { isLoaded: true, data: [{ id: 1, value: "testValue", key: 1 }], isDetailLoaded: false },
        ManufacturerOrgHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: "testValue", key: 1 }] },
        CustomerMaster: {
            ViewDocument: { isLoaded: false, data: [{ id: 1, value: "testValue", key: 1 }] },
        },
        ManufacturerAdmin: {
            ManufacturerAdminUpload: { isLoaded: false, isLoading: false, data: [{ id: 1, value: "testValue", key: 1 }] },
            ManufacturerAdminHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: "testValue", key: 1 }] },
            ManufacturerAdminHierarchyDetailData: { isLoaded: false, isLoading: false, data: [{ id: 1, value: "testValue", key: 1 }] },
            AuthorityHierarchy: { data: [{ id: 1, value: "testValue", key: 1 }] },
        },
    },
})

const data = [{
    active: true,
    attributeKey: "6f6c5721-d614-4b84-be54-2cb8336486fc",
    disabled: true,
    id: "443463c2-ad51-4ef8-acd5-17b7007194df",
    manufactureOrgCode: "Test46",
    manufactureOrgLongName: "Test46",
    manufactureOrgParntId: "null",
    manufactureOrgShrtName: "Test46",
    subManufactureOrg: []
}, {
    active: true,
    attributeKey: "ttttt",
    disabled: true,
    id: "ad51-4ef8-acd5-17b7007194df",
    manufactureOrgCode: "Test46",
    manufactureOrgLongName: "Test46",
    manufactureOrgParntId: "null",
    manufactureOrgShrtName: "Test46",
    subManufactureOrg: []
}]

describe('Manufacturer Adminstrative Hierarchy components', () => {

    it('Should render manufacturer adminstqrative hierarchy master components', () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} setattributeDataOptions={jest.fn()} handleSelectTreeClick={jest.fn()} />
            </Provider>)

        const select = screen.getAllByRole("combobox");
        fireEvent.change(select[0], { target: { value: 'test' } });
    })

    it('should render ManufacturerAdminstrativeHierarchy components', () => {
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} organizationId="test" manufacturerOrgHierarchyData={data} />
            </Provider>)
    });
});