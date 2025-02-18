import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styles from "./QueryViewWrapper.module.css";

type QueryViewWrapperProps<T> = {
  query: UseQueryResult<T[] , Error>;
  
  children: (data: T[] ) => React.ReactNode;
};

export default function QueryViewWrapper<T>({
  query,
 
  children,
}: QueryViewWrapperProps<T>) {


  if (query.isLoading) {
    return <div>Loading...</div>;
  }
  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  
  return <article className={styles.container}>

    {children(query.data as T[] )}
    </article>;
}
