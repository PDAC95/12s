import React, { useState } from "react";
import { getCloudinaryUrl } from "../config/cloudinary";
import OrganicShapes from "../components/ui/OrganicShapes";
import MultiStepForm from "../components/ui/MultiStepForm";

interface FormStep {
  id: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface BasicFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  acceptTerms: boolean;
}

interface PasswordFormData {
  password: string;
  confirmPassword: string;
}

interface IDFormData {
  idFrontImage: File | null;
  idBackImage: File | null;
}

interface SelfieFormData {
  selfieImage: File | null;
}

interface OTPFormData {
  otpCode: string;
}

interface ProfileFormData {
  profileImage: File | null;
  username: string;
}

const RegisterPage: React.FC = () => {
  const logoWithText = getCloudinaryUrl("logo_nombre-azul_so0jwk");

  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<FormStep[]>([
    { id: 1, title: "Basic Info", isCompleted: false, isActive: true },
    { id: 2, title: "Password", isCompleted: false, isActive: false },
    { id: 3, title: "ID Verification", isCompleted: false, isActive: false },
    { id: 4, title: "Selfie", isCompleted: false, isActive: false },
    { id: 5, title: "OTP", isCompleted: false, isActive: false },
    { id: 6, title: "Profile", isCompleted: false, isActive: false },
  ]);

  // Form data for each step
  const [basicData, setBasicData] = useState<BasicFormData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    acceptTerms: false,
  });

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const [idData, setIdData] = useState<IDFormData>({
    idFrontImage: null,
    idBackImage: null,
  });

  const [selfieData, setSelfieData] = useState<SelfieFormData>({
    selfieImage: null,
  });

  const [otpData, setOtpData] = useState<OTPFormData>({
    otpCode: "",
  });

  const [profileData, setProfileData] = useState<ProfileFormData>({
    profileImage: null,
    username: "",
  });

  const [errors, setErrors] = useState<any>({});

  const updateSteps = (newCurrentStep: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({
        ...step,
        isCompleted: step.id < newCurrentStep,
        isActive: step.id === newCurrentStep,
      }))
    );
  };

  const handleNext = () => {
    // Comentar temporalmente las validaciones para probar navegación
    // if (validateCurrentStep()) {
    const nextStep = currentStep + 1;
    if (nextStep <= 6) {
      // Asegurar que no pase del paso 6
      setCurrentStep(nextStep);
      updateSteps(nextStep);
    }
    // }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateSteps(prevStep);
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: any = {};

    switch (currentStep) {
      case 1: // Basic Info
        if (!basicData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!basicData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!basicData.email) newErrors.email = "Email is required";
        if (!basicData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        if (!basicData.phoneNumber)
          newErrors.phoneNumber = "Phone number is required";
        if (!basicData.acceptTerms)
          newErrors.acceptTerms = "You must accept terms and conditions";
        break;

      case 2: // Password
        if (!passwordData.password) newErrors.password = "Password is required";
        else if (passwordData.password.length < 8)
          newErrors.password = "Password must be at least 8 characters";
        if (passwordData.password !== passwordData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;

      case 3: // ID Verification
        if (!idData.idFrontImage)
          newErrors.idFrontImage = "ID front image is required";
        if (!idData.idBackImage)
          newErrors.idBackImage = "ID back image is required";
        break;

      case 4: // Selfie
        if (!selfieData.selfieImage)
          newErrors.selfieImage = "Selfie is required";
        break;

      case 5: // OTP
        if (!otpData.otpCode || otpData.otpCode.length !== 6) {
          newErrors.otpCode = "Please enter the 6-digit code";
        }
        break;

      case 6: // Profile
        if (!profileData.username.trim())
          newErrors.username = "Username is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="register-step">
            <h2 className="register-step__title">Basic Info</h2>
            <p className="register-step__description">
              Let's get started with your basic information
            </p>

            <form className="register-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={basicData.firstName}
                  onChange={(e) =>
                    setBasicData({ ...basicData, firstName: e.target.value })
                  }
                  className={`form-input ${
                    errors.firstName ? "form-input--error" : ""
                  }`}
                />
                {errors.firstName && (
                  <span className="form-error">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Mail"
                  value={basicData.email}
                  onChange={(e) =>
                    setBasicData({ ...basicData, email: e.target.value })
                  }
                  className={`form-input ${
                    errors.email ? "form-input--error" : ""
                  }`}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={basicData.dateOfBirth}
                  onChange={(e) =>
                    setBasicData({ ...basicData, dateOfBirth: e.target.value })
                  }
                  className={`form-input ${
                    errors.dateOfBirth ? "form-input--error" : ""
                  }`}
                />
                {errors.dateOfBirth && (
                  <span className="form-error">{errors.dateOfBirth}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={basicData.phoneNumber}
                  onChange={(e) =>
                    setBasicData({ ...basicData, phoneNumber: e.target.value })
                  }
                  className={`form-input ${
                    errors.phoneNumber ? "form-input--error" : ""
                  }`}
                />
                {errors.phoneNumber && (
                  <span className="form-error">{errors.phoneNumber}</span>
                )}
              </div>

              <div className="form-group form-group--checkbox">
                <label className="form-checkbox-label">
                  <input
                    type="checkbox"
                    checked={basicData.acceptTerms}
                    onChange={(e) =>
                      setBasicData({
                        ...basicData,
                        acceptTerms: e.target.checked,
                      })
                    }
                    className="form-checkbox"
                  />
                  Accept Terms And Conditions
                </label>
                {errors.acceptTerms && (
                  <span className="form-error">{errors.acceptTerms}</span>
                )}
              </div>
            </form>
          </div>
        );

      case 2:
        return (
          <div className="register-step">
            <h2 className="register-step__title">Password</h2>
            <p className="register-step__description">
              Create a secure password for your account
            </p>

            <form className="register-form">
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                  className={`form-input ${
                    errors.password ? "form-input--error" : ""
                  }`}
                />
                {errors.password && (
                  <span className="form-error">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`form-input ${
                    errors.confirmPassword ? "form-input--error" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword}</span>
                )}
              </div>
            </form>
          </div>
        );

      case 3: // ID Verification
        return (
          <div className="register-step">
            <h2 className="register-step__title">ID Verification</h2>
            <p className="register-step__description">
              Please provide a photograph of your identification for
              verification.
            </p>

            <div className="register-form">
              <div className="form-group">
                <label className="form-label">ID Front</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-upload__input"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setIdData({ ...idData, idFrontImage: file });
                    }}
                  />
                  <div className="file-upload__icon">📷</div>
                  <div className="file-upload__text">
                    <strong>Id Front</strong>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">ID Back</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-upload__input"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setIdData({ ...idData, idBackImage: file });
                    }}
                  />
                  <div className="file-upload__icon">📷</div>
                  <div className="file-upload__text">
                    <strong>Id Back</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Selfie
        return (
          <div className="register-step">
            <h2 className="register-step__title">Selfie</h2>
            <p className="register-step__description">
              Submit a selfie for additional verification purposes.
            </p>

            <div className="register-form">
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  className="file-upload__input"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelfieData({ selfieImage: file });
                  }}
                />
                <div className="file-upload__icon">🤳</div>
                <div className="file-upload__text">
                  <strong>Take a selfie</strong>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // OTP
        return (
          <div className="register-step">
            <h2 className="register-step__title">OTP</h2>
            <p className="register-step__description">
              We have sent you an OTP code for verification. Please enter it to
              proceed.
            </p>

            <div className="otp-input">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="otp-input__digit"
                  onChange={(e) => {
                    const value = e.target.value;
                    const newOtp = otpData.otpCode.split("");
                    newOtp[index] = value;
                    setOtpData({ otpCode: newOtp.join("") });

                    // Auto-focus next input
                    if (value && index < 5) {
                      const nextInput = e.target.parentElement?.children[
                        index + 1
                      ] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button className="btn--primary btn--full">Done</button>
          </div>
        );

      case 6: // Profile
        return (
          <div className="register-step">
            <h2 className="register-step__title">Profile</h2>
            <p className="register-step__description">Your Profile</p>

            <div className="profile-setup">
              <div className="profile-setup__avatar">
                {profileData.profileImage ? (
                  <img
                    src={URL.createObjectURL(profileData.profileImage)}
                    alt="Profile"
                  />
                ) : (
                  <span>👤</span>
                )}
                <div className="profile-setup__avatar-add">+</div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setProfileData({ ...profileData, profileImage: file });
                  }}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Profile Name"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData({ ...profileData, username: e.target.value })
                  }
                  className={`form-input ${
                    errors.username ? "form-input--error" : ""
                  }`}
                />
                {errors.username && (
                  <span className="form-error">{errors.username}</span>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step {currentStep} content coming soon...</div>;
    }
  };

  return (
    <div className="register-page">
      <OrganicShapes />

      <div className="content-layer">
        <header className="register-header">
          <img
            src={logoWithText}
            alt="Soisi"
            className="register-header__logo"
          />
        </header>

        <main className="register-main">
          <div className="register-form-container">
            <MultiStepForm steps={steps} currentStep={currentStep}>
              {renderStepContent()}
            </MultiStepForm>

            {/* Navigation Buttons */}
            <div className="register-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn--nav btn--nav-back"
                >
                  ← Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="btn--nav btn--nav-next"
                disabled={currentStep >= 6}
              >
                {currentStep === 6 ? "Get Started" : "Next"} →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterPage;
