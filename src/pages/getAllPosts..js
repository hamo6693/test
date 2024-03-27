import React from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLoading,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "../config/axios";
import { GET_ALL_POSTS } from "../config/urls";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import avatar from "../avatar.png"
import "../styles/allPost.css"
import { chatboxEllipsesOutline, heart, heartOutline, logOutOutline } from "ionicons/icons";
import { Storage } from "@capacitor/storage";
import { useHistory } from "react-router";


const GetAllPosts = () => {
  const [showLoading, setShowLoading] = useState(false);

  const [posts, setPosts] = useState();



  const { jwt,setLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  const logOut = async () => {
    await Storage.remove({key:"accessToken"})
    setLoggedIn(false)
    history.push("/")
}

  useEffect(() => {
    getPosts();
  }, []);

  function doRefresh() {
    setTimeout(() => {
      getPosts();
    }, 1000);
  }
  

  const getPosts = async () => {
    setShowLoading(true);
    try {
      await axios
        .get(GET_ALL_POSTS, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setPosts(res.data);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e.response);
      setShowLoading(false);
    }
  };

  
  return (
    <IonPage>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} spinner="circles"  message="Loading..." />
      ) : (
        posts && (
          <>
        
        <IonToolbar color="primary">
        <IonButtons slot="secondary" className="toolbar">
          <IonButton fill="outline" className="btn-mr" onClick={() => logOut()}>
            <IonIcon slot="end" icon={logOutOutline}></IonIcon>
            تسجل الخروج
          </IonButton>
        </IonButtons>
        
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
                            <IonCard
                              routerLink={`/all-posts/${post.id}`}
                            >
                              <IonImg
                                src={post.Post_Images[0].img_uri}
                                className="post-image"
                              />
                              <IonCardContent>
                                <IonGrid>
                                  <IonRow>
                                    <IonAvatar className="post-avatar">
                                      {post.User.img_uri ? (
                                        <IonImg src={post.User.img_uri} key="id" />
                                      ) : (
                                        <IonImg src={avatar}  />
                                      )}
                                    </IonAvatar>
                                    <IonCol>
                                      <IonText className="post-user">
                                        {post.User.name}
                                      </IonText>
                                      
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
                                  <IonRow>

                          <IonCardSubtitle className="post-like">
                            {post.Likes.length} اعحاب 
                          
                          </IonCardSubtitle>
                          {post.Likes.length > 0 ? 
                          <IonIcon icon={heart} color="danger" className="post-icon" />
                          :
                          <IonIcon icon={heartOutline} color="primary" className="post-icon" />
                          }
                        </IonRow>
                        <IonRow>
                    <IonRow>
                    {post.Comments.length} تعليق
                    <IonCol size="3">
                            <IonIcon
                              icon={chatboxEllipsesOutline}
                              color="primary"
                              className="post-icon"
                             
                            />

                          </IonCol>
                          
                    
                </IonRow>
                        </IonRow>
                        
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
          </>
        )
      )}
    </IonPage>
  );
};
export default GetAllPosts;