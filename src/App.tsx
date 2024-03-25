import React from "react";
import {  Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Register from "./pages/register";
import Login from "./pages/login";
import AppTabs from "./pages/appTaps";
import AuthContextProvider from "./context/authContext";
import GUEST from "./pages/gust";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/gust">
            <GUEST />
          </Route>

          <Route>
            <AppTabs />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthContextProvider>
  </IonApp>
);

export default App;
