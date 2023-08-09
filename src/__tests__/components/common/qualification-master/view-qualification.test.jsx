import React from 'react';
import { render } from '@testing-library/react';
import { ViewQualificationList } from '@components/common/QualificationMaster/ViewQualificationList';

describe('ViewQualificationList', () => {
    test('renders qualification details correctly', () => {
        const formData = {
            qualificationCode: 'Q123',
            qualificationName: 'Sample Qualification',
            status: 1,
        };

        const { getByText } = render(<ViewQualificationList formData={formData} style={{}} />);

        expect(getByText('Qualification Code')).toBeInTheDocument();
        expect(getByText('Q123')).toBeInTheDocument();

        expect(getByText('Qualification Name')).toBeInTheDocument();
        expect(getByText('Sample Qualification')).toBeInTheDocument();

        expect(getByText('Status')).toBeInTheDocument();
        expect(getByText('Active')).toBeInTheDocument();
    });
});
