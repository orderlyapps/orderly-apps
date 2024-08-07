import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SignIn } from "../../../features/auth/components/SignIn";
import { ThemeSelect } from "../components/ThemeSelect";
import { CreateCongregationPageLink } from "../../../app/generated/page-links/settings/CreateCongregationPageLinks";
import { BuildTime } from "../components/BuildTime";
import { CongregationDetailsPageLink } from "../../../app/generated/page-links/settings/CongregationDetailsPageLinks";

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
          <CongregationDetailsPageLink.Item></CongregationDetailsPageLink.Item>
          <CongregationDetailsPageLink.Item></CongregationDetailsPageLink.Item>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
