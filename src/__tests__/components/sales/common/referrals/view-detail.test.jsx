import React from 'react';
import { ViewDetail } from '@components/Sales/Common/Referrals/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Referrals View Detail Component', () => {
    it('Should render referrals View Detail components', ()=>{
        customRender(<ViewDetail />)
    })
})
