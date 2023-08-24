import { screen } from "@testing-library/react";
import customRender from "@utils/test-utils";import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from '@components/common/CustomerMaster/LeftSidebar/LeftSidebar';

afterEach(() => {
    jest.restoreAllMocks();
});

const profileDetailCardprops = {
    selectedCustomer:{
        customerName:"Gauri Sawant",
        accordion:true,
        expandIcon:jest.fn(),
    },
    selectedCustomerId:'1234',
    formActionType:{
        addMode: false,
        editMode: false,
        viewMode: true
    }
}

describe('Left Side Bar Component', () => {
    it('should menu nav comoponent', async () => {
        const formActionType={
            addMode: false,
            editMode: true,
            viewMode: false
        }
        customRender(<LeftSidebar formActionType={formActionType} />);
        expect(screen.getByText('Customer Details')).toBeVisible();
        expect(screen.getByText('Company Profile')).toBeVisible();
        expect(screen.getByText('Address')).toBeVisible();
        expect(screen.getByText('Contacts')).toBeVisible();
        expect(screen.getByText('Account Related')).toBeVisible();
        expect(screen.getByText('Supporting Document')).toBeVisible();
    });

    it("render ProfileDetailCard", ()=>{
        customRender(<LeftSidebar {...profileDetailCardprops} />)
    })

});