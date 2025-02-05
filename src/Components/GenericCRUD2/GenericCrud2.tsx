import { useState, ReactElement, cloneElement } from "react";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
} from "@mui/material";
import ItemDetails from "./ItemDetails";
import styles from "./GenericCrud2.module.css";

interface INameId {
  id: string;
  name: string;
}

interface GenericCrudProps<TItem extends INameId> {
  items: TItem[];
  groupBy?: keyof TItem;
  onSubmit: (data: TItem) => void;
  children: ReactElement; // Expected to be the form component (e.g. ItemForm)
}

export default function GenericCrud<TItem extends INameId>({
  items,
  onSubmit,
  groupBy,
  children,
}: GenericCrudProps<TItem>) {
  // Compute groups if groupBy prop is provided
  const groups =
    groupBy && items.length > 0
      ? Array.from(new Set(items.map((item) => item[groupBy] as string)))
      : [];

  // If groupBy is provided, filter based on selected group. Otherwise, use all items.
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const filteredItems =
    groupBy && selectedGroup
      ? items.filter((item) => (item[groupBy] as string) === selectedGroup)
      : items;

  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCategoryClick = (group: string) => {
    setSelectedGroup(group);
    setSelectedItem(null);
  };

  const handleItemClick = (item: TItem) => {
    setSelectedItem(item);
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <Box className={styles.container}>
      {/* Group Panel */}
      {groupBy && (
        <Paper className={styles.categoryPanel}>
          <Typography variant="h6" gutterBottom>
            Категории
          </Typography>
          <List>
            {groups.map((group) => (
              <ListItemButton
                key={group}
                selected={selectedGroup === group}
                onClick={() => handleCategoryClick(group)}
                className={styles.categoryItem}
              >
                <ListItemText primary={group} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* Item List Panel */}
      <Paper className={styles.productListPanel}>
        <Typography variant="h6" gutterBottom>
          {groupBy && selectedGroup ? `Продукти в ${selectedGroup}` : "Продукти"}
        </Typography>
        <List>
          {filteredItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedItem?.id === item.id}
              onClick={() => handleItemClick(item)}
              className={styles.productItem}
            >
              <ListItemText primary={item.name || "Unnamed Product"} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* Item Details Panel */}
      {selectedItem && (
        <Box className={styles.productDetailsPanel}>
          <ItemDetails item={selectedItem} onEditClick={handleEditClick} />
        </Box>
      )}

      {/* Modal Overlay for Edit Form */}
      <Dialog open={modalOpen} onClose={handleModalCancel} fullWidth maxWidth="md">
        {selectedItem && 
          cloneElement(children, {
            defaultValues: selectedItem,
            onSubmit: (data: TItem) => {
              setModalOpen(false);
              onSubmit(data);
            },
            onCancel: handleModalCancel,
          })
        }
      </Dialog>
    </Box>
  );
}
