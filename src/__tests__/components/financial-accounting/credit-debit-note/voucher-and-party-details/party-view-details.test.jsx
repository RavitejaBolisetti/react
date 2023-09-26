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
        customRender(<ViewDetail  {...props}  activeKey={[1]}/>);

        const plusImg1 = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg1[0]);
    });

    it('render image2', () => {
        customRender(<ViewDetail  {...props}  activeKey={[2]}/>);

        const plusImg = screen.getAllByRole('img', {name:'plus'});
        fireEvent.click(plusImg[1]);
    });
});
