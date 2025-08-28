import { helpHttp } from "helpers/helpHttp";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import NotificationContext from "context/NotificationContext";
import LoadingContext from "context/LoadingContext";
import { useNavigate } from "react-router";

const TestContext = createContext();

const TestProvider = ({children}) => {

    const navigate = useNavigate();
    const { setMessage, setStatus, setType } = useContext(NotificationContext);
    const { setLoading } = useContext(LoadingContext);

    let api = helpHttp();

    const data = { };

    return <TestContext.Provider value={data}>{children}</TestContext.Provider>;
}

export { TestProvider };
export default TestContext;