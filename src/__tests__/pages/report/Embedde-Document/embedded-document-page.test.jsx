import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { EmbeddedDocumentPage } from '@pages/report/EmbeddedDocument/EmbeddedDocumentPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Embedded Document page Components', () => {
    it('should render Embedded components', () => {
        customRender(<EmbeddedDocumentPage />);
    });
});
