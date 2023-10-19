import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/common/LessorCompanyMaster/AddEditForm';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const formActionType = { addMode: true };

describe('Addedit Lessor CompanyMaster components', () => {
    const status = true;
    it('addedit component', () => {
        customRender(<AddEditForm isVisible={true} formActionType={formActionType} status={status} setButtonData={jest.fn()} />);

        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });
        fireEvent.change(companyCode, { target: { value: 'Test' } });
        const companyName = screen.getByRole('textbox', { name: 'Company Name' });
        fireEvent.change(companyName, { target: { value: 'Test' } });
        const active = screen.getByText('Active');
        fireEvent.click(active);
        const saveBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(saveBtn);
    });
    it('test1', () => {
        const formActionType = { viewMode: true };

        customRender(<AddEditForm isVisible={true} formActionType={formActionType} status={status} />);
    });
});
