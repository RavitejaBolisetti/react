import React from 'react';
import { render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import { tblActionColumn } from 'components/Sales/DigitalSignatureMapping/tableColumn';

describe('tableColumn', () => {
    it('should render the table column correctly', () => {
        const handleButtonClick = jest.fn();
        const ActionColumn = tblActionColumn({handleButtonClick});

        render(<div>{ActionColumn.render('Test', null, 1)}</div>);
        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);
        const mapSignature=screen.getByRole('button', { name: 'Map Signature' });
        fireEvent.click(mapSignature);
    });
});

