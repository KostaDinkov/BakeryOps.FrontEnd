// #region Imports
import { useState, ReactElement, cloneElement } from "react";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog,
  TextField, // added TextField import
} from "@mui/material";
import styles from "./GenericItemLIst.module.css";
// #endregion

interface IId {
  id: string;
}

// Updated prop name to displayKeys as an array of keys
interface GenericItemsListProps<TItem extends IId> {
  items: TItem[];
  groupBy?: keyof TItem;
  displayKeys: (keyof TItem)[];
  selectedItem: TItem | null;
  setSelectedItem:React.Dispatch<React.SetStateAction<TItem | null>>;}

export default function GenericItemsList<TItem extends IId>({
  displayKeys = ["id"], // set default value
  items,
  groupBy,
  selectedItem,
  setSelectedItem
}: GenericItemsListProps<TItem>) {
  // New filter state
  const [filterText, setFilterText] = useState("");

  // Filter items based on filterText using displayKeys values
  const textFilteredItems = items.filter((item) => {
    const itemText = displayKeys
      .map((key) => (item[key] as string) || "")
      .join(" ");
    return itemText.toLowerCase().includes(filterText.toLowerCase());
  });

  // Compute groups from filtered items if groupBy is provided
  const groups =
    groupBy && textFilteredItems.length > 0
      ? Array.from(new Set(textFilteredItems.map((item) => item[groupBy] as string)))
      : [];

  // Group filter state remains the same
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Further filter items by selected group if applicable
  const filteredItems =
    groupBy && selectedGroup
      ? textFilteredItems.filter((item) => (item[groupBy] as string) === selectedGroup)
      : textFilteredItems;


  const handleCategoryClick = (group: string) => {
    setSelectedGroup(group);
    setSelectedItem(null);
  };

  const handleItemClick = (item: TItem) => {
    setSelectedItem(item);
  };

  return (
    <Box className={styles.container}>
      {/* Filter Input */}
      <Box mb={2}>
        <TextField
          label="Филтър"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          fullWidth
          size="small"
        />
      </Box>

      {/* Group Panel */}
      <div className={styles.listContainers}>
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
              <ListItemText 
                primary={
                  // Render each display key's value in its own flex column
                  <Box display="flex">
                    {displayKeys.map((key) => (
                      <Box key={String(key)} sx={{ flex: 1, textAlign: "start" }}>
                        {(item[key] as string) || ""}
                      </Box>
                    ))}
                  </Box>
                } 
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
      </div>
    </Box>
  );
}
