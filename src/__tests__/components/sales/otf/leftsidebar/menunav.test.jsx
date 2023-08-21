/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import  MenuNav  from '@components/Sales/OTF/LeftSidebar/MenuNav';
afterEach(() => {
    jest.restoreAllMocks();
  }); 
describe('Menu test Components', () => {
    it('it should render menunav components', () => {
        customRender(<MenuNav setCurrentSection={jest.fn()}/>);
        const activebtn = screen.getByText(/otf details/i)
        fireEvent.click(activebtn);
    });
});
