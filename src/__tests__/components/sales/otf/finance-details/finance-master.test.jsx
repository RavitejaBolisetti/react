import React from 'react';
import { screen, render } from '@testing-library/react';
import FinananceDetailsMaster from '@components/Sales/OTF/FinananceDetails/FinananceDetailsMaster';
import customRender from '@utils/test-utils';

const props = {
    formActionType: { viewMode: true },
};

describe('OTF finance view Details render', () => {
    const mockForm = {
        setFieldsValue: jest.fn(),
    };
    it('should render view details page', async () => {
        render(<FinananceDetailsMaster {...props} form={mockForm} />);
        screen.debug();
    });
});
