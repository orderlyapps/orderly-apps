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
import { CreateCongregationPageLink } from "../../page-links/settings/CreateCongregationPageLinks";

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
        <IonList inset>
          <BuildTime></BuildTime>
          <ThemeSelect></ThemeSelect>
          <CreateCongregationPageLink.Item detail>
            <strong>Create Congregation:</strong>
          </CreateCongregationPageLink.Item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
