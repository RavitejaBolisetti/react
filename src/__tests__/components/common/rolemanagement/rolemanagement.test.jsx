import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { RoleManagement } from '@components/common/RoleManagement/RoleManagement';

describe('RoleManagement Components', () => {
    it('should render RoleManagement components', () => {
        customRender(<RoleManagement />);
        const text = screen.getByText('Role List');
        expect(text).toBeTruthy();
        const textSearch = screen.findByPlaceholderText('Search');
        expect(textSearch).toBeTruthy();
        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);
    });
});
