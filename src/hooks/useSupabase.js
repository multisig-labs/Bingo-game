import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { SupabaseContext } from "../SupabaseContext";

export const useSupabase = ({ twitterHandle }) => {
  const { supabaseClient } = useContext(SupabaseContext);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["getSupabase", twitterHandle],
    queryFn: async () =>
      await supabaseClient
        .from("bingo_players")
        .select("*")
        .eq("twitter", twitterHandle)
        .single(),
  });

  return { data, isError, isLoading };
};
