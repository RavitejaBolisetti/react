import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';

import { AddEditForm } from '@components/common/QualificationMaster/AddEditForm';

describe('AddEditForm Components', () => {
    it('should render AddEditForm components', () => {
        customRender(<AddEditForm />);
    });
});
