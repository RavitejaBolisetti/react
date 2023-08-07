import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from '@components/common/ProductHierarchy/AddEditForm';
import { render, fireEvent, screen } from "@testing-library/react";
import configureMockStore from 'redux-mock-store';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const mockStore = configureMockStore();
const initialState = {};
// Add initial state if required
const store = mockStore(initialState);

beforeEach(() => {
    // Reset the store and any necessary mocks before each test
    store.clearActions();
    jest.clearAllMocks();
});

const data = [
    {
        duplicateAllowedAtAttributerLevelInd: false,
        duplicateAllowedAtOtherParent: false,
        hierarchyAttribueCode: "testCode09090",
        hierarchyAttribueName: "test1",
        hierarchyAttribueType: "Product Hierarchy test",
        id: "testId",
        isChildAllowed: false,
        status: true
    },
    {
        duplicateAllowedAtAttributerLevelInd: false,
        duplicateAllowedAtOtherParent: false,
        hierarchyAttribueCode: "testCode09090",
        hierarchyAttribueName: "test1",
        hierarchyAttribueType: "Product Hierarchy test",
        id: "testIdDma",
        isChildAllowed: false,
        status: true
    },
    {
        duplicateAllowedAtAttributerLevelInd: false,
        duplicateAllowedAtOtherParent: false,
        hierarchyAttribueCode: "testCode09090",
        hierarchyAttribueName: "test1",
        hierarchyAttribueType: "Product Hierarchy test",
        id: "testId",
        isChildAllowed: false,
        status: true
    }
]

const formData = {
    active: true,
    attributeKey: "testId",
    id: "testId",
    mfgOrgSk: "testId",
    parntProdctId: "null",
    prodctCode: "8901",
    prodctLongName: "testing for dev",
    prodctShrtName: "test",
    subProdct: []
}



const flatternData = [
    {
        data: [{
            active: false,
            attributeKey: "testId",
            id: "testId",
            mfgOrgSk: "testId",
            parntProdctId: "null",
            prodctCode: "8901",
            prodctLongName: "testing for dev",
            prodctShrtName: "test",
            subProdct: []
        },
        {
            active: false,
            attributeKey: "testId2",
            id: "testId12",
            mfgOrgSk: "testId12",
            parntProdctId: "null",
            prodctCode: "8901",
            prodctLongName: "testing for dev",
            prodctShrtName: "test",
            subProdct: []
        }],
        key: 'testkey'
    }
]


const props = {
    unFilteredAttributeData: data,
    formActionType: 'sibling',
    flatternData: flatternData,
    isReadOnly: true,
    formData: formData,
    fieldNames: jest.fn(),
    isDataAttributeLoaded: false,
    attributeData: data,
    productHierarchyAttributeData: [{ id: "0", name: 'testdma' }],
    showProductAttribute: true,
    selectedTreeData: [{ id: "0", name: 'testdma' }, { id: "0", name: 'testdma' }],
    setShowProductAttribute: jest.fn(),
    isFormBtnActive: false,
    setFormBtnActive: jest.fn(),
    showGlobalNotification: jest.fn(),
    disabledEdit: false,
    setDisabledEdit: false,
    skuAttributes: jest.fn(),
    setSKUAttributes: jest.fn(),
    fetchListHierarchyAttributeName: jest.fn(),
    listShowLoading: false,
    userId: jest.fn(),
    isVisible: true,
    setSelectedTreeSelectKey: jest.fn(),
    handleFormValueChange: jest.fn(),
    handleFormFieldChange: jest.fn(),
    handleAttributeChange: jest.fn(),
    selectedTreeKey: [{ id: "0", name: 'testdma' }, { id: "0", name: 'testdma' }],
    openAccordian: "1"
};

const selectProps = {
    optionFilterProp: 'children',
    showSearch: true,
    allowClear: true,
};




describe("AddEditForm Components", () => {
    it("should render AddEditForm components", () => {
        const addEditComp = customRender(<AddEditForm />);
        expect(addEditComp).toMatchSnapshot();
    });

    it("should render AddEditForm form input field attributeKey", async () => {
        const { getByRole } = customRender(
            <AddEditForm
                formData={{}}
                onFinish={jest.fn()}
                isVisible={true}
                selectProps={selectProps}
                onFinishFailed={jest.fn()}
                onCloseAction={jest.fn()}

                {...props}
            />);

        const attributeKey = getByRole("combobox", { name: 'Attribute Level', exact: false });
        fireEvent.change(attributeKey, { target: { value: 'Dmatest' } });

        const code = getByRole("textbox", { name: 'Code', exact: false });
        fireEvent.change(code, { target: { value: 'Dmatest' } });

        const shortDes = getByRole("textbox", { name: 'Short Description', exact: false });
        fireEvent.change(shortDes, { target: { value: 'Dmatest' } });

        const longDes = getByRole("textbox", { name: 'Long Description', exact: false });
        fireEvent.change(longDes, { target: { value: 'Dmatest' } });

        const prodctLongName = getByRole("switch", { name: 'Status', exact: false });
        fireEvent.change(prodctLongName, { target: { value: 'Active' } });

        const closeIcon = getByRole("img", { name: 'close', exact: false });
        fireEvent.click(closeIcon);
    })

    it('should render button', async () => {
        const { getByRole } = customRender(<AddEditForm onCloseAction={jest.fn()} {...props} isVisible={true} />);

        const closeButton = getByRole("button", { name: 'Close', exact: false });
        fireEvent.click(closeButton);

        const cancelButton = getByRole("button", { name: 'Cancel', exact: false });
        fireEvent.click(cancelButton);

        const saveButton = getByRole("button", { name: 'Save', exact: false });
        fireEvent.click(saveButton);
    })

    it('should render header', async () => {
        const { getByRole } = customRender(<AddEditForm onCloseAction={jest.fn()} {...props} isVisible={true} onChange={jest.fn()} />);
        const productDetails = getByRole("button", { name: 'Product Atrribute Details', exact: false });
        expect(productDetails);
    })
});