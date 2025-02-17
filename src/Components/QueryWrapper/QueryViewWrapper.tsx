import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styles from "./QueryViewWrapper.module.css";

export default function QueryViewWrapper<T>({
  query,
  children,
}: {
  query: UseQueryResult<T[] , Error>;
  children: (data: T[] ) => React.ReactNode;
}) {
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
