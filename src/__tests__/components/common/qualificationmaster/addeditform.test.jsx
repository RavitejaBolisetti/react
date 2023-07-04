import '@testing-library/jest-dom/extend-expect';
import { render, form, Form, screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';

import { AddEditForm } from '@components/common/QualificationMaster/AddEditForm';

export const fetchList = () => {
    return;
};
export const saveData = () => {
    return;
};

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm />);
    });
});

describe('AddEdit Fields', () => {
    it('should render fields', () => {
        customRender(<AddEditForm fetchList={fetchList} saveData={saveData} />);
        const field = screen.findByTestId('code');
        const field2 = screen.findByTestId('name');
        expect(field).toBeTruthy();
        expect(field2).toBeTruthy();
    });

    it('should render the toggle switch', () => {
        customRender(<AddEditForm fetchList={fetchList} saveData={saveData} />);
        // expect(screen.getByTestId('view-toggle')).toBeInTheDocument();
        const field3 = screen.findByTestId('view-toggle');
        expect(field3).toBeTruthy();
    });
});
