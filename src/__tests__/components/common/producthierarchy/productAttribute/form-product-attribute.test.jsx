
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import FormProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/FormProductAttribute';
import { Form } from 'antd';s

const productHierarchyAttributeData = [{
    attributeCode: "Model",
    id: "test"
},
{
    attributeCode: "Model1",
    id: "test2"
}]

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



describe('FormProductAttribute component', () => {
    const FormWrapper = (props) => {
        const [editForm, attributeForm] = Form.useForm();
        return <FormProductAttribute onChange={jest.fn()} editForm={editForm} attributeForm={attributeForm} {...props} />
    }

    it('should render the FormProductAttribute components', () => {
        const { getByRole } = customRender(<FormWrapper
            isVisible={true}
            formEdit={true}
            onFinishFailed={jest.fn()}
            attributeForm={jest.fn()}
            productHierarchyAttributeData={productHierarchyAttributeData}
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