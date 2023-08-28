import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewDetail } from '@components/Sales/VehicleDetail/ProductDetails/ViewDetails'; // Import the correct file path

describe('ViewDetail Component', () => {
    const mockFormData = {
        productAttributeDetail: {
            productDivision: 'Division A',
            modelFamily: 'Family X',
            // ...other data
        },
        connectedVehicle: [
            {
                tcuId: 'TCU001',
                esimNo: 'ESIM123',
                // ...other data
            },
            // ...more connected vehicles
        ],
    };

    const mockCollapseProps = {}; // Define your collapse props here

    it('should render product attribute details', () => {
        render(<ViewDetail formData={mockFormData} bindStatus={jest.fn()} collapseProps={mockCollapseProps} />);

        const productDivision = screen.getByText('Product Attribute Details');
        const modelFamily = screen.getByText('Connected Vehicle');
        const aggregates = screen.getByText('Aggregates');
        // ...assert other fields

        expect(productDivision).toBeInTheDocument();
        expect(modelFamily).toBeInTheDocument();
        expect(aggregates).toBeInTheDocument();
        // ...assert other fields
    });

    it('should expand and collapse panels', () => {
        render(<ViewDetail formData={mockFormData} bindStatus={jest.fn()} collapseProps={mockCollapseProps} />);

        const firstPanelHeader = screen.getByText('Product Attribute Details');
        const secondPanelHeader = screen.getByText('Connected Vehicle');
        const thirdPanelHeader = screen.getByText('Aggregates');
        const plusImg = screen.getAllByRole('img', { name: 'plus' });

        fireEvent.click(firstPanelHeader);
        expect(screen.getByText('Product Division')).toBeInTheDocument();

        fireEvent.click(secondPanelHeader);
        expect(screen.getByText('TCU001 | ESIM123')).toBeInTheDocument();

        fireEvent.click(thirdPanelHeader);
        // ...assert other fields in the aggregates panel
    });

    // Add more test cases as needed
});
