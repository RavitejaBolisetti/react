import { fireEvent, screen, act } from "@testing-library/react";
import customRender from "@utils/test-utils";import '@testing-library/jest-dom/extend-expect';
import MenuNav from '@components/common/CustomerMaster/LeftSidebar/MenuNav';

afterEach(() => {
    jest.restoreAllMocks();
});

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
        selectedCustomerId:'123',
        onHandle:jest.fn(),
        setCurrentSection:jest.fn()
    }
    it("formBtnActive=false", ()=>{
        const buttonData = {formBtnActive:false};

        customRender(<MenuNav {...props} buttonData={buttonData} setButtonData={jest.fn()} />);

        const custDetails = screen.getByText('Customer Details')
        fireEvent.click(custDetails)
        
        const individualProfile = screen.getByText('Individual Profile')
        fireEvent.click(individualProfile)

        const address = screen.getByText('Address')
        fireEvent.click(address)

        const contacts = screen.getByText('Contacts')
        fireEvent.click(contacts)

        const familyDetails = screen.getByText('Family Details')
        fireEvent.click(familyDetails)

        const accountRelated = screen.getByText('Account Related')
        fireEvent.click(accountRelated)

        const supportingDocument = screen.getByText('Supporting Document')
        fireEvent.click(supportingDocument)
    })

})