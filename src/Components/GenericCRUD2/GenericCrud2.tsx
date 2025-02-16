import GenericItemsList from "../GenericItemList/GenericItemList";
import GenericItemView, {
  ViewConfigItem,
} from "../GenericItemList/GenericItemView";
import { useState } from "react";
import styles from "./GenericCrud2.module.css";
import { Button } from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

export type GenericCrud2Props<T> = {
  items: T[] ;
  viewConfig: ViewConfigItem<T>[];
  groupBy?: keyof T;
  displayKeys?: (keyof T)[];
  actions: {
    delete: ((selectedItem: T) => void) | null;
    edit: ((selectedItem: T) => void) | null;
    add: ((selectedItem: T) => void) | null;
  };
  title:string;
};

export default function GenericCrud2<T extends { id: string }>({
  items,
  viewConfig,
  groupBy,
  displayKeys,
  actions = {
    delete: (item) => console.log(item),
    edit: (item) => console.log(item),
    add: (item) => console.log(item),
  },
  title
}: GenericCrud2Props<T>) {
  const [selectedItem, setSelectedItem] = useState<(T & { id: string }) | null>(
    null
  );
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className={styles.genericCrudContainer}>
      <GenericItemsList<T & { id: string }>
        items={items}
        groupBy={groupBy}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        displayKeys={displayKeys || ["id"]}
        title={title}
        
      />
      <div className={styles.contentContainer}>
        <div className={styles.topButtonContainer}>
          {actions.add && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => actions.add?.(selectedItem!)}
            >
              Добави
            </Button>
          )}
          {selectedItem && (
            <div className={styles.bottomButtonContainer}>
              {actions.edit && (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => actions.edit?.(selectedItem!)}
                >
                  Редактирай
                </Button>
              )}
              {actions.delete && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => setIsConfirmDialogOpen(true)}
                >
                  Изтрий
                </Button>
              )}
            </div>
          )}
        </div>
        {selectedItem && (
          <GenericItemView<T> item={selectedItem} viewConfig={viewConfig} />
        )}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        setIsOpen={setIsConfirmDialogOpen}
        title={"Изтриване"}
        promptText={"Сигурни ли сте, че искате да изтриете този елемент?"}
        agreeBtnText={"Да"}
        disagreeBtnText={"Не"}
        handleAgree={() => {
          actions.delete?.(selectedItem!); setSelectedItem(null);
        }}
      />
    </div>
  );
}
