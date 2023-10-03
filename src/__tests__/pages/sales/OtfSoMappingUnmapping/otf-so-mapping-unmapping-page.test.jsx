import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { OtfSoMappingUnmappingMasterPage } from '@pages/Sales/OtfSoMappingUnmapping/OtfSoMappingUnmappingMasterPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('OtfSoMappingUnmappingMaster Page   Components', () => {
    it('should render OtfSoMappingUnmappingMaster components', () => {
        customRender(<OtfSoMappingUnmappingMasterPage />);
    });
});
