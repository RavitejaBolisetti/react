import React from "react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import CardAction from "components/common/ApplicationMaster/viewDeatils/CardAction";

describe('Card Action Component', () => {
    it('should render card action component', async () => {
        customRender(<CardAction />);
     });
});