import { fireEvent, screen, act, logRoles, } from "@testing-library/react";
import customRender from "@utils/test-utils";import '@testing-library/jest-dom/extend-expect';
import MenuNav from '@components/common/CustomerMaster/LeftSidebar/MenuNav';


describe("Render MenuNav component",()=>{
    const props = {
        customerType:"IND",
        currentSection:1,
        setCurretSection:jest.fn(),
        formActionType:{
            addMode:false,
            editMode: true,
            viewMode: false
        },
        selectedCustomerId:'CUS1687506569264',
        onHandle:jest.fn(),
        setCurrentSection:jest.fn()
    }
    it("render comoponet", ()=>{
        customRender(<MenuNav {...props}/>)

        const custDetails = screen.getByText('Customer Details')
        expect(custDetails).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(custDetails)

        const individualProfile = screen.getByText('Individual Profile')
        fireEvent.click(individualProfile)

        const address = screen.getByText('Address')
        expect(address).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(address)

        const contacts = screen.getByText('Contacts')
        expect(contacts).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(contacts)

        const familyDetails = screen.getByText('Family Details')
        expect(familyDetails).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(familyDetails)

        const accountRelated = screen.getByText('Account Related')
        expect(accountRelated).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(accountRelated)

        const supportingDocument = screen.getByText('Supporting Document')
        expect(supportingDocument).toHaveStyle({color: "rgb(11, 11, 12)"})
        fireEvent.click(supportingDocument)
    })
})