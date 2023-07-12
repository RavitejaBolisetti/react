import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AddEditForm  from '@components/common/CriticalityGroup/AllowedTimings/AddEditForm';

describe('Allowed timings AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm isVisible={true} viewMode={false} />);
    });
});
