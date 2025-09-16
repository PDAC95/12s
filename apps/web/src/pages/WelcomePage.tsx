import React from "react";
import { getCloudinaryUrl } from "../config/cloudinary";
import OrganicShapes from "../components/ui/OrganicShapes";

const WelcomePage: React.FC = () => {
  const logoWithText = getCloudinaryUrl("logo_nombre-azul_so0jwk");
  const googleIcon = getCloudinaryUrl("google_oms92l");
  const appleIcon = getCloudinaryUrl("apple_n1ki7x");

  return (
    <div className="welcome-page">
      {/* Background Organic Shapes - reemplaza completamente hexágonos */}
      <OrganicShapes />

      {/* Main Content */}
      <div className="content-layer">
        {/* Header */}
        <header className="welcome-header">
          <img
            src={logoWithText}
            alt="Soisi"
            className="welcome-header__logo"
          />
        </header>

        {/* Hero Content */}
        <main className="welcome-main">
          <div className="welcome-hero">
            <h1 className="welcome-hero__title">
              Welcome to Soisi:
              <br />
              <span className="welcome-hero__title-subtitle">
                Embrace challenges,
                <br />
                embrace victory
              </span>
            </h1>

            <p className="welcome-hero__description">
              Get ready to embrace thrilling challenges on Soisi!
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="welcome-footer">
          <div className="welcome-footer__content">
            {/* Social Login Icons */}
            <div className="welcome-footer__social">
              <button className="btn--social">
                <img src={googleIcon} alt="Google" className="social-icon" />
              </button>
              <button className="btn--social">
                <img src={appleIcon} alt="Apple" className="social-icon" />
              </button>
            </div>

            {/* Get Started Button */}
            <button className="btn--get-started">
              Get Started
              <span>→</span>
            </button>

            {/* Sign In Link */}
            <p className="welcome-footer__signin">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;
