import React, { useRef } from "react";

import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "../config/axios";
import { GET_MY_POSTS } from "../config/urls";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const UpdatePost = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const postId = window.location.pathname.split("/")[2];
  console.log(postId)
  const [showLoading, setShowLoading] = useState(false);
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [img, setImg] = useState();
  const takePhotoRef = useRef();
  const { takePhoto, blobUrl } = usePhotoGallery();
  const [photos, setPhotos] = useState([]);

  const { jwt } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getPost();
  }, []);

  const validator = () => {
    if (title && contents) {
      setShowAlert(true);
    } else {
      setShowToast(true);
    }
  };

  const getPost = async () => {
    setShowLoading(true);
    try {
      await axios
        .get(GET_MY_POSTS + "/" + postId, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setImg(res.data.Post_Images[0].img_uri);
          setTitle(res.data.title);
          setContents(res.data.contents);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e.response);
      setShowLoading(false);
    }
  };

  useEffect(() => {
    if(blobUrl){
    setImg(blobUrl)
    onSubmit()
    }
},[blobUrl])

  const onSubmit = async () => {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("contents", contents);


    
    try {
      const response = await fetch(blobUrl)
      //الحصول على الملف
      const blob = await response.blob();
      
        postData.append("postImg", blob);
      
      await axios
        .put(
          GET_MY_POSTS + "/" + postId + "/update",
           postData ,
          {
            headers: {
              Authorization: jwt,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <IonPage>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        <>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);
            }}
            header={"تنبيه"}
            subHeader={"تعديل البيانات"}
            message={"انت على وشك تعديل البيانات هل ترغب بذلك؟"}
            buttons={[
              {
                text: "نعم",
                handler: () => {
                  onSubmit();
                  history.push("/all-posts");
                },
              },
              {
                text: "الغاء",
                role: "cancel",
              },
            ]}
          />
          <Header headerTitle="تعديل المنشور" />
          <IonContent className="ion-padding">
            <IonItem lines="none" ref={takePhotoRef} onClick={takePhoto}>
              <IonText>اضغط هنا لتعديل الصورة</IonText>
            </IonItem>
            <IonItem className="ion-margin-bottom" lines="none">
              <Swiper>
                <SwiperSlide>
                  <IonImg
                    src={img}
                    onClick={() => takePhotoRef.current.click()}
                  />
                </SwiperSlide>
              </Swiper>
            </IonItem>
            <IonGrid>
              <IonRow>
                <IonCol sizeMd="7" offsetLg="1">
                  <IonList>
                    <IonItem>
                      <IonLabel position="floating" color="warning">
                        العنوان
                      </IonLabel>
                      <IonInput
                        value={title}
                        onIonChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
                    </IonItem>
                    <IonItem className="ion-margin-bottom">
                      <IonLabel position="floating" color="warning">
                        الوصف
                      </IonLabel>
                      <IonTextarea
                        value={contents}
                        onIonChange={(e) => setContents(e.target.value)}
                      />
                    </IonItem>

                    <div className="btn" onClick={validator}>
                      <IonButton expand="block">تعديل المنشور</IonButton>
                    </div>
                  </IonList>
                  <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => {
                      setShowToast(false);
                    }}
                    message="يجب ادخال جميع الحقول"
                    duration={1500}
                    color="danger"
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default UpdatePost;
