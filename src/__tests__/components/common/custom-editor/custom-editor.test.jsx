import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import CustomEditor from '@components/common/CustomEditor/CustomEditor';

import { screen, fireEvent } from '@testing-library/react';

jest.mock('ckeditor4-react', () => {
    const CKEditor = ({ onChange, onBlur }) => {
        const handleButtonClick = (event) => {
            onChange();

            onBlur();
        };

        return (
            <div>
                <button onClick={handleButtonClick}>Change</button>
            </div>
        );
    };

    return {
        __esModule: true,

        CKEditor,
    };
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('CustomEditor Component', () => {
    it('should check Footer is working', async () => {
        customRender(<CustomEditor onChange={jest.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: 'Change' }));
    });
});
