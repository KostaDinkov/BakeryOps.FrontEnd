
export default interface IApiService<T> {
    getAllItems: () => Promise<T[]>;
    getItemById: (id: string | number) => Promise<T>;
    createItem: (data: T) => Promise<T>;
    updateItem: (data: T) => Promise<T>;
    deleteItem: (id: string) => Promise<any>;
  }