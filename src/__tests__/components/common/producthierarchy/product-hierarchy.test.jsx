import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ProductHierarchy } from '@components/common/ProductHierarchy/ProductHierarchy';
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';



const productHierarchyData = [{
    active: true,
    attributeKey: "testid",
    id: "testid",
    mfgOrgSk: "testmfid",
    parntProdctId: "null",
    prodctCode: "CODEII12",
    prodctLongName: "CODEII12",
    prodctShrtName: "CODEII12",
    subProdct: []
}, {
    active: true,
    attributeKey: "testid1",
    id: "testid1",
    mfgOrgSk: "testmfid1",
    parntProdctId: "null",
    prodctCode: "CODEII12",
    prodctLongName: "CODEII12",
    prodctShrtName: "CODEII12",
    subProdct: []
}]


const props = {
    moduleTitle: "testTitle",
    viewTitle: "viewTest",
    skulist: [],
    skuData: {},
    userId: "123456",
    isDataLoaded: false,
    productHierarchyData: productHierarchyData,
    fetchList: jest.fn(),
    hierarchyAttributeFetchList: jest.fn(),
    saveData: jest.fn(),
    isChangeHistoryVisible: false,
    changeHistoryModelOpen: false,
    listShowLoading: false,
    isDataAttributeLoaded: false,
    attributeData: [],
    hierarchyAttributeListShowLoading: false,
    showGlobalNotification: jest.fn(),
    unFilteredAttributeData: [],
    fetchListHierarchyAttributeName: jest.fn(),
    productHierarchyAttributeData: [],
    fetchOrgList: jest.fn(),
    isDataOrgLoaded: false,
    manufacturerOrgHierarchyData: {},
    organizationId: "dmatestid",
    setSelectedOrganizationId: 'dmatestid',
    resetData: {},
    onCloseAction: jest.fn()
}

const treeSelectFieldProps = {
    defaultParent: false,
    handleSelectTreeClick: jest.fn(),
    placeholder: "Select organization hierarchy",
    selectedTreeSelectKey: false,
    defaultValue: ["ALL"],
    treeData: [
        {
            active: true,
            attributeKey: "testKey",
            id: "testid",
            manufactureOrgCode: "TEST00",
            manufactureOrgLongName: "Tst001",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "Tst001",
            subManufactureOrg: []
        },
        {
            active: true,
            attributeKey: "testKey1",
            id: "testid1",
            manufactureOrgCode: "TEST00",
            manufactureOrgLongName: "Tst001",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "Tst001",
            subManufactureOrg: []
        },
        {
            active: true,
            attributeKey: "testKey2",
            id: "testid2",
            manufactureOrgCode: "TEST00",
            manufactureOrgLongName: "Tst001",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "Tst001",
            subManufactureOrg: []
        }
    ],
    treeFieldNames: {
        children: "subManufactureOrg",
        key: "testid",
        label: "manufactureOrgShrtName",
        title: "manufactureOrgShrtName",
        value: "id"
    }


}

const buttonData = {
    siblingBtn: true,
    editBtn: true,
    childBtn: true,
};


describe("Producthierarchy Components", () => {
    const mockStore = createMockStore({
        auth: { userId: 123456 },
        data: {
            ProductHierarchy: { isLoading: false, isLoaded: true, data: [], changeHistoryVisible: false, attributeData: [], organizationId: 'testid' },
            HierarchyAttributeMaster: { isLoaded: false, data: [] },
            ManufacturerOrgHierarchy: { isLoaded: false, data: [] },
        },
        common: {
            LeftSideBar: { collapsed: false },
        },
    });


    it("should render producthierarchy search and other components", () => {
        const { getByRole, getAllByText } = customRender(
            <Provider store={mockStore}>
                <ProductHierarchy {...props}
                    isVisible={true}
                    onChange={jest.fn()}
                    onFinish={jest.fn()}
                    treeSelectFieldProps={treeSelectFieldProps}
                />
            </Provider>
        );

        const inputBox = getByRole('combobox');
        fireEvent.change(inputBox, { target: { value: 'DmaTest' } });

        const button = getByRole('button', { name: 'search', exact: false });
        fireEvent.click(button);

        const change = getByRole('button', { name: 'Change History', exact: false });
        fireEvent.click(change);

        const plusAdd = getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);

        const img = getByRole('img', { name: 'search', exact: false });
        fireEvent.click(img);

        const plus = getByRole('img', { name: 'plus', exact: false });
        fireEvent.click(plus);
    })
})