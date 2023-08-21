import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, getByRole, act } from '@testing-library/react';
import ProductAttributeMaster from '@components/common/ProductHierarchy/ProductAttribute/ProductAttributeMaster';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ProductAttributeMaster component', () => {
    it('should render the ProductAttributeMaster component', () => {
        customRender(<ProductAttributeMaster />);
    });

    it('should work if form submitted successfully', async () => {

        const skuAttributes = [{ attributeId: 1, id: 'test', code: 'test', value: 'test' }];
        const productHierarchyAttributeData = [{ id: 'test106', attributeCode: 'test106', label: 'test106' }];
        const setSKUAttributes = jest.fn();

        customRender(<ProductAttributeMaster forceUpdate={jest.fn()} setSKUAttributes={setSKUAttributes} isVisible={true} productHierarchyAttributeData={productHierarchyAttributeData} skuAttributes={skuAttributes} setDisabledEdit={jest.fn()} />);

        const attributeName = screen.getByRole('combobox', { name: 'Attribute Name' });
        fireEvent.change(attributeName, { target: { value: 'test106' } });
        const option = screen.getByText('test106');
        await act(async () => {
            fireEvent.click(option);
        })

        const attributeValue = screen.getByRole('textbox', { name: 'Attribute Value' });
        fireEvent.change(attributeValue, { target: { value: 'test106' } });

        const saveBtn = screen.getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(saveBtn);
        })
    });

    it('form failed should work', async () => {

        const skuAttributes = [{ attributeId: 1, id: 'test', code: 'test', value: 'test' }];
        const productHierarchyAttributeData = [{ id: 'test106', attributeCode: 'test106', label: 'test106' }];
        const setSKUAttributes = jest.fn();

        customRender(<ProductAttributeMaster forceUpdate={jest.fn()} setSKUAttributes={setSKUAttributes} isVisible={true} productHierarchyAttributeData={productHierarchyAttributeData} skuAttributes={skuAttributes} setDisabledEdit={jest.fn()} />);

        const attributeName = screen.getByRole('combobox', { name: 'Attribute Name' });
        fireEvent.change(attributeName, { target: { value: 'test106' } });
        const option = screen.getByText('test106');
        await act(async () => {
            fireEvent.click(option);
        })
        const saveBtn = screen.getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(saveBtn);
        })
    });
});
