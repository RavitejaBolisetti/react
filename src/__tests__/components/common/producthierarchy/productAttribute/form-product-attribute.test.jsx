
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { FormProductAttribute } from '@components/common/ProductHierarchy/ProductAttribute/FormProductAttribute';

const productHierarchyAttributeData = [{
    attributeCode: "Model",
    id: "test"
},
{
    attributeCode: "Model",
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


const props = {
    attributeForm: jest.fn(),
    isVisible: true,
    productHierarchyAttributeData: productHierarchyAttributeData,
    onAttributeFormFinish: jest.fn(),
    formEdit: jest.fn(),
    editForm: false,
    skuAttributes: data
}

describe('FormProductAttribute component', () => {
    it('should render the FormProductAttribute components', () => {
        const { getByRole } = customRender(<FormProductAttribute
            isVisible={true}
            onFinishFailed={jest.fn()}
            onChange={jest.fn()}
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