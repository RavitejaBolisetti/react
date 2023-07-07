import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { Dashboard } from "@components/Dashboard/Dashboard";
import { DashboardSkelton } from "@components/Dashboard/DashboardSkelton";

describe("dashboard component render",()=>{
    it("should render dashboard component ",()=>{
      customRender(<Dashboard />)
      expect(screen.getByText(/Home/i)).toBeInTheDocument();
    });
  });
  
describe("DashboardSkelton component render",()=>{
    it("should render DashboardSkelton component ",()=>{
      customRender(<DashboardSkelton />)
    });
  });