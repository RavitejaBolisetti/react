import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OnRoadPriceMasterPage } from '@pages/Sales/OnRoadPriceMaster/OnRoadPriceMasterPage';

describe('OnRoadPriceMasterPage Components', () => {
    it('should render OnRoadPriceMasterPage Page components', () => {
        customRender(<OnRoadPriceMasterPage />);
    });
});
