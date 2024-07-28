import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BuildTime } from "../../feature/util/BuildTime";
import { SignIn } from "../../feature/user/SignIn";
import { ThemeSelect } from "../../feature/appearance/ThemeSelect";

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SignIn></SignIn>
        <IonList>
          <BuildTime></BuildTime>
          <ThemeSelect></ThemeSelect>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
