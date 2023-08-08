import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, logRoles, act } from '@testing-library/react';
import { OTFStatusBar } from 'components/Sales/OTF/utils/OTFStatusBar';

describe('OTF Form Button Component', () => {
    it('should render otf form button component', () => {
        customRender(<OTFStatusBar />);
    });
    it('if status is cancelled', () => {
        customRender(<OTFStatusBar status={'C'} />);
    });
    it('if status is transferred', () => {
        customRender(<OTFStatusBar status={'T'} />);
    });
});