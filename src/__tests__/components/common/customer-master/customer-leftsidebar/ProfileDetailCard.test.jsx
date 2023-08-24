import { screen } from "@testing-library/react";
import customRender from "@utils/test-utils";import '@testing-library/jest-dom/extend-expect';
import ProfileDetailCard from '@components/common/CustomerMaster/LeftSidebar/ProfileDetailCard';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Render ProfileDetailCard comoponent",()=>{
    const props = {
        selectedCustomer:{
            customerName:"Gauri Sawant",
            accordion:true,
            expandIcon:jest.fn(),
        }
    }
    it("render component", ()=>{
        customRender(<ProfileDetailCard {...props} />)
        expect(screen.getByText('See less')).toBeVisible();
        expect(screen.getByText('Customer Type:')).toBeVisible();
        expect(screen.getByText('Mobile No.:')).toBeVisible();
    }) 
})