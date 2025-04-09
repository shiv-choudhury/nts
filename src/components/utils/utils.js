export function storeTokenWithExpiry(token) {
  const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000; // expires in 1 day from now
  const tokenData = {
    token: token,
    expiresAt: expiresAt
  };
  localStorage.setItem("token", JSON.stringify(tokenData));
}

export const getValidToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (!tokenData) return null;

  if (tokenData?.expiresAt < new Date().getTime()) {
    localStorage.removeItem("token");
    return null;
  }

  return tokenData?.token;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
