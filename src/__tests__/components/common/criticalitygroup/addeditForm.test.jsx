import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { generateRandomNumber } from 'utils/generateRandomNumber';

import { AddEditForm } from '@components/common/CriticalityGroup/AddEditForm';

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        render(<AddEditForm />);
    });
});

describe('AddEdit Fields', () => {
    it('should render fields', () => {
        render(<AddEditForm generateRandomNumber={generateRandomNumber} isVisible={true} formActionType={{ addMode: true, editMode: false, viewMode: false }} />);
        const field = screen.findByTestId('groupId');
        const field2 = screen.findByTestId('name');
        expect(field).toBeTruthy();
        expect(field2).toBeTruthy();
    });
});

describe('should toggle switch', () => {
    it('should render the toggle switch', () => {
        render(<AddEditForm isVisible={true} formActionType={{ addMode: true, editMode: false, viewMode: false }} />);
        expect(screen.getByTestId('toggle')).toBeInTheDocument();
        expect(screen.getByTestId('default-toggle')).toBeInTheDocument();

        // const handleChange = jest.fn();
        // props.isChecked = false;
        // props.onChange = handleChange;

        // const { container } = render(<AddEditForm {...props} />);
        // const checkbox = container.querySelectorAll("input[type='checkbox']")[0];

        // fireEvent.click(checkbox);
        // expect(handleChange).toHaveBeenCalledTimes(1);

        // expect(checkbox.checked).toBe(true);
    });
});
