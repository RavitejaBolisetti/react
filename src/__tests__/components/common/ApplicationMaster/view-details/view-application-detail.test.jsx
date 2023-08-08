import React from "react";
import {  render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import ViewApplicationDetail from "components/common/ApplicationMaster/viewDeatils/ViewApplicationDetail";

describe('View Application Detail Component', () => {
    it('should render view application detail component', async () => {
        const applicationDetailsData=[{applicationAction:[{id:1, name:"Test"}], documentType:[{id:1, name:"Test"}], accessibleLocation:[{id:1, name:"Test"}]}];
        const styles={
            contentHeaderRightBackground:'Hello'
        }
        customRender(<ViewApplicationDetail applicationDetailsData={applicationDetailsData} styles={styles} />);
     });

     it('application actions, document type and accessible dealer location collapsed should work correctly', async () => {
        const applicationDetailsData=[{applicationAction:[{id:1, name:"Test"}], documentType:[{id:1, name:"Test"}], accessibleLocation:[{id:1, name:"Test"}]}];
        const styles={
            contentHeaderRightBackground:'Hello'
        }
        customRender(<ViewApplicationDetail applicationDetailsData={applicationDetailsData} styles={styles} />);

        const appActionCollapse = screen.getByRole("button", {name: 'Application Actions *', exact: false});
        fireEvent.click(appActionCollapse);
        const docTypeCollapse = screen.getByRole("button", {name: 'Document Type *', exact: false});
        fireEvent.click(docTypeCollapse);
        const accDealerLocationCollapse = screen.getByRole("button", {name: 'Accessible Dealer Location *', exact: false});
        fireEvent.click(accDealerLocationCollapse );
     });
});