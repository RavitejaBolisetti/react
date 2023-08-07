import React from "react";
import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import ApplicationActionsForm from "components/common/ApplicationMaster/actions/ApplicationActionsForms";

describe('Application Actions Form Component', () => {
    it('should render application actions form component', async () => {
        customRender(<ApplicationActionsForm />);
     });
});