export const SignOut = (cookies, setAuth, navigate) => {
    setAuth(null);
    navigate('/signin');
}