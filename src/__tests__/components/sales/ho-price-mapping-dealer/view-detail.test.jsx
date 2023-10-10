import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from 'components/Sales/HoPriceMappingDealer/ViewDetail';
import customRender from '@utils/test-utils';

describe('ViewDetail', () => {
    it('should render the view details correctly', () => {
        const formActionType = { viewMode: true };
        const modelGroupArr = [{ dealerParent: 'test', stateCode: 'test123', cityCode: 'test23', modelCode: 'Toyo23', prodctCode: 'test' }];
        const modelDealerMapResponse = { hoPriceDetailData: { modelDealerMapResponse: [{ id: 1, status: true }] } };
        customRender(<ViewDetail isVisible={true} modelGroupArr={modelGroupArr} hoPriceDetailData={modelDealerMapResponse} formActionType={formActionType} setViewProductData={jest.fn()} />);
    });
});
