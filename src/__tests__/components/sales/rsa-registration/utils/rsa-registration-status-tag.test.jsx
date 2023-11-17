import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { RSARegistrationStatusTag } from 'components/Sales/RSARegistration/utils/RSARegistrationStatusTag';

describe("RSA Registration Status Tag Component", () => {

    it("should render rsa registration status tag component", () => {
        customRender(<RSARegistrationStatusTag />);
    });

    it("all status should work", () => {
        RSARegistrationStatusTag('Pending');
        RSARegistrationStatusTag('Pending for approval');
        RSARegistrationStatusTag('Pending for cancellation');
        RSARegistrationStatusTag('Approved');
        RSARegistrationStatusTag('Rejected');
        RSARegistrationStatusTag('Cancelled');
    });

});