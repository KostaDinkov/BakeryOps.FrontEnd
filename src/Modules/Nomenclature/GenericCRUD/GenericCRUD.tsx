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

export default function GenericCRUDView<TItem>({
  title,
  ItemFormFields,
  ItemsList,
  ItemDetails,
  itemSchema,
  itemOperations,
  newBtnText = "Нов",
  customFormDataParse = null ,
}: {
  title: string;
  ItemFormFields: React.FC<{ selectedItem: TItem | null }>;
  ItemsList: React.FC<{
    setSelectedItem: React.Dispatch<TItem | null>;
    data: any;
  }>;
  ItemDetails: React.FC<{ selectedItem: TItem | null }>;
  itemSchema: z.ZodSchema<TItem>;
  itemOperations: IItemOperations<TItem>;
  newBtnText?: string;
  customFormDataParse?: ((formData: any) => any ) | null;
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

  function GenericForm({ children }: { children: React.ReactNode }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      let formData = Object.fromEntries(new FormData(e.currentTarget));
      
      if(customFormDataParse){
        formData = customFormDataParse(formData);
      }  
      const parsedResult = itemSchema.safeParse(formData);

      if (parsedResult.success) {
        const item = parsedResult.data as IId;

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
      } else {
        console.log(parsedResult.error.errors);
      }
    };

    return (
      <form className={styles.itemsForm} onSubmit={handleSubmit}>
        {children}
      </form>
    );
  }

  return (
    <div className="verticalMenu">
      <h1>{title}</h1>

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
          {mode === "viewItem" ? (
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
          ) : (
            <div>
              <GenericForm>
                <ItemFormFields selectedItem={selectedItem} />
                <div className={styles.saveButtonGroup}>
                  <Button
                    variant="outlined"
                    onClick={() => setMode("viewItem")}
                  >
                    Откажи
                  </Button>

                  <Button variant="contained" type="submit" color="primary">
                    Запази
                  </Button>
                </div>
              </GenericForm>
            </div>
          )}
        </div>
      </div>
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
