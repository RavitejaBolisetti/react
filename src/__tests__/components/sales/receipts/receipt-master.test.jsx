import React from 'react';
import { ReceiptMaster } from 'components/Sales/Receipts/ReceiptMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('Receipts Component', () => {

    it('should render Receipts master component UI', () => {
        customRender(<ReceiptMaster />)
    });
 
});