import React from "react"

import {
    IonAvatar,
    IonCard,
    IonCardSubtitle,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonItem,
    IonItemDivider,
    IonList,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonRefresher,
    IonRefresherContent,
   
  } from "@ionic/react";
  import { chatboxEllipsesOutline } from "ionicons/icons";
  import "../styles/getPost.css";
  //import avatar from "./assets/images/avatar.png";
  import axios from "../config/axios";
  import { GET_ALL_POSTS } from "../config/urls";
  import { useContext, useEffect, useState } from "react";
  import { AuthContext } from "../context/authContext";
import Header from "../components/Header";
import Like from "../components/Like";
import CreateComment from "../components/Comment/CreateComment";
import GetComment from "../components/Comment/GetComment";
import avatar from "../avatar.png"

  
  
  
  const GetPost = () => {
    const [newComment, setNewComment] = useState();
    //وضع الاعجابات
    const [likeCount, setLikeCount] = useState();
  
    const [showLoading, setShowLoading] = useState(false);
    const [post, setPost] = useState();
  
    const postId = window.location.pathname.split("/")[2];
    const { jwt } = useContext(AuthContext);
  
    useEffect(() => {
      getPost();
    }, []);
  
    const getPost = async () => {
      setShowLoading(true);
      try {
        await axios
          .get(GET_ALL_POSTS + "/" + postId, {
            headers: {
              Authorization: jwt,
            },
          })
          .then((res) => {
            console.log(res);
            setPost(res.data);
            setShowLoading(false);
          });
      } catch (e) {
        console.log(e.response);
        setShowLoading(false);
      }
    };
    function getContent() {
      return document.querySelector("#content");
    }
    function scrollToBottom() {
      getContent().scrollToBottom(500);
    }
  
    function doRefresh() {
      setTimeout(() => {
        getPost();
      }, 10000);
    }
    return (
      <IonPage>
        
        {showLoading ? (
          <IonLoading isOpen={showLoading} duration={10000} />
        ) : (
          post && (
            <>
                        <Header headerTitle="صفحة المنشور" />

              <IonContent scrollEvents={true} id="content">
              <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                  <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                  <IonRow>
                    <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                      {post.Post_Images.map((img) => {
                        return <IonImg src={img.img_uri} key="id" />;
                      })}
  
                      <IonGrid>
                        <IonRow>
                        <Like sendToParent={setLikeCount} />
                        
                          <IonCol size="3">
                            <IonIcon
                              icon={chatboxEllipsesOutline}
                              color="primary"
                              className="post-icon"
                              onClick={() => {
                                scrollToBottom();
                              }}
                            />
                            
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCardSubtitle className="post-like">
                          {likeCount} اعجاب
                          </IonCardSubtitle>
                        </IonRow>
                      </IonGrid>
                      <IonCard className="ion-no-margin ion-margin-bottom">
                        <IonGrid>
                          <IonRow className="ion-margin-top">
                            <IonAvatar>
                              {post.User.img_uri ? (
                                <IonImg src={post.User.img_uri} />
                              ) : (
                                <IonImg src={avatar}  />
                              )}
                            </IonAvatar>
                            <IonCol>
                              <IonCardSubtitle className="post-username">
                                {post.User.name}
                              </IonCardSubtitle>
                             
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                        <IonList>
                          <IonItem lines="none">
                            <IonText>
                              <p>{post.title}</p>
                              <p>{post.contents}</p>
                            </IonText>
                          </IonItem>
                        </IonList>
                      </IonCard>
                      <IonItemDivider color="light">
                        <IonText color="primary">
                          <h3 className="ion-no-margin">التعليقات</h3>
                        </IonText>
                      </IonItemDivider>
                      <GetComment comment={newComment} />

                      <IonItemDivider color="light">
                        <IonText color="primary">
                          <h3>اكتب تعليق</h3>
                        </IonText>
                      </IonItemDivider>
                      <CreateComment SendToParent={setNewComment} />

                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonContent>
            </>
          )
        )}
      </IonPage>
    );
  };
  
  export default GetPost;
