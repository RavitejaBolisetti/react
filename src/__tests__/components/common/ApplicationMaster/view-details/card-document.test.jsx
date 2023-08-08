import React from "react";
import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import CardDocument from "components/common/ApplicationMaster/viewDeatils/CardDocument";

describe('Card Document Component', () => {
    it('should render card document component', async () => {
        customRender(<CardDocument />);
     });
});