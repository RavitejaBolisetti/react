import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CriticalityGroupPage } from '@pages/common/CriticalityGroup/CriticalityGroupPage';

describe('CrticalityGroupPageBase Components', () => {
    it('should render CrticalityGroupPageBase components', () => {
        const CrticalityGroupPageBase = customRender(<CriticalityGroupPage />);
        expect(CrticalityGroupPageBase).toMatchSnapshot();
    });
});
