/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/FinancialAccounting/CreditDebitNote/VoucherAndPartyDetails/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ViewDetail components', () => {
    const props={
        typeData:['PARTY_CATEG'],
        formData:"",
        styles:{},
        setActiveKey:jest.fn(),
        formActionType:{viewMode:true},
        onChange:jest.fn()
    };

    it('render image1', () => {
        const activeKey = []
        const isPresent = true;

        customRender(<ViewDetail  {...props}  activeKey={activeKey} isPresent={isPresent} />);

        const plusImg1 = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg1[0]);

        const minusImg = screen.getByRole('img', {name:'minus'});
        fireEvent.click(minusImg);
    });

    it('render image2', () => {
        const activeKey = [];
        const isPresent = true;
        
        customRender(<ViewDetail  {...props}  activeKey={activeKey} isPresent={isPresent} />);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);

        const minusImg = screen.getByRole('img', {name:'minus'});
        fireEvent.click(minusImg);
    });
    
});
