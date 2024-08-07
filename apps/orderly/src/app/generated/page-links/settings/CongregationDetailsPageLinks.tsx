import { IonButton, IonCard, IonFabButton, IonItem } from "@ionic/react";
import { PATHS } from "../../util/paths";
import { ComponentProps } from "react";

function Button( props: ComponentProps<typeof IonButton>) {
  return (
    <IonButton routerLink={ PATHS.congregation_details } {...props}>
      {props.children || "Congregation Details"}
    </IonButton>
  );
}

function Item( props: ComponentProps<typeof IonItem>) {
  return (
    <IonItem button detail routerLink={ PATHS.congregation_details } {...props}>
      {props.children || "Congregation Details"}
    </IonItem>
  );
}

function Card( props: ComponentProps<typeof IonCard>) {
  return (
    <IonCard routerLink={ PATHS.congregation_details } {...props}>
      {props.children || "Congregation Details"}
    </IonCard>
  );
}

function FabButton( props: ComponentProps<typeof IonFabButton>) {
  return (
    <IonFabButton routerLink={ PATHS.congregation_details } {...props}>
      {props.children || "Congregation Details"}
    </IonFabButton>
  );
}

export const CongregationDetailsPageLink = { Button, Item, Card, FabButton };

// generated