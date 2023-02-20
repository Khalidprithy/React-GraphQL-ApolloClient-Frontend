import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { LOGIN_MUTATION } from "../GraphQL/LoginMutation";

const AuthContext = createContext();

export default AuthContext;
export const AuthProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(null);

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleLogin = async (data) => {
        login({
            variables: {
                email: data.email,
                password: data.password,
            },
        })
            .then((response) => {
                console.log(response)
                Cookies.set('accessToken', response.login.accessToken, { expires: 7 });
                setUserToken(response.login.accessToken);
            })
            .catch((error) => {
                // Handle login error
                console.error(error);
            });
    }

    let contextData = {
        handleLogin: handleLogin,
        loading: loading,
        userToken: userToken,

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider >
    )

}