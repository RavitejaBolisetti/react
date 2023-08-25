import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import ViewImageUtils from 'components/common/CustomerMaster/Common/ViewImageUtils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View Image Utils Component', () => {

    it('should render the view image utils component', () => {
        customRender(<ViewImageUtils />);
    });

    it('replace image and cancel upload buttons should work', () => {
        const formData={
            image: true
        }

        customRender(<ViewImageUtils formData={formData} />);
        const replaceBtn=screen.getByRole('button', { name: 'Replace Image' });
        fireEvent.click(replaceBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel Upload' });
        fireEvent.click(cancelBtn);
    });

});