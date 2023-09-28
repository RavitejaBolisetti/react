import '@testing-library/jest-dom/extend-expect';
import { OtfBlockMaster } from '@components/Sales/OtfBlockMaster/OtfBlockMaster';
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
    return <OtfBlockMaster form={form} {...props} />;
};

const mockStore = createMockStore({
    auth: { userId: 1232 },
    data: {
        ConfigurableParameterEditing: { filteredListData: [{ id: 1, value: 'testValue', key: 1 }] },
        OTFBlockMaster: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        HierarchyAttributeMaster: { isLoaded: true, data: [{ id: 1, value: 'testValue', key: 1 }], isDetailLoaded: false },
        ManufacturerOrgHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        ManufacturerAdmin: {
            ManufacturerAdminHierarchy: { isLoaded: false, isLoading: false, data: [{ id: 1, value: 'testValue', key: 1 }] },
        },
        OTF: {
            OtfCancellation: { detailData: [{ id: 1, value: 'testValue', key: 1 }] },
        },
        ProductHierarchy: { isLoaded: false, data: [{ id: 1, value: 'testValue', key: 1 }], organizationId: 106 },
    },
});

const data = [
    {
        active: true,
        attributeKey: '6f6c5721-d614-4b84-be54-2cb8336486fc',
        disabled: true,
        id: '443463c2-ad51-4ef8-acd5-17b7007194df',
        manufactureOrgCode: 'Test46',
        manufactureOrgLongName: 'Test46',
        manufactureOrgParntId: 'null',
        manufactureOrgShrtName: 'Test46',
        subManufactureOrg: [],
    },
    {
        active: true,
        attributeKey: 'ttttt',
        disabled: true,
        id: 'ad51-4ef8-acd5-17b7007194df',
        manufactureOrgCode: 'Test46',
        manufactureOrgLongName: 'Test46',
        manufactureOrgParntId: 'null',
        manufactureOrgShrtName: 'Test46',
        subManufactureOrg: [],
    },
];

describe('Otf Block Master components', () => {
    
describe('OtfBlockMaster Components', () => {
    it('should render OtfBlockMaster component', () => {
        customRender(<OtfBlockMaster />);
    });

    it('search input box should work', () => {

        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster />
            </Provider>
        );
    });

    it('add and edit form cancel button should work', async () => {


        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );
        
    });

    it('Hierarchy tree select should work', async () => {

        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );

    });

    it('Hierarchy tree select should work with selecting tree', async () => {

        customRender(
            <Provider store={mockStore}>
                <OtfBlockMaster onCloseAction={jest.fn()} />
            </Provider>
        );
        const treeSelect = screen.getByRole('combobox', { name: '' });
        fireEvent.change(treeSelect, { target: { value: 'testValue' } });
    });
});
});


