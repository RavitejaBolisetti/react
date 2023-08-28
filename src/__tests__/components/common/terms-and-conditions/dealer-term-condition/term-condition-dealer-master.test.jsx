import '@testing-library/jest-dom/extend-expect';
import { TermConditionDealerMaster } from '@components/common/TermsAndConditions/DealerTermCondition';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Dealer Master components', () => {
    it('should render Term Condition Dealer Master components', () => {
        customRender(<TermConditionDealerMaster/>)
    });
});