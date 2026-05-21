let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[auth/token] setAccessToken", Boolean(token));
  }
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
  accessToken = null;

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[auth/token] clearAccessToken");
  }
};
