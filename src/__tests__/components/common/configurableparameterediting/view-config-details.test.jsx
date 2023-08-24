import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { ViewConfigDetails } from 'components/common/ConfigurableParameterEditing/ViewConfigDetails';

describe('Render AddEditForm Component', () => {
    it('Render Component', () => {
        customRender(<ViewConfigDetails styles={{}} />);
        expect(screen.getByRole('columnheader', { name: 'Control ID' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Control Description' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Control Group' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Configurable Parameter Type' })).toBeVisible();

        expect(screen.getByRole('row', { name: 'Control ID Control Description Control Group' })).toBeVisible();
        expect(screen.getByRole('row', { name: 'Configurable Parameter Type' })).toBeVisible();
    });
});
