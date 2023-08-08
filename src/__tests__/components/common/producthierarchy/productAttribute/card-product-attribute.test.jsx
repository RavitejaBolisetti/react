import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/CardProductAttribute';

const mockShowGlobalNotification = jest.fn();
const mockSetFormBtnActive = jest.fn();
const mockSetDisabledEdit = jest.fn();
const mockForceUpdate = jest.fn();

const mockProps = {
    isVisible: true,
    finalFormdata: {},
    attributeForm: {},
    forceUpdate: mockForceUpdate,
    skuAttributes: [
        { attributeId: 1, code: 'Attribute1', value: 'Value1' },
        { attributeId: 2, code: 'Attribute2', value: 'Value2' },
        { attributeId: 3, code: 'Attribute3', value: 'Value3' },
    ],
    setSKUAttributes: jest.fn(),
    productHierarchyAttributeData: [],
    setFormBtnActive: mockSetFormBtnActive,
    showGlobalNotification: mockShowGlobalNotification,
    setDisabledEdit: mockSetDisabledEdit,
};

describe('CardProductAttribute', () => {

    it('removes element with matching attributeId from skuAttributes', () => {
        render(<CardProductAttribute {...mockProps} />);
        const deleteButton = screen.getAllByTestId('delete-button')[0];
        fireEvent.click(deleteButton);
        expect(mockProps.setSKUAttributes)
    });

    it('renders correctly in readonly mode', () => {
        render(<CardProductAttribute {...mockProps} />);
        expect(screen.getByTestId('code')).toBeInTheDocument();
        expect(screen.getByTestId('secondary')).toBeInTheDocument();
        expect(screen.getByTestId('edit-button')).toBeInTheDocument();
        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
        expect(screen.queryByTestId('cancel')).not.toBeInTheDocument();
        expect(screen.queryByTestId('save')).not.toBeInTheDocument();
    });

    it('renders correctly in edit mode', () => {
        render(<CardProductAttribute {...mockProps} />);
        fireEvent.click(screen.getByTestId('edit-button'));
        expect(screen.getByTestId('cancel')).toBeInTheDocument();
        expect(screen.getByTestId('save')).toBeInTheDocument();
    });

    it('calls onAttributeEdit when edit button is clicked', () => {
        render(<CardProductAttribute {...mockProps} />);
        fireEvent.click(screen.getByTestId('edit-button'));
        expect(mockSetFormBtnActive).toHaveBeenCalledWith(true);
    });

    it('calls onAttributeDelete when delete button is clicked', () => {
        render(<CardProductAttribute {...mockProps} />);
        fireEvent.click(screen.getByTestId('delete-button'));
        expect(mockProps.setSKUAttributes).toHaveBeenCalled();
        expect(mockForceUpdate).toHaveBeenCalled();
    });

    it('calls onAttributeCancel when cancel button is clicked', () => {
        render(<CardProductAttribute {...mockProps} />);
        fireEvent.click(screen.getByTestId('edit-button'));
        fireEvent.click(screen.getByTestId('cancel'));
        expect(screen.getByTestId('edit-button')).toBeInTheDocument();
        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
        expect(screen.queryByTestId('cancel')).not.toBeInTheDocument();
        expect(screen.queryByTestId('save')).not.toBeInTheDocument();
    });

    it('calls onAttributeSave when save button is clicked', () => {
        render(<CardProductAttribute {...mockProps} />);
        fireEvent.click(screen.getByTestId('edit-button'));
        fireEvent.click(screen.getByTestId('save'));
        expect(mockProps.setSKUAttributes).toHaveBeenCalled();
        expect(mockForceUpdate).toHaveBeenCalled();
    });
});
