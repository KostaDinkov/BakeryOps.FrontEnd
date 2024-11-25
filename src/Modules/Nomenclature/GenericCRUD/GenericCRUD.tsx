import { useState } from "react";
import { Button, Paper } from "@mui/material";
import ConfirmationDialog from "../../../Components/ConfirmationDialog/ConfirmationDialog";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./GenericCRUD.module.scss";

export interface IItemOperations<TItem> {
  queryKey: string[];
  getItems: () => Promise<TItem[]>;
  createItem: (item: TItem) => Promise<TItem>;
  updateItem: (item: TItem) => Promise<TItem>;
  deleteItem: (id: string) => Promise<void>;
}

export type IItemsList<TItem> = React.FC<{
  setSelectedItem: React.Dispatch<TItem | null>;
  data: TItem[];
}>;

export default function GenericCRUDView<TItem>({
  title,
  ItemForm,
  ItemsList,
  ItemDetails,
  itemSchema,
  itemOperations,
  newBtnText = "Нов",
  customFormDataParse = null,
}: {
  title: string;
  ItemForm: React.FC<{
    selectedItem: TItem | null;
    handleSave: (e: any) => {};
    onCancel: () => void;
  }>;
  ItemsList: IItemsList<TItem>;
  ItemDetails: React.FC<{ selectedItem: TItem | null }>;
  itemSchema: z.ZodSchema<TItem>;
  itemOperations: IItemOperations<TItem>;
  newBtnText?: string;
  customFormDataParse?: ((formData: any) => any) | null;
}) {
  type IId = TItem & { id: string };

  const [mode, setMode] = useState<"viewItem" | "updateItem" | "createItem">(
    "viewItem"
  );
  const [deleteItemDialogOpen, setDeleteItemDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: itemOperations.queryKey,
    queryFn: itemOperations.getItems,
  });

  const createItemMutation = useMutation({
    mutationFn: itemOperations.createItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });
  const updateItemMutation = useMutation({
    mutationFn: itemOperations.updateItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });
  const deleteItemMutation = useMutation({
    mutationFn: itemOperations.deleteItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });

  function GenericForm() {
    const handleSubmit = async (item: IId) => {
      // validate item
      const zodValidationResult = itemSchema.safeParse(item);
      console.log(`Item from form: \n`, item);
      if (!zodValidationResult.success) {
        console.log(zodValidationResult.error.errors);
        return;
      }

      // create / update item in database
      if (mode === "createItem") {
        try {
          const data = await createItemMutation.mutateAsync(item);
          console.log(data);
        } catch (e) {
          console.log("Error creating item", e);
        }
      } else if (mode === "updateItem") {
        item.id = (selectedItem as IId).id;
        const data = await updateItemMutation.mutateAsync(item);
        console.log(data);
      }
      setMode("viewItem");
      setSelectedItem(null);
    };
    const handleCancel = () => {
      setMode("viewItem");
      setSelectedItem(null);
    };
    const Buttons = () => {
      return (
        <div className={styles.saveButtonGroup}>
          <Button variant="outlined" onClick={handleCancel}>
            Откажи
          </Button>

          <Button variant="contained" type="submit" color="primary">
            Запази
          </Button>
        </div>
      );
    };

    return (
      <ItemForm
        selectedItem={selectedItem}
        handleSave={handleSubmit}
        onCancel={handleCancel}
        Buttons={Buttons}
      />
    );
  }

  return (
    <div className="verticalMenu">
      <h1>{title}</h1>
      {mode === "viewItem" && (
        <div className={styles.twoColumnView}>
          <div className={styles.itemsList}>
            {itemsQuery.isLoading && <div>Loading...</div>}
            {itemsQuery.isError && <div>{itemsQuery.error.message}</div>}
            {itemsQuery.isSuccess && (
              <Paper elevation={0} sx={{ padding: "1rem" }}>
                <ItemsList
                  setSelectedItem={setSelectedItem}
                  data={itemsQuery.data}
                />
              </Paper>
            )}
          </div>
          <div className="materialDetails">
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  setMode("createItem");
                  setSelectedItem(null);
                }}
              >
                {newBtnText}
              </Button>
              <ItemDetails selectedItem={selectedItem} />
              {selectedItem && (
                <div className={styles.editDeleteButtonGroup}>
                  <Button
                    variant="contained"
                    onClick={() => setMode("updateItem")}
                  >
                    Редактирай
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setDeleteItemDialogOpen(true);
                    }}
                  >
                    Изтрий
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {(mode === "createItem" || mode === "updateItem") && <GenericForm />}
      <ConfirmationDialog
        isOpen={deleteItemDialogOpen}
        setIsOpen={function (isOpen: boolean): void {
          setDeleteItemDialogOpen(isOpen);
        }}
        title={"Изтриване на стока"}
        promptText={"Сигурни ли сте, че искате да изтриете стоката"}
        agreeBtnText={"Да"}
        disagreeBtnText={"Не"}
        handleAgree={() => {
          deleteItemMutation.mutate((selectedItem as IId).id);
          setSelectedItem(null);
        }}
      />
    </div>
  );
}
