

import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${process.env.REACT_APP_BSE_URL}/api/v1/users`
})


export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext); // Track user data
    const [loggedIn, setLoggedIn] = useState(false); // Track login status


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })


            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                setUserData(request.data);
                setLoggedIn(true);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("userData");
        setUserData(null);
        setLoggedIn(false); // Set login status to false
        router("/login"); // Redirect to login page
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
        (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin, handleLogout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
