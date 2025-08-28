import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import List from "./List";
import Form from "./Form";

import { TestProvider } from "context/TestContext";

const Index = () => {

    return(
        <>
        <TestProvider>
        <Routes>
            <Route exact path="/test">
                <List />
            </Route>
            <Route exact path="/test/detail/:id" >
                <Form />
            </Route>
            <Route exact path="/test/add" >
                <Form />
            </Route>
            <Navigate from="*" to="/" />
        </Routes>
        </TestProvider>
        </>
    );
}

export default Index;