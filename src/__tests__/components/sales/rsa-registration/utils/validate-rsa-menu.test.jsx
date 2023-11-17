import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { validateRSAMenu } from 'components/Sales/RSARegistration/utils/validateRSAMenu';

describe("Validate RSA Menu Tag Component", () => {

    it("should render validate rsa menu component", () => {
        customRender(<validateRSAMenu isVisible={true} />);
    });

    it("should return empty status", () => {
        const props={
            item: { id: 4 },
            formActionType: { viewMode: true }
        }
        validateRSAMenu(props);
    });

    it("should return view mode", () => {
        const props={
            item: { id: 3 },
            formActionType: { viewMode: true }
        }
        validateRSAMenu(props);
    });

    it("should return default", () => {
        const props={
            item: { id: 1 },
            formActionType: { viewMode: true }
        }
        validateRSAMenu(props);
    });

});