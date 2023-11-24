import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ChargerInstallationFormButton } from 'components/Sales/ChargerInstallationProcess/ChargerInstallationFormButton/ChargerInstallationFormButton';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Charger Installation Form Button Component', () => {

    it('should render charger installation form button component', () => {
        customRender(<ChargerInstallationFormButton isVisible={true}/>);
    });

    it('all buttons should work', () => {
        const buttonData={
            closeBtn: true,
            cancelBtn: true,
            approveCancelBtn: true,
            addRequestBtn: true,
            nextBtn: true,
            saveBtn: true,
            formBtnActive: true
        }
        customRender(<ChargerInstallationFormButton isVisible={true} buttonData={buttonData} setButtonData={jest.fn()} handleButtonClick={jest.fn()} />);
        
        const addRequest=screen.getByRole('button', { name: 'Add request' });
        fireEvent.click(addRequest);

        const nextBtn=screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);

        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});