import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AllowedTimingCard  from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingCard';

describe('AllowedTimingCard Components', () => {
    it('should render AllowedTimingCard components', () => {
        const { container } = customRender(<AllowedTimingCard />);
        expect(container.firstChild).toHaveClass('timingCardItem');
    });
    
});