import GenericItemsList from "../GenericItemList/GenericItemList";
import GenericItemView, {
  ViewConfigItem,
} from "../GenericItemList/GenericItemView";
import { useState } from "react";
import styles from "./GenericCrud2.module.css";

export type GenericCrud2Props<T> = {
  items: T[];
  viewConfig: ViewConfigItem<T>[];
  groupBy?: keyof T;
  displayKeys?: (keyof T)[];
};

export default function GenericCrud2<T extends Record<string, any>>({
  items,
  viewConfig,
  groupBy,
  displayKeys,
}: GenericCrud2Props<T>) {
  const [selectedItem, setSelectedItem] = useState<(T & { id: string }) | null>(
    null
  );
  return (
    <div className={styles.genericCrudContainer}>
      <GenericItemsList<T & { id: string }>
        items={items}
        groupBy={groupBy}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        displayKeys={displayKeys || ["id"]}
      />
      {selectedItem && (
        <GenericItemView<T> item={selectedItem} viewConfig={viewConfig} />
      )}
    </div>
  );
}
