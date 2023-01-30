import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Splash } from "components/Splash";
import { LoginPage } from "pages/auth/Login";
import MetaTag from "utils/MetaTag";
import { ROUTING_DASHBOARD, ROUTING_LOGIN } from "constants/routing";

export const SplashPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setIsLoading(false);
      navigate(userData ? ROUTING_DASHBOARD : ROUTING_LOGIN);
    }, 5000);
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <div>
          <MetaTag metaTitle="Spash" metaDescription="splash" />
          <Splash />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
