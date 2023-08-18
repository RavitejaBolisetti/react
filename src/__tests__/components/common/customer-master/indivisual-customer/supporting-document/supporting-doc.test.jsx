import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import { IndividualSupportingDocumentMaster } from '@components/common/CustomerMaster/IndividualCustomer/SupportingDocument/SupportingDocument';
const props = {
    formActionType: { viewMode: true },
};
describe('Common component', () => {
    it('should render the common contact component', () => {
        customRender(<IndividualSupportingDocumentMaster isVisible={true} {...props} />);
    });
});
