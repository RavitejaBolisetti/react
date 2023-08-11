import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import ProductAttributeMaster from '@components/common/ProductHierarchy/ProductAttribute/ProductAttributeMaster';
import FormProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/FormProductAttribute';

const data = [{
    attributeId: "testAttId",
    code: "Model",
    id: "test",
    value: "test for unit case"
}, {
    attributeId: "testAttId1",
    code: "Model",
    id: "test1",
    value: "test for unit case"
}, {
    attributeId: "testAttId2",
    code: "Model",
    id: "test2",
    value: "test for unit case"
}]

const productHierarchyAttributeData = [{
    attributeCode: "Model",
    id: "test"
},
{
    attributeCode: "Model",
    id: "test2"
}]

const selectedTreeData = [{
    active: true,
    attributeKey: "test",
    hierarchyAttribueName: "producgtt",
    id: "testid",
    mfgOrgSk: "test",
    parentName: undefined,
    parntProdctId: "null",
    prodctCode: "890",
    prodctLongName: "testing for unit tset case",
    prodctShrtName: "test",
    subProdct: []
}, {
    active: true,
    attributeKey: "test1",
    hierarchyAttribueName: "producgtt1",
    id: "testid2",
    mfgOrgSk: "test11",
    parentName: undefined,
    parntProdctId: "null",
    prodctCode: "890",
    prodctLongName: "testing for unit tset case",
    prodctShrtName: "test",
    subProdct: []
}]

const cardAttributeProps = {
    form: jest.fn(),
    formActionType: "test",
    attributeForm: jest.fn(),
    forceUpdate: jest.fn(),
    isVisible: true,
    selectedTreeData: selectedTreeData,
    skuAttributes: data,
    setSKUAttributes: jest.fn(),
    productHierarchyAttributeData: productHierarchyAttributeData,
    setFormBtnActive: true,
    disableSaveButton: false,
    setDisableSaveButton: false,
    showGlobalNotification: false,
    disabledEdit: true,
    setDisabledEdit: jest.fn(),
    onAttributeFormFinish: jest.fn()
};

describe('ProductAttributeMaster component', () => {
    it('should render the ProductAttributeMaster components', () => {
        customRender(<ProductAttributeMaster
            isVisible={true}
            {...cardAttributeProps}
            code={"testcode"}
            id={"testid"}
            value={"testvalue"}
            attributeId={"test"}
        />);
    });

    it('should render the FormProductAttribute components', () => {
        const { getByRole } = customRender(<FormProductAttribute
            isVisible={true}
            onFinishFailed={jest.fn()}
            attributeForm={jest.fn()}
            productHierarchyAttributeData={productHierarchyAttributeData}
            formEdit={true}
        />);

        const attributeName = getByRole("combobox", { name: 'Attribute Name', exact: false });
        fireEvent.change(attributeName, { target: { value: 'Dmatest' } });

        const attributeValue = getByRole("textbox", { name: 'Attribute Value', exact: false });
        fireEvent.change(attributeValue, { target: { value: 'Dmatest' } });

        const plusAdd = getByRole("button", { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);

        const add = getByRole("img", { name: 'plus', exact: false });
        fireEvent.click(add);        
    });
});
