import React from "react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import ApplicationActionsForm from "components/common/ApplicationMaster/actions/ApplicationActionsForms";

describe('Application Actions Form Component', () => {
    it('should render application actions form component', async () => {
        customRender(<ApplicationActionsForm />);
     });
});