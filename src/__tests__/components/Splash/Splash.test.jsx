/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { render, screen,waitFor } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { Splash } from "@components/Splash/Splash";
const setIsLoading = jest.fn();
const setShowB = jest.fn();
jest.useFakeTimers();
const props={
    setIsLoading: jest.fn(),
    setShowB: jest.fn(),
}
afterEach(() => {
    jest.restoreAllMocks();
  });
describe('splash component render', () => {

    it("should render splash component ",async ()=>{

        customRender(<Splash />);

        expect(screen.getByText(/Powered by/i)).toBeInTheDocument();
        
    });

    it('shows the "B" animation after 500 milliseconds', () => {
    
        customRender(<Splash isLoading={true} showB={true} {...props} />);
        const animationB = screen.getByAltText('logo-imagesB');
        expect(animationB).toHaveClass('opacity0')
        
    });

    it("should check setTimeOut function", async()=>{
        customRender(<Splash />);
        const animationB = screen.getByAltText('logo-imagesB');
        jest.runOnlyPendingTimers();

        await waitFor(() => expect(animationB).toHaveClass('opacity1'));

    })
    it('renders the logo and loading animation', async() => {

        customRender(<Splash />)

        const logoImageR = screen.getByAltText(/logo-imagesR/i)
       expect(logoImageR).toBeInTheDocument();  
       const logoImageO = screen.getByAltText(/logo-imagesO/i)
       expect(logoImageO).toBeInTheDocument(); 
       const logoImageB = screen.getByAltText(/logo-imagesB/i)
       expect(logoImageB).toBeInTheDocument(); 
       const logoImageI = screen.getByAltText(/logo-imagesI/i)
       expect(logoImageI).toBeInTheDocument(); 
       const logoImageN = screen.getByAltText(/logo-imagesN/i)
       expect(logoImageN).toBeInTheDocument(); 
    });




    it('shows the "B" animation after 500 milliseconds', async() => {

        customRender(<Splash />)

        // Check that the "B" animation is initially hidden

        const animationB = screen.getByAltText('logo-imagesB');

        await waitFor(() => expect(animationB).toHaveClass('opacity0'));

        // Wait for 500 milliseconds (0.5 seconds)

        jest.advanceTimersByTime(500);

        // Check that the "B" animation is now visible

        await waitFor(() => expect(animationB).toHaveClass('opacity1'));

    });




    it('shows the loading state after 1500 milliseconds', async() => { 
        customRender(<Splash />);

        // Check that the loading animation elements are initially hidden

        const animationR = screen.getByAltText('logo-imagesR');

        const animationO = screen.getByAltText('logo-imagesO');

        const animationI = screen.getByAltText('logo-imagesI');

        const animationN = screen.getByAltText('logo-imagesN');

        await waitFor(() => expect(animationR).toHaveClass('opacity0'));

        await waitFor(() => expect(animationO).toHaveClass('opacity0'));

        await waitFor(() => expect(animationI).toHaveClass('opacity0'));

        await waitFor(() => expect(animationN).toHaveClass('opacity0'));

        // Wait for 1500 milliseconds (1.5 seconds)

        jest.advanceTimersByTime(1500);

        // Check that the loading animation elements are now visible

        await waitFor(() => expect(animationR).toHaveClass('opacity1'));

        await waitFor(() => expect(animationO).toHaveClass('opacity1'));

        await waitFor(() => expect(animationI).toHaveClass('opacity1'));

        await waitFor(() => expect(animationN).toHaveClass('opacity1'));

    });

});
