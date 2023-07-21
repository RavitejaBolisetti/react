import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import PageHeader from '@pages/common/PageHeader/PageHeader';

describe('PageHeader Component', () => {
    it('should render PageHeader component', async () => {
        const { container } = customRender(<PageHeader />);
        expect(container).toMatchSnapshot();
    });
});
