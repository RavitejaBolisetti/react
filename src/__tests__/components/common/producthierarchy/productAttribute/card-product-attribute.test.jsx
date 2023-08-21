import React from 'react';
import { render, screen, fireEvent, act, getByTestId } from '@testing-library/react';
import CardProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/CardProductAttribute';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('CardProductAttribute', () => {

    it('should render card product attribute component', () => {
        render(<CardProductAttribute setDisabledEdit={jest.fn()} isVisible={true} />);
    });

    it('edit button should work', async () => {
        render(<CardProductAttribute setDisabledEdit={jest.fn()} isVisible={true} setFormBtnActive={jest.fn()} />);
        const editBtn = screen.getAllByRole('button', { name: '' })[0];
        await act(async () => {
            fireEvent.click(editBtn);
        })
    });

    it('delete should work', () => {
        const setSKUAttributes = jest.fn();
        render(<CardProductAttribute setDisabledEdit={jest.fn()} isVisible={true} setSKUAttributes={setSKUAttributes} forceUpdate={jest.fn()} />);
        const deleteBtn = screen.getAllByRole('button', { name: '' })[1];
        act(() => {
            fireEvent.click(deleteBtn);
            const setSKUAttributesFunction = setSKUAttributes.mock.calls[0][0];
            const prev = [{ attributeId: 1 }];
            setSKUAttributesFunction(prev);
        })

    });

    it('save button should work', async () => {
        const skuAttributes = [{ attributeId: 1, id: 'test', code: 'test', value: 'test' }];

        render(<CardProductAttribute forceUpdate={jest.fn()} setSKUAttributes={jest.fn()} skuAttributes={skuAttributes} setDisabledEdit={jest.fn()} isVisible={true} setFormBtnActive={jest.fn()} />);
        const editBtn = screen.getAllByRole('button', { name: '' });
        await act(async () => {
            fireEvent.click(editBtn[0]);
        })
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        await act(async () => {
            fireEvent.click(saveBtn);
        })
    });

    it('cancel button should work', async () => {
        render(<CardProductAttribute forceUpdate={jest.fn()} setSKUAttributes={jest.fn()} setDisabledEdit={jest.fn()} isVisible={true} setFormBtnActive={jest.fn()} />);
        const editBtn = screen.getAllByRole('button', { name: '' });
        await act(async () => {
            fireEvent.click(editBtn[0]);
        })
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        await act(async () => {
            fireEvent.click(cancelBtn);
        })
    });

});
