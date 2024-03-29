import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { ViewConfigDetails } from 'components/common/ConfigurableParameterEditing/ViewConfigDetails';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render AddEditForm Component', () => {
    it('Render Component', () => {
        customRender(<ViewConfigDetails styles={{}} />);
        expect(screen.getByRole('columnheader', { name: 'Control Id' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Control Description' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Control Group' })).toBeVisible();
        expect(screen.getByRole('columnheader', { name: 'Configurable Parameter Type' })).toBeVisible();

        expect(screen.getByRole('row', { name: 'Control Id Control Description Control Group' })).toBeVisible();
        expect(screen.getByRole('row', { name: 'Configurable Parameter Type' })).toBeVisible();
    });
});
