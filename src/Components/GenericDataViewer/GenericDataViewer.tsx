import GenericItemsList from "../GenericItemList/GenericItemList";
import GenericItemView, { ViewConfigItem } from "../GenericItemList/GenericItemView";
import { useState } from "react";
import styles from "./GenericDataViewer.module.css";
import { Button } from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";

export type GenericDataViewerProps<T> = {
  items: T[] ;
  viewConfig: ViewConfigItem<T>[];
  groupBy?: keyof T;
  displayKeys?: (keyof T)[];
  actions: {
    delete: ((selectedItem: T) => void) | null;
    edit: ((selectedItem: T) => void) | null;
    add: ((selectedItem: T) => void) | null;
  };
  title: string;
  groupSortOrder?: 'asc' | 'desc';
  // New optional prop to configure the initial sort order for the first displayKey
  sortFirstDisplayKey?: 'asc' | 'desc';
};

export default function GenericDataViewer<T extends { id: string }>({
  items,
  viewConfig,
  groupBy,
  displayKeys,
  actions = {
    delete: (item) => console.log(item),
    edit: (item) => console.log(item),
    add: (item) => console.log(item),
  },
  title,
  groupSortOrder,
  sortFirstDisplayKey,
}: GenericDataViewerProps<T>) {
  const [selectedItem, setSelectedItem] = useState<(T & { id: string }) | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  return (
    <div className={styles.genericCrudContainer}>
      {/* --Items List */}
      <GenericItemsList<T & { id: string }>
        items={items}
        groupBy={groupBy}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        displayKeys={displayKeys || ["id"]}
        title={title}
        viewConfig={viewConfig}  // Pass the configuration
        groupSortOrder={groupSortOrder} // Pass the groupSortOrder
        defaultDisplayKeySortOrder={sortFirstDisplayKey} // Pass the sortFirstDisplayKey
      />
      <div className={styles.contentContainer}>
        {/* --Buttons */}
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
        {/* -- Details View */}
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
          actions.delete?.(selectedItem!);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
