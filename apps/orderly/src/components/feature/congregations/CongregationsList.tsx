import { IonCheckbox, IonItem } from "@ionic/react";
import { useData } from "../../../data/zustand/useData";
import { useEffect } from "react";

export function CongregationsList() {
  const congregations = useData.use.congregations();
  const initTableData = useData.use.initTableData();

  useEffect(() => {
    initTableData("congregations");
  }, []);

  return (
    <>
      {congregations.map((c: any) => {
        return (
          <IonItem key={c.id}>
            <IonCheckbox justify="space-between">{c.name}</IonCheckbox>
          </IonItem>
        );
      })}
    </>
  );
}
