import { IonInput, IonItem } from "@ionic/react";
import { useData } from "../../../data/zustand/useData";

export function NameDetails({ readonly = false }: { readonly?: boolean }) {
  const newPerson = useData.use.newPerson();
  const setData = useData.use.setData();
  const props = {
    onIonInput: (e: any) =>
      setData("newPerson", { ...newPerson, [e.target.name]: e.target.value }),
    clearInput: true,
    readonly,
    className: "ion-text-end",
  };
  return (
    <>
      <IonItem>
        <IonInput
          label="First Name:"
          value={newPerson?.first_name || ""}
          name="first_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Middle Name:"
          value={newPerson?.middle_name || ""}
          name="middle_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name:"
          value={newPerson?.last_name || ""}
          name="last_name"
          {...props}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Display Name:"
          value={newPerson?.display_name || ""}
          name="display_name"
          {...props}
        />
      </IonItem>
    </>
  );
}
