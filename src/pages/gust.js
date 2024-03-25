import React from "react";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "../config/axios";
import { GET_ALL_POSTS } from "../config/urls";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import avatar from "../avatar.png";
import "../styles/allPost.css";

const GUEST = () => {
  const [showLoading, setShowLoading] = useState(false);

  const [posts, setPosts] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setShowLoading(true);
    try {
      await axios.get(GET_ALL_POSTS, {}).then((res) => {
        console.log(res);
        setPosts(res.data);
        setShowLoading(false);

      });
    } catch (e) {
      console.log(e.response);
      setShowLoading(false);
    }
  };

  function doRefresh() {
    setTimeout(() => {
      getPosts();
    }, 1000);
  }
  return (
    <IonPage>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        posts && (
          <>
             <IonToolbar color="primary">
     
        
        <IonTitle>المنشورات </IonTitle>
      </IonToolbar>
         

            <IonContent className="ion-padding">
              <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent></IonRefresherContent>
              </IonRefresher>
              <IonGrid>
                <IonRow>
                  {posts.length > 0 ? (
                    posts
                      .slice()
                      .reverse()
                      .map((post) => {
                        return (
                          <IonCol sizeMd="6" size="12" key={post.id}>
                            <IonCard>
                              <IonImg
                                src={post.Post_Images[0].img_uri}
                                className="post-image"
                              />
                              <IonCardContent>
                                <IonGrid>
                                  <IonRow>
                                    <IonAvatar className="post-avatar">
                                      {post.User.img_uri ? (
                                        <IonImg
                                          src={post.User.img_uri}
                                          key="id"
                                        />
                                      ) : (
                                        <IonImg src={avatar} />
                                      )}
                                    </IonAvatar>
                                    <IonCol>
                                      <IonText className="post-user">
                                        {post.User.name}
                                      </IonText>
                                      <IonText
                                        color="warning"
                                        className="post-moment"
                                      ></IonText>
                                    </IonCol>
                                  </IonRow>
                                  <IonCardTitle
                                    color="primary"
                                    className="post-title "
                                  >
                                    {post.title}
                                  </IonCardTitle>
                                  <IonCardSubtitle className="post-contents">
                                    {post.contents}
                                  </IonCardSubtitle>
                                </IonGrid>
                              </IonCardContent>
                            </IonCard>
                          </IonCol>
                        );
                      })
                  ) : (
                    <IonCol sizeMd="6" offsetMd="3">
                      <IonCard className="ion-padding ion-text-center">
                        <IonCardTitle color="primary">
                          لا يوجد منشور لعرضه
                        </IonCardTitle>
                      </IonCard>
                    </IonCol>
                  )}
                </IonRow>
              </IonGrid>
            </IonContent>
            <IonTabBar slot="bottom">
              <IonTabButton tab="register" href="/register">
                <IonLabel>تسجيل حساب</IonLabel>
              </IonTabButton>
              <IonTabButton tab="login" href="/login">
                <IonLabel>تسجيل دخول</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </>
        )
      )}
    </IonPage>
  );
};
export default GUEST;
