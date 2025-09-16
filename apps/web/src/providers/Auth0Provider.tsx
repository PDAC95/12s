import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

interface Auth0ProviderWrapperProps {
  children: React.ReactNode;
}

const Auth0ProviderWrapper = ({ children }: Auth0ProviderWrapperProps) => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;
