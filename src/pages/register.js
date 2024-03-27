import React from "react";
import styles from "../styles/avatar.css";
import avatar from "../avatar.png";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../config/axios";
import { useState } from "react";

import {
  IonRow,
  IonGrid,
  IonPage,
  IonAvatar,
  IonContent,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonRouterLink,
  IonButton,
  IonImg,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { REGISTER_URL } from "../config/urls";
import { useHistory } from "react-router";
import Header from "../components/Header";

const Register = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  
  const history = useHistory();

 
  const onSubmit = async (values) => {
    setShowLoading(true);
   
    try {
      await axios.post(REGISTER_URL, values).then((res) => {
        console.log(res);
        setShowAlert(true);
        setShowLoading(false);
      });
    } catch (e) {
      if (e.response.status == 400) {
        setShowLoading(false);
        setShowAlertError(true);
        
      } else {
        console.log(e.message);
        setShowLoading(false);
      }
    }
  };
  const validationSchema = yup.object({
    name: yup.string().nullable().required("اسم المستخدم مطلوب"),

    email: yup
      .string()
      .nullable()
      .email("يجب ادخال البريد الالكتروني الصحيح")
      .required("البريد الالكتروني مطلوب"),

    password: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور"),

    confPassword: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور")
      .test("match", "كلمة المرور غير مطابقة", function (confPassword) {
        return confPassword === this.parent.password;
      }),
  });

  return (
    <IonPage>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        <>
          <IonAlert
            isOpen={showAlert}
            header="تنبيه"
            subHeader="لقد تم تسجيل حسابك"
            message="يمكنك الانتقال الى صفحة تسجيل الدخول"
            buttons={[
              {
                text: "موافق",
                handler: () => {
                  history.push("/login");
                },
              },
            ]}
          />
          <IonAlert
            isOpen={showAlertError}
            duration={30}
            header="تنبيه"
            subHeader="حسابك مسجل بالفعل"
            message="يمكنك الانتقال الى صفحة تسجيل الدخول"
            buttons={[
              {
                text: "موافق",
                handler: () => {
                  history.push("/login");
                },
              },
              {
                text: "الغاء",
                role: "cancel",
              },
            ]}
          />

          <Header headerTitle="تسجيل حساب جديد" />
          <IonContent>
            <IonAvatar className="avatar">
              <IonImg src={avatar} />
            </IonAvatar>
            <IonGrid>
              <IonRow>
                <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                  <IonAvatar className="avatar"></IonAvatar>
                  <Formik
                    initialValues={{
                      name: null,
                      email: null,
                      password: null,
                      confPassword: null,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      onSubmit(values);
                      resetForm({ values: "" });
                    }}
                  >
                    {(formikProps) => (
                      <form onSubmit={formikProps.handleSubmit}>
                        <IonItem>
                          <IonLabel color="warning" position="floating">
                            الاسم
                          </IonLabel>
                          <IonInput
                            name="name"
                            value={formikProps.values.name}
                            onIonChange={formikProps.handleChange}
                          />
                        </IonItem>
                        <IonText className="error">
                          {formikProps.touched.name && formikProps.errors.name}
                        </IonText>
                        <IonItem>
                          <IonLabel color="warning" position="floating">
                            البريد الالكتروني
                          </IonLabel>
                          <IonInput
                            name="email"
                            value={formikProps.values.email}
                            onIonChange={formikProps.handleChange}
                          />
                        </IonItem>
                        <IonText className="error">
                          {formikProps.touched.email &&
                            formikProps.errors.email}
                        </IonText>

                        <IonItem>
                          <IonLabel color="warning" position="floating">
                            كلمة المرور
                          </IonLabel>
                          <IonInput
                            name="password"
                            type="password"
                            value={formikProps.values.password}
                            onIonChange={formikProps.handleChange}
                          />
                        </IonItem>
                        <IonText className="error">
                          {formikProps.touched.password &&
                            formikProps.errors.password}
                        </IonText>

                        <IonItem>
                          <IonLabel color="warning" position="floating">
                            يجب تاكيد كلمة المرور
                          </IonLabel>
                          <IonInput
                            name="confPassword"
                            type="password"
                            value={formikProps.values.confPassword}
                            onIonChange={formikProps.handleChange}
                          />
                        </IonItem>
                        <IonText className="error">
                          {formikProps.touched.confPassword &&
                            formikProps.errors.confPassword}
                        </IonText>

                        <div className="btn ion-text-center">
                          <IonButton type="submit">انشاء حساب</IonButton>
                          <IonRouterLink
                            routerLink="/login"
                            className="router-link"
                            color="warning"
                          >
                            تسجل الدخول
                          </IonRouterLink>
                        </div>
                      </form>
                    )}
                  </Formik>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};
export default Register;
