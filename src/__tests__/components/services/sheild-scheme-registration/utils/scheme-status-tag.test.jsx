import React from 'react';
import { render } from '@testing-library/react';
import { SchemeStatusTag } from '@components/Services/ShieldSchemeRegistartion/utils/schemeStatusTag';
import { QUERY_BUTTONS_CONSTANTS } from '@components/Services/ShieldSchemeRegistartion/utils/ShieldRegistrationContant';
import { QUERY_BUTTONS_MNM_USER } from '@components/Services/ShieldSchemeRegistartion/utils/ShieldRegistrationContant';
import { screen, fireEvent, waitFor } from '@testing-library/react';

describe('SchemeStatusTag', () => {
    it('renders the correct tag for each status', () => {
        const pendingTag = SchemeStatusTag(QUERY_BUTTONS_CONSTANTS.PENDING.key);
        const approvedTag = SchemeStatusTag(QUERY_BUTTONS_CONSTANTS.APPROVED.key);
        const rejectedTag = SchemeStatusTag(QUERY_BUTTONS_CONSTANTS.REJECTED.key);
        const cancelledTag = SchemeStatusTag(QUERY_BUTTONS_CONSTANTS.CANCELLED.key);
        const pendingForApprovalTag = SchemeStatusTag(QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key);
        const pendingForCancellationTag = SchemeStatusTag(QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key);

        const { getByText } = render(
            <div>
                {pendingTag}
                {approvedTag}
                {rejectedTag}
                {cancelledTag}
                {pendingForApprovalTag}
                {pendingForCancellationTag}
            </div>
        );

        expect(getByText(QUERY_BUTTONS_CONSTANTS.PENDING.title)).toBeInTheDocument();
        expect(getByText(QUERY_BUTTONS_CONSTANTS.APPROVED.title)).toBeInTheDocument();
        expect(getByText(QUERY_BUTTONS_CONSTANTS.REJECTED.title)).toBeInTheDocument();
        expect(getByText(QUERY_BUTTONS_CONSTANTS.CANCELLED.title)).toBeInTheDocument();
        expect(getByText(QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.title)).toBeInTheDocument();
        expect(getByText(QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.title)).toBeInTheDocument();
    });
});
