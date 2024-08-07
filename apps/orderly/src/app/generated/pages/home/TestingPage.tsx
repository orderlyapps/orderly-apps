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
} from "@ionic/react";
import { Suspense } from "react";
import { CongregationsList } from "../../../../features/congregation/components/CongregationsList";
import { useStore } from "../../../../data/zustand/useStore";
import { LoadingSpinner } from "../../../../ui/LoadingSpinner";

export default function TestingPage() {
  const person = useStore.use.personDetails();
  const cong = useStore.use.newCongregation();
  const setStoreProperty = useStore.use.setStoreProperties();

  
  const handleTest = () => {
    console.log("person:", person);
    setStoreProperty("personDetails",{id:"sfd"})
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Testing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<IonSpinner />}>
          {/* <CongregationDetails></CongregationDetails> */}
          <IonButton onClick={handleTest} expand="full">
            Test
          </IonButton>
          <CongregationsList></CongregationsList>
          <LoadingSpinner></LoadingSpinner>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
