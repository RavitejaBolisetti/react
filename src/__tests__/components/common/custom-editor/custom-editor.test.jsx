import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CustomEditor from '@components/common/CustomEditor/CustomEditor';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('CustomEditor Component', () => {
    it('should check Footer is working', async () => {
        customRender(<CustomEditor />);
    });
});
