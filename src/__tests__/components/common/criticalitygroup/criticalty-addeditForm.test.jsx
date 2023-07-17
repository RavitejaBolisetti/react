import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { AddEditForm } from '@components/common/CriticalityGroup/AddEditForm';

beforeEach(()=>{
    jest.clearAllMocks();
});
const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: true,
    formBtnActive: true,
  };
const saveButtonName = 'Save';
const isLoadingOnSave = false;

describe('should render AddEditForm', () => {
    it('should render the AddEditForm', () => {
        customRender(<AddEditForm  isVisible={true}  />);
        const groupId = screen.findByTestId('groupId');
        expect(groupId).toBeTruthy();

        expect(screen.getByTestId('toggle')).toBeInTheDocument();
        expect(screen.getByTestId('default-toggle')).toBeInTheDocument();

        const allowedTimings = screen.getByText(/allowed timings/i);
        expect(allowedTimings).toBeInTheDocument();

    });
    it("should render AddEditForm field and event check ", async () => {
        customRender(
            <AddEditForm 
                formData={{}}
                isVisible={true} 
                onCloseAction={jest.fn()} 
                buttonData={buttonData}
                setButtonData={jest.fn()} 
                handleButtonClick={jest.fn()}
                saveButtonName={saveButtonName}
                isLoadingOnSave={isLoadingOnSave}
            />
        );

        const criticalityGroupCode = screen.getByPlaceholderText("Enter id");
        fireEvent.change(criticalityGroupCode, { target: { value: "Dmatest" } });
        expect(criticalityGroupCode.value.includes("Dmatest"));
        const criticalityGroupName = screen.getByPlaceholderText("Enter name");
        fireEvent.change(criticalityGroupName, { target: { value: "Dmatest" } });
        expect(criticalityGroupName.value.includes("Dmatest"));
        
        const defaultGroupBtn = screen.getByTestId("default-toggle");
        fireEvent.click(defaultGroupBtn);
        const toggleBtn = screen.getByTestId("toggle");
        fireEvent.click(toggleBtn);
        const checkActive = screen.getAllByText("Active");
        expect(checkActive).toBeTruthy();
         
        await act(async () => {
            const criticalityDefaultGroup = screen.getByText("Add Time");
            fireEvent.click(criticalityDefaultGroup); 
        });  
        
            const cancelBtn = screen.getByText("Cancel");
            fireEvent.click(cancelBtn); 
    });
    it("should click on save button", async()=> {
        customRender(
            <AddEditForm 
                isVisible={true} 
                setButtonData={jest.fn()} 
                onCloseAction={jest.fn()} 
                handleButtonClick={jest.fn()}
                setTimeData={true}
                saveButtonName={saveButtonName}
                isLoadingOnSave={isLoadingOnSave}
            />
        );
  
    })
});
