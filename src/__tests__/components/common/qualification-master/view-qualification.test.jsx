import React from 'react';
import { render, screen } from '@testing-library/react';
import { ViewQualificationList } from '@components/common/QualificationMaster/ViewQualificationList';

describe('ViewQualificationList', () => {
    test('renders qualification details correctly', () => {
        const formData = {
            qualificationCode: 'Q123',
            qualificationName: 'Sample Qualification',
            status: 1,
        };

        render(<ViewQualificationList formData={formData} style={{}} />);

        expect(screen.getByText('Qualification Code')).toBeInTheDocument();
        expect(screen.getByText('Q123')).toBeInTheDocument();

        expect(screen.getByText('Qualification Name')).toBeInTheDocument();
        expect(screen.getByText('Sample Qualification')).toBeInTheDocument();

        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
    });
});
