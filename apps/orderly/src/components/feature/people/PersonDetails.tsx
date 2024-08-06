import { IonList } from "@ionic/react";
import { CongregationSelect } from "../congregations/CongregationSelect";
import { NameDetails } from "./NameDetails";

export function PersonDetails(props: { readonly: boolean }) {
  return (
    <IonList inset>
      <NameDetails {...props}></NameDetails>
      <CongregationSelect {...props}></CongregationSelect>
    </IonList>
  );
}
