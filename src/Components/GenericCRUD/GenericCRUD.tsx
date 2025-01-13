import { useState } from "react";
import { Button, Paper } from "@mui/material";
import ConfirmationDialog from "../../Components/ConfirmationDialog/ConfirmationDialog";
import { z } from "zod";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./GenericCRUD.module.scss";
import { getErrorInfo } from "./crudHelperFunctions";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowforwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export interface IItemOperations<TItem> {
  queryKey: string[];
  getItems: ({page, pageSize}:{page:number,pageSize:number}) => Promise<TItem[]>;
  createItem: (item: TItem) => Promise<TItem>;
  updateItem: (item: TItem) => Promise<TItem>;
  deleteItem: (id: string) => Promise<void>;
}

export type ItemFormType<TItem> = React.FC<{
  selectedItem: TItem | null;
  handleSave: (e: any) => {};
  Buttons: React.FC;
}>;

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
}: {
  title: string;
  ItemForm: ItemFormType<TItem>;
  ItemsList: IItemsList<TItem>;
  ItemDetails: React.FC<{ selectedItem: TItem | null }>;
  itemSchema: z.ZodSchema<TItem>;
  itemOperations: IItemOperations<TItem>;
  newBtnText?: string;
}) {
  type IId = TItem & { id: string };

  const [mode, setMode] = useState<"viewItem" | "updateItem" | "createItem">(
    "viewItem"
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [deleteItemDialogOpen, setDeleteItemDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const queryClient = useQueryClient();

  const itemsQuery = useQuery({
    queryKey: [...itemOperations.queryKey, [page]],
    queryFn: async () => itemOperations.getItems({ page, pageSize }),
    placeholderData: keepPreviousData
  });

  const deleteItemMutation = useMutation({
    mutationFn: itemOperations.deleteItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
  });

  function GenericForm() {
    const createItemMutation = useMutation({
      mutationFn: itemOperations.createItem,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: itemOperations.queryKey });
      },
      onError: (error: any) => {
        console.log("Error in create item:", error);
      },
    });
    const updateItemMutation = useMutation({
      mutationFn: itemOperations.updateItem,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: itemOperations.queryKey }),
    });

    const [validationObject, setValidationObject] =
      useState<z.SafeParseReturnType<TItem, TItem> | null>(null);
    const [serverError, setServerError] = useState<string | null>(null);

    const handleSubmit = async (item: IId) => {
      // validate item
      const zodValidationResult = itemSchema.safeParse(item);

      setValidationObject(zodValidationResult);

      if (!zodValidationResult.success) {
        return;
      }

      // create / update item in database
      const queryOptions = {
        onError: (error: any) => {
          const errorInfo = getErrorInfo(error);
          setServerError(errorInfo);
        },
        onSuccess: () => {
          setMode("viewItem");
          setSelectedItem(null);
        },
      };
      try {
        if (mode === "createItem") {
          await createItemMutation.mutateAsync(item, queryOptions);
        } else if (mode === "updateItem") {
          item.id = (selectedItem as IId).id;
          await updateItemMutation.mutateAsync(item, queryOptions);
        }
      } catch (error) {
        console.log("Error in create/update item:", error);
      }
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
      <>
        <ItemForm
          selectedItem={selectedItem}
          handleSave={handleSubmit}
          Buttons={Buttons}
        />
        {validationObject && !validationObject.success && (
          <div>
            <h3>Грешки при валидация:</h3>
            <ul>
              {validationObject.error.errors.map((error) => (
                <li key={error.message}>
                  {error.path}: {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        {serverError && (
          <div style={{ whiteSpace: "pre-line" }}>
            <h3>Грешка при записване:</h3>
            {serverError}
          </div>
        )}
      </>
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
                <Button
                  onClick={() => {
                    setPage((old) => Math.max(old - 1, 1));
                  }}
                  variant="outlined"
                >
                  <ArrowBackIosIcon />
                </Button>
                <span> Стр. {page}</span>
                <Button
                  onClick={() => {
                    setPage((old) => old + 1);
                  }}
                  disabled = {itemsQuery.isPlaceholderData || itemsQuery.data.length < pageSize}
                  variant="outlined"
                >
                  <ArrowforwardIosIcon/>
                </Button>
              </Paper>
            )}
          </div>
          <div >
           
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
