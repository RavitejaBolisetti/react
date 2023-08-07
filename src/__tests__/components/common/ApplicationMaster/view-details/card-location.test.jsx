import React from "react";
import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import CardLocation from "components/common/ApplicationMaster/viewDeatils/CardLocation";

describe('Card Location Component', () => {
    it('should render card location component', async () => {
        customRender(<CardLocation />);
     });
});