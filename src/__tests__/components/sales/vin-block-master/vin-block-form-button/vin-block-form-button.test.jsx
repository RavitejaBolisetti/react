import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { VinBlockFormButton } from 'components/Sales/VinBlockMaster/VinBlockFormButton';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Vin Block Form Button Component', () => {

    it('should check vin block form button', async () => {
        customRender(<VinBlockFormButton />);
    });

    it('test1', async () => {
        const buttonData={
            saveBtn: true,
            cancelBtn: true,
            closeBtn: true,
            formBtnActive: true
        };
        customRender(<VinBlockFormButton buttonData={buttonData} setButtonData={jest.fn()} />);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

});
