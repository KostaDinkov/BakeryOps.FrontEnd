// #region Imports
import { useState, ReactElement, cloneElement, useEffect } from "react";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  IconButton
} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from "./GenericItemLIst.module.css";
import { ViewConfigItem } from "./GenericItemView";
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
  setSelectedItem: React.Dispatch<React.SetStateAction<TItem | null>>;
  title: string;
  // New optional prop for configuration
  viewConfig?: ViewConfigItem<TItem>[];
  // New optional prop to configure default group sort order
  groupSortOrder?: 'asc' | 'desc';
  // New optional prop to configure the initial sort order for the first displayKey
  defaultDisplayKeySortOrder?: 'asc' | 'desc';
}

export default function GenericItemsList<TItem extends IId>({
  displayKeys = ["id"], // set default value
  items,
  title,
  groupBy,
  selectedItem,
  setSelectedItem,
  viewConfig,
  groupSortOrder, // new destructured prop
  defaultDisplayKeySortOrder, // new prop
}: GenericItemsListProps<TItem>) {
  // New filter state
  const [filterText, setFilterText] = useState("");

  // New sorting states
  const [groupSortAsc, setGroupSortAsc] = useState(groupSortOrder === 'desc' ? false : true);
  const [sortKey, setSortKey] = useState<keyof TItem>(displayKeys[0]!);
  const [sortAsc, setSortAsc] = useState(defaultDisplayKeySortOrder === 'desc' ? false : true);

  // Filter items based on filterText using displayKeys values
  const textFilteredItems = items.filter((item) => {
    const itemText = displayKeys
      .map((key) => {
        // Check if viewConfig has a specific formatter for this key
        const cfg = viewConfig?.find((cfg) => Object.keys(cfg)[0] === key);
        const config = cfg ? (cfg as any)[key] : null;
        const raw = item[key] as string;
        return config && config.valueFormatter
          ? String(config.valueFormatter(item[key]))
          : raw || "";
      })
      .join(" ");
    return itemText.toLowerCase().includes(filterText.toLowerCase());
  });

  // Sort items by composite displayKeys
  const sortedItems = [...textFilteredItems].sort((a, b) => {
    const valA = a[sortKey] ? String(a[sortKey]) : "";
    const valB = b[sortKey] ? String(b[sortKey]) : "";
    const comp = valA.localeCompare(valB);
    return sortAsc ? comp : -comp;
  });

  // Compute sorted groups if groupBy provided
  let groups: string[] = [];
  if (groupBy && sortedItems.length > 0) {
    groups = Array.from(new Set(sortedItems.map((item) => item[groupBy] as string)));
    groups.sort((a, b) => groupSortAsc ? a.localeCompare(b) : b.localeCompare(a));
  }
    // Group filter state remains the same
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Set default selected group if groupBy is provided and no group is selected
  useEffect(() => {
    if (groupBy && groups.length > 0 && !selectedGroup) {
      setSelectedGroup(groups[0]!);
    }
  }, [groupBy, groups, selectedGroup]);



  // Further filter items by selected group if applicable
  const filteredItems =
    groupBy && selectedGroup
      ? sortedItems.filter((item) => (item[groupBy] as string) === selectedGroup)
      : sortedItems;

  const handleCategoryClick = (group: string) => {
    setSelectedGroup(group);
    setSelectedItem(null);
  };

  const handleItemClick = (item: TItem) => {
    setSelectedItem(item);
  };

  const handleHeaderClick = (key: keyof TItem) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Helper to get label for a key from viewConfig if provided
  const getLabel = (key: keyof TItem) => {
    const cfg = viewConfig?.find((cfg) => Object.keys(cfg)[0] === key);
    const config = cfg ? (cfg as any)[key] : null;
    return config?.label || String(key);
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
          <Box display="flex" alignItems="center" justifyContent="space-between" p={1}>
            <Typography variant="h6">Група</Typography>
            <IconButton size="small" onClick={() => setGroupSortAsc(!groupSortAsc)}>
              {groupSortAsc ? <ArrowUpwardIcon fontSize="inherit"/> : <ArrowDownwardIcon fontSize="inherit"/>}
            </IconButton>
          </Box>
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
          {groupBy && selectedGroup ? `${title} в ${selectedGroup}` : `${title}`}
        </Typography>
        {/* Item List Header with sorting controls */}
        <Box display="flex" bgcolor="#f5f5f5" p={1}>
          {displayKeys.map((key) => (
            <Box
              key={String(key)}
              sx={{ flex: 1, display:"flex", alignItems:"center", cursor:"pointer" }}
              onClick={() => handleHeaderClick(key)}
            >
              <Typography variant="subtitle2" sx={{ mr: 0.5 }}>
                {getLabel(key)}
              </Typography>
              {sortKey === key && (sortAsc ? <ArrowUpwardIcon fontSize="small"/> : <ArrowDownwardIcon fontSize="small"/>)}
            </Box>
          ))}
        </Box>
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
                  // Render each display key's value using viewConfig if provided
                  <Box display="flex">
                    {displayKeys.map((key) => {
                      const cfg = viewConfig?.find((cfg) => Object.keys(cfg)[0] === key);
                      const config = cfg ? (cfg as any)[key] : null;
                      const rawValue = item[key];
                      const formattedValue =
                        config && config.valueFormatter
                          ? config.valueFormatter(rawValue)
                          : rawValue;
                      return (
                        <Box key={String(key)} sx={{ flex: 1, textAlign: "start" }}>
                          {formattedValue || ""}
                        </Box>
                      );
                    })}
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
