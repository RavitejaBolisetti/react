import React from 'react';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import DocumentTypesForm from 'components/common/ApplicationMaster/documentTypes/DocumentTypesForm';

describe('Document Types Component', () => {
    it('should render document types component', async () => {
        customRender(<DocumentTypesForm />);
        const saveBtn = screen.getByRole('button', { name: 'plus Save' });
        fireEvent.click(saveBtn);
    });
});
