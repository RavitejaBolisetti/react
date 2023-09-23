import '@testing-library/jest-dom/extend-expect';
import { ChangeHistory } from '@components/common/TermsAndConditions/DealerTermCondition/changeHistoryForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Manufacturer term Change History components', () => {
    const ChangeHistoryTermsConditionsData = [{ id: '1', name: 'kai' }];
    it('Should render Change History components', () => {
        customRender(<ChangeHistory isVisible={true} ChangeHistoryTermsConditionsData={ChangeHistoryTermsConditionsData} onCloseAction={jest.fn()} showChangeHistoryList={true} />);
    });
    it('clode button should work', () => {
        customRender(<ChangeHistory isVisible={true} ChangeHistoryTermsConditionsData={ChangeHistoryTermsConditionsData} onCloseAction={jest.fn()} />);

        const closeBtn = screen.getByRole('img', { name: /close/i });
        fireEvent.click(closeBtn);
    });
});
