import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { AddEditForm } from '@components/common/ProductHierarchy/AddEditForm';
import { fireEvent, screen } from "@testing-library/react";

const fieldNames={
    title: 'test'
}
const props={
    fieldNames:fieldNames,
    isVisible: true,
    setSelectedTreeSelectKey:jest.fn(),
    setShowProductAttribute: jest.fn()
}

describe("AddEditForm Components", () => {

    it("should render AddEditForm components", () => {
        customRender(<AddEditForm {...props} fetchListHierarchyAttributeName={jest.fn()} userId={106} />);
    });

    it("should render if form action type is sibling", () => {
        const attributeData=[{id: 'test'}];
        const formData={attributeKey: 'test'};
        const formActionType='sibling';
        const flatternData= [{key: 'test'}];
        const selectedTreeKey=['test'];

        customRender(<AddEditForm {...props} flatternData={flatternData} selectedTreeKey={selectedTreeKey} formActionType={formActionType} attributeData={attributeData} formData={formData} />);
    });

    it("should render if form action type is child", () => {
        const attributeData=[{id: 'test1'}];
        const unFilteredAttributeData=[{id: 'test'}];
        const formData={attributeKey: 'test'};
        const formActionType='child';
        const selectedTreeKey=['test'];

        customRender(<AddEditForm {...props} selectedTreeKey={selectedTreeKey} formActionType={formActionType} unFilteredAttributeData={unFilteredAttributeData} attributeData={attributeData} formData={formData} />);
    });

    it("form fields should work properly", () => {
        customRender(<AddEditForm {...props} setFormBtnActive={jest.fn()} />);
        const attributeKey = screen.getByRole("combobox", { name: 'Attribute Level', exact: false });
        fireEvent.change(attributeKey, { target: { value: 'Dmatest' } });

        const code = screen.getByRole("textbox", { name: 'Code', exact: false });
        fireEvent.change(code, { target: { value: 'Dmatest' } });

        const shortDes = screen.getByRole("textbox", { name: /Short Description/i });
        fireEvent.change(shortDes, { target: { value: 'Dmatest' } });

        const longDes = screen.getByRole("textbox", { name: /Long Description/i });
        fireEvent.change(longDes, { target: { value: 'Dmatest' } });

        const statusBtn = screen.getAllByRole("switch", { name: 'Status', exact: false });
        fireEvent.click(statusBtn[0]);
    });

    it("Product Atrribute Details Collapse should work", () => {
        const formActionType='edit';
        customRender(<AddEditForm {...props} showProductAttribute={true} formActionType={formActionType} />);
        const productCollapse=screen.getByText('Product Atrribute Details');
        fireEvent.click(productCollapse);
    });

});