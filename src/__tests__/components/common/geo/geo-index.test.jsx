import '@testing-library/jest-dom/extend-expect';
import { ListStateCrudMaster, ListStateMaster, ListDistrictMaster, ListCityMaster, ListTehsilMaster, ListPinCodeMaster } from '@components/common/Geo';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Geo components', () => {
    it('should render Geo ListStateCrudMaster components', () => {
        customRender(<ListStateCrudMaster/>)
    });

    it('should render Geo ListStateMaster components', () => {
        customRender(<ListStateMaster/>)
    });

    it('should render Geo ListDistrictMaster components', () => {
        customRender(<ListDistrictMaster/>)
    });

    it('should render Geo ListCityMaster components', () => {
        customRender(<ListCityMaster/>)
    });

    it('should render Geo ListTehsilMaster components', () => {
        customRender(<ListTehsilMaster/>)
    });

    it('should render Geo ListPinCodeMaster components', () => {
        customRender(<ListPinCodeMaster/>)
    });
});