import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import Footer from '@components/Auth/Footer';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('Footer Component', () => {
    it('should check Footer is working', async () => {
        customRender(<Footer />);
    });

    it('should render Copyright components', () => {
        const { container } = customRender(<Footer />);
        expect(container.firstChild).not.toHaveClass('footerRight');
    });
});
