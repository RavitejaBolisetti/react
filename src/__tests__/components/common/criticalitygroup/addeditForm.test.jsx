import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/CriticalityGroup/AddEditForm';

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        render(<AddEditForm />);
    });
});
