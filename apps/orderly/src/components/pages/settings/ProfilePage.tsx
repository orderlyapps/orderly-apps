import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { Suspense, useEffect, useState } from "react";
import { NameDetails } from "../../feature/people/NameDetails";
import { useData } from "../../../data/zustand/useData";
import { useSettings } from "../../../data/zustand/useSettings";

export default function ProfilePage() {
  const [readonly, setReadonly] = useState(true);

  const [toast] = useIonToast();
  const [showLoading, hideLoading] = useIonLoading();

  const session = useSettings.use.session();
  const online = useSettings.use.online ();

  const initTableData = useData.use.initTableData();
  const upsertTableData = useData.use.upsertTableData();
  const setRowDataByID = useData.use.setRowDataByID();

  const handleUpdate = async () => {
    await showLoading();
    try {
      const { error } = await upsertTableData("people");
      if (error) throw error;
      await hideLoading();
      setReadonly(true);
    } catch (error) {
      await hideLoading();
      toast({
        message: "Sorry, something went wrong. Please try again.",
        duration: 2000,
        position: "bottom",
      });
    }
  };

  const handleCancel = async () => {
    if (!session) return;
    await setRowDataByID("people", "newPerson", session.user.id);
    setReadonly(true);
  };

  useEffect(() => {
    const init = async () => {
      await initTableData("people");
      if (!session) return;
      await setRowDataByID("people", "newPerson", session.user.id);
    };
    init();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {readonly && <IonBackButton></IonBackButton>}
            {!readonly && <IonButton onClick={handleCancel}>Cancel</IonButton>}
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          {online && (
            <IonButtons slot="end">
              {readonly && (
                <IonButton onClick={() => setReadonly(false)}>
                  <strong>Edit</strong>
                </IonButton>
              )}
              {!readonly && (
                <IonButton onClick={handleUpdate}>
                  <strong>Done</strong>
                </IonButton>
              )}
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
          <NameDetails readonly={readonly}></NameDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
