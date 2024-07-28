import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./createSelectors";
import { Database } from "../../util/supabase-types";
import { supabase } from "../supabase/supabase-client";
import { PostgrestError } from "@supabase/supabase-js";

export type Tables = keyof Database["public"]["Tables"];
export type Rows = Database["public"]["Tables"][Tables]["Row"];
export type PeopleRow = Partial<Database["public"]["Tables"]["people"]["Row"]>;
export type TableState = { [key in Tables]: Rows[] };
export type RowState = { person: PeopleRow } & { newPerson: PeopleRow };
export type DataState = TableState & RowState;
export type DataStateProperties = keyof DataState;
export type SelectedTableRows = {
  people: "person" | "newPerson";
  congregations: "congregation" | "newCongregation";
};

const key = {
  people: "newPerson",
  congregations: "newCongregation",
  events: "event",
} as const;

type DataActions = {
  initTableData: (
    table: Tables
  ) => Promise<{ data?: Rows[]; message?: string; error?: PostgrestError }>;
  setData: (
    data: DataStateProperties,
    newData: DataState[DataStateProperties]
  ) => void;
  setRowDataByID: <T extends keyof SelectedTableRows & Tables>(
    table: T,
    rowType: SelectedTableRows[T],
    id: string
  ) => Promise<PeopleRow | PostgrestError>;
  upsertTableData: (
    table: Tables
  ) => Promise<{ data?: Rows[]; message?: string; error?: PostgrestError }>;
};

export const useDataBase = create<DataState & DataActions>()(
  persist(
    (set, get) => ({
      people: null as any,
      person: null as any,
      newPerson: null as any,
      initTableData: async (table) => {
        try {
          const { data, error } = await supabase.from(table).select("*");

          if (!data) throw error;

          set((state: DataState) => ({
            ...state,
            [table]: data,
          }));
          return {
            data,
            message: table + ` data initialised from cloud`,
          } as any;
        } catch (error) {
          return error;
        }
      },
      setData(
        data: DataStateProperties,
        newData: DataState[DataStateProperties]
      ) {
        set(() => ({
          [data]: { ...newData },
        }));
      },
      setRowDataByID: async (table, rowType, id) => {
        const tableData = get()[table];
        try {
          const data = tableData?.find((t: { id: string }) => {
            return t.id === id;
          });
          if (!data) throw "Data not found";
          set(() => ({
            [rowType]: data,
          }));
          return data as any;
        } catch (error) {
          return error;
        }
      },
      upsertTableData: async (table) => {
        const newData = get()[key[table]];

        try {
          const { data, error } = await supabase
            .from("people")
            .upsert(newData)
            .select();

          if (error) throw error;

          if (!data) throw "Add data failed";

          set(() => ({
            [table]: data,
          }));
          return data as any;
        } catch (error) {
          return error;
        }
      },
    }),
    {
      name: "data", // name of the item in the storage (must be unique)
    }
  )
);

export const useData = createSelectors(useDataBase);
