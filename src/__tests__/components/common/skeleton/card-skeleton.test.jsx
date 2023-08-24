/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { CardSkeleton } from '@components/common/Skeleton/CardSkeleton';
import { screen } from '@testing-library/react';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('CardSkeleton component', () => {
    it('should render title and content skeletons by default', () => {
        customRender(<CardSkeleton />);

        // Assert that the title and content skeletons are rendered
        expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
        expect(screen.getByTestId('content-skeleton')).toBeInTheDocument();
    });

    it('should render only title skeleton when content prop is false', () => {
        customRender(<CardSkeleton content={false} />);

        // Assert that the title skeleton is rendered and content skeleton is not rendered
        expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
        expect(screen.queryByTestId('content-skeleton')).toBeNull(); // queryByTestId returns null if the element is not found
    });

    it('should render only content skeleton when title prop is false', () => {
        customRender(<CardSkeleton title={false} />);

        // Assert that the content skeleton is rendered and title skeleton is not rendered
        expect(screen.getByTestId('content-skeleton')).toBeInTheDocument();
        expect(screen.queryByTestId('title-skeleton')).toBeNull(); // queryByTestId returns null if the element is not found
    });

    it('should not render any skeleton when both title and content props are false', () => {
        customRender(<CardSkeleton title={false} content={false} />);

        // Assert that neither the title skeleton nor the content skeleton is rendered
        expect(screen.queryByTestId('title-skeleton')).toBeNull();
        expect(screen.queryByTestId('content-skeleton')).toBeNull();
    });
});
