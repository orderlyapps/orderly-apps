import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabase-client";
import { Database } from "../../../util/supabase-types";

const peopleKeys = {
  all: ["peoples"] as const,
  lists: () => [...peopleKeys.all, "list"] as const,
  list: (filters: string) => [...peopleKeys.lists(), { filters }] as const,
  details: () => [...peopleKeys.all, "detail"] as const,
  detail: (id: string) => [...peopleKeys.details(), id] as const,
};

type Person = Database["public"]["Tables"]["people"]["Insert"];

async function getPeople() {
  const { data, error } = await supabase.from("people").select();
  return data || error;
}

async function getPerson(id: string) {
  const { data, error } = await supabase
    .from("people")
    .select()
    .eq("id", id)
    .single();
  return data || error;
}

async function upsertPerson(newData: Person) {
  const { data, error } = await supabase
    .from("people")
    .upsert(newData)
    .select()
    .single();
  console.log("data:", data);
  return data || error;
}

export const usePeopleQuery = () =>
  useQuery({
    queryKey: peopleKeys.all,
    queryFn: getPeople,
  });

export const usePersonQuery = (id: string) =>
  useQuery({
    queryKey: peopleKeys.detail(id),
    queryFn: () => getPerson(id),
  });

export const useUpsertPersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upsertPerson,
    onSuccess: (people) => {
      console.log("people");
      queryClient.setQueryData(peopleKeys.all, (oldData: Person[]) =>
        oldData ? [...oldData, people] : [people]
      );
    },
  });
};
