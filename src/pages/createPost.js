import React from "react";
import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { images } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import "../styles/createPost.css";
import "swiper/css";
import axios from "../config/axios";
import { CREATE_POST } from "../config/urls";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import Header from "../components/Header";

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const takePhotoRef = useRef();
  const { takePhoto, blobUrl } = usePhotoGallery();

  const [showImageToast, setShowImageToast] = useState(false);
  const [showContentToast, setShowContentToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [photos, setPhotos] = useState([]);

  const history = useHistory();

  const { jwt } = useContext(AuthContext);

  const onSubmit = async () => {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("contents", contents);

    try {
      for (let i = 0; i < photos.length; i++) {
        const response = await fetch(photos[i]);
        const blob = await response.blob();
        postData.append("postImg", blob);
      }

      await axios
        .post(CREATE_POST, postData, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setPhotos([]);
          setContents("");
          setTitle("");
          setShowAlert(true);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  useEffect(() => {
    if (blobUrl) {
      const imgUrls = [blobUrl, ...photos];
      setPhotos(imgUrls);
    }
  }, [blobUrl]);

  const validator = () => {
    if (photos.length > 0) {
      if (title && contents) {
        onSubmit();
      } else {
        setShowContentToast(true);
      }
    } else {
      setShowImageToast(true);
    }
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="تمت عملية نشر المنشور بنجاح"
        message="لقد تم نشر المنشور يمكنك الانتقال الى صفحة المنشورات"
        buttons={[
          {
            text: "موافق",
            handler: () => {
              history.push("/all-posts");
            },
          },
        ]}
      />
      <Header headerTitle="انشاء منشور" />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
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

                <IonItem lines="none" ref={takePhotoRef} onClick={takePhoto}>
                  <IonText>اضغط هنا لاضافة الصورة</IonText>
                </IonItem>
                <IonItem className="ion-margin-bottom" lines="none">
                  {photos.length > 0 ? (
                    <Swiper>
                      {photos.map((img, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <IonImg
                              src={img}
                              onClick={() => takePhotoRef.current.click()}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  ) : (
                    <div className="icon-container">
                      <IonIcon
                        icon={images}
                        color="primary"
                        className="icon-images"
                        onClick={() => takePhotoRef.current.click()}
                      />
                    </div>
                  )}
                </IonItem>

                <div>
                  <IonButton
                    expand="block"
                    className="ion-margin"
                    onClick={validator}
                  >
                    نشر
                  </IonButton>
                </div>
              </IonList>
              <IonToast
                isOpen={showImageToast}
                onDidDismiss={() => setShowImageToast(false)}
                message="يجب ادخال صورة على الاقل"
                duration={1500}
                color="danger"
              />
              <IonToast
                isOpen={showContentToast}
                onDidDismiss={() => setShowContentToast(false)}
                message="يجب ادخال جميع الحقول"
                duration={1500}
                color="danger"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreatePost;
