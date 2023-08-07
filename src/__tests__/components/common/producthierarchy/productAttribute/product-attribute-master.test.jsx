import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import ProductAttributeMaster from '@components/common/ProductHierarchy/ProductAttribute/ProductAttributeMaster';

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

const cardAttributeProps = {
    attributeForm: jest.fn(),
    forceUpdate: jest.fn(),
    isVisible: true,
    selectedTreeData: [{
        attributeId: "testAttId",
        code: "Model",
        id: undefined,
        value: "test for unit case"
    }],
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
        />);
    });
});
