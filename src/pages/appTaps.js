import React from "react";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import Profile from "../pages/main";
import { Redirect, Route } from "react-router-dom";
import CreatePost from "./createPost";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import MyPosts from "./myPost";
import GetPost from "./getPost";
import GetAllPosts from "./getAllPosts.";
import UpdatePost from "./updatePost";

const AppTabs = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  if (!loggedIn) {
    return <Redirect to="/gust" />;
  } else {
    return (
      <IonTabs>
        <IonRouterOutlet id="menu">
          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/all-posts">
            <GetAllPosts />
          </Route>

          <Route exact path="/all-posts/:id">
            <GetPost />
          </Route>

          <Route exact path="/my-posts">
            <MyPosts />
          </Route>

          <Route exact path="/my-posts/:id">
            <UpdatePost />
          </Route>

          <Route exact path="/create-post">
            <CreatePost />
          </Route>

         

        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="create-post" href="/create-post">
            <IonLabel>نشر</IonLabel>
          </IonTabButton>
          <IonTabButton tab="all-posts" href="/my-posts">
            <IonLabel>منشوراتي</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    );
  }
};

export default AppTabs;
