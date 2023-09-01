import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { TrainingPage } from '@pages/user/TrainingPage/TrainingPage';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('TrainingPage Component', () => {
    it('should check TrainingPage is working', async () => {
        customRender(<TrainingPage />);
    });
});
