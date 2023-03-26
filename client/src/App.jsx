import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import Layout from "./layout/Layout";
import "./App.css";


const App = () => {

 

  return (
    <Layout>
       <Routes>
        {routes.map((route) => {
          return <Route key={route.id} {...route} />;
        })}
      </Routes>
    </Layout>
  );
};

export default App;
