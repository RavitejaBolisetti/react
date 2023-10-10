/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { InputSkeleton } from '@components/common/Skeleton/InputSkeleton';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('InputSkeleton Components', () => {
    it('should render InputSkeleton components', () => {
        customRender(<InputSkeleton />);
    });
});

describe('InputSkeleton', () => {
    it('renders the skeleton with default theme correctly', () => {
        const { container } = customRender(<InputSkeleton />);
        const skeleton = container.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders the skeleton with light theme correctly', () => {
        const { container } = customRender(<InputSkeleton theme="light" />);
        const skeleton = container.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders the skeleton with dark theme correctly', () => {
        const { container } = customRender(<InputSkeleton theme="dark" />);
        const skeleton = container.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders the skeleton with card theme correctly', () => {
        const { container } = customRender(<InputSkeleton theme="card" />);
        const skeleton = container.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('renders the skeleton with any theme correctly', () => {
        const { container } = customRender(<InputSkeleton theme="any" count={2} />);
        const skeleton = container.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });
});
