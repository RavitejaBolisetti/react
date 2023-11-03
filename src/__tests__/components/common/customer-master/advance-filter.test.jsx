/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import AdvanceFilter from '@components/common/CustomerMaster/AdvanceFilter';
import { fireEvent, screen } from '@testing-library/react';

describe('advance filter component', () => {
    it('should render advance filter component', () => {
        customRender(<AdvanceFilter settoggleButton={jest.fn()} handleAdd={jest.fn()} />);

        const comboSelect = screen.getByRole('combobox', { name: '' });
        fireEvent.change(comboSelect, { target: { value: 'test' } });

        const searchSelect = screen.getByPlaceholderText('Search');
        fireEvent.change(searchSelect, { target: { value: 'test123' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.change(searchBtn);

        const IndividualBtn = screen.getByRole('button', { name: 'Individual' });
        fireEvent.click(IndividualBtn);

        const CorporateBtn = screen.getByRole('button', { name: 'Corporate' });
        fireEvent.click(CorporateBtn);

        const plusAdd = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);
    });
});
