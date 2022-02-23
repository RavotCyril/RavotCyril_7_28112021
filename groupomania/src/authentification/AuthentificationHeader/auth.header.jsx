function AuthHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // Pour Node.js Express back-end
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
export default AuthHeader();
