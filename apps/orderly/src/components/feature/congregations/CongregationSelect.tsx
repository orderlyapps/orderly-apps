import { IonItem, IonLabel, IonModal } from "@ionic/react";
import { useEffect, useState } from "react";
import AppTypeahead from "../../ionic/AppTypeahead";
import { chevronExpandOutline } from "ionicons/icons";
import { useSettings } from "../../../data/zustand/useSettings";
import { useData } from "../../../data/zustand/useData";

export function CongregationSelect({
  readonly = false,
}: {
  readonly?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const online = useSettings.use.online();
  const newPerson = useData.use.newPerson()
  const congregations = useData.use.congregations()

  const handleSelection = (fruits: string) => {
    setIsOpen(false)
  };

  useEffect(() => {
    if (!online) setIsOpen(false);
  }, [online]);

  return (
    <>
      <IonItem
        button={!readonly}
        detail={!readonly}
        detailIcon={chevronExpandOutline}
        onClick={() => setIsOpen(!readonly)}
      >
        <IonLabel>Congregation:</IonLabel>
        {/* {newPerson?.congregation} */}-
      </IonItem>

      <IonModal isOpen={isOpen}>
        <AppTypeahead
          title="Select Congregation"
          items={congregations}
          onCancel={() => setIsOpen(false)}
          onSelection={handleSelection}
        />
      </IonModal>
    </>
  );
}
