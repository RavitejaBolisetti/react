import React from 'react';
import { screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { ViewDetail } from '@components/common/CustomerMaster/CorporateCustomer/AccountRelated/ViewDetail';

describe('ViewDetailBase', () => {
    it('should render checkboxes when vipDealerInd is true and formActionType is viewMode', () => {
        const formData = {
            creditAmount: 1000,
            creditDays: 30,
            outstandingAmount: 500,
            partsDiscount: 0.1,
            labourDiscount: 0.2,
            remarks: 'Sample remarks',
            vipDealerInd: true,
        };
        const formActionType = { viewMode: true };
        const isLoading = false;
        const styles = {};

        customRender(<ViewDetail formData={formData} formActionType={formActionType} isLoading={isLoading} styles={styles} />);

        const vipDealerCheckbox = screen.getByRole('checkbox', { name: /VIP Dealer/i });
        expect(vipDealerCheckbox).toBeInTheDocument();
        expect(vipDealerCheckbox).toBeChecked();
        expect(vipDealerCheckbox).toBeDisabled();
    });

    it('should not render checkboxes when vipDealerInd is false', () => {
        const formData = {
            creditAmount: 1000,
            creditDays: 30,
            outstandingAmount: 500,
            partsDiscount: 0.1,
            labourDiscount: 0.2,
            remarks: 'Sample remarks',
            vipDealerInd: false,
        };
        const formActionType = { viewMode: true };
        const isLoading = false;
        const styles = {};

        customRender(<ViewDetail formData={formData} formActionType={formActionType} isLoading={isLoading} styles={styles} />);

        const vipDealerCheckbox = screen.queryByRole('checkbox', { name: /VIP Dealer/i });
        expect(vipDealerCheckbox).not.toBeInTheDocument();
    });
});
