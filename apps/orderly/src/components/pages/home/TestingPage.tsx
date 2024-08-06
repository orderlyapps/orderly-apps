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
import { CongregationsList } from "../../feature/congregations/CongregationsList";

import {
  usePeopleQuery,
  useUpsertPersonMutation,
} from "../../../data/react-query/people/usePeople";

export default function TestingPage() {
  const people = usePeopleQuery();
  const mutation = useUpsertPersonMutation();

  const handleTest = () => {
    mutation.mutate({
      id: crypto.randomUUID(),
      first_name: "Damian"
    });
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
          <IonButton onClick={handleTest} expand="full">Test</IonButton>
          <CongregationsList></CongregationsList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
}

// generated
