import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import ViewApplicationDetail from "components/common/ApplicationMaster/viewDeatils/ViewApplicationDetail";

afterEach(() => {
    jest.restoreAllMocks();
});

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
        const { container }=customRender(<ViewApplicationDetail applicationDetailsData={applicationDetailsData} styles={styles} />);

        const collapseBtn=container.getElementsByClassName('ant-collapse-expand-icon');
        fireEvent.click(collapseBtn[0]);
        fireEvent.click(collapseBtn[1]);
        fireEvent.click(collapseBtn[2]);
     });
});