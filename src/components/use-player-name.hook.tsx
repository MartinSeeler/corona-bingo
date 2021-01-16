import { useDatabase, useDatabaseObjectData } from "reactfire";
import { useEffect, useState } from "react";

export const usePlayerName: (
  playerID: string
) => [string, (newName: string) => Promise<any>] = (playerID: string) => {
  const database = useDatabase();
  const ref = database.ref("players/" + playerID + "/name");
  const response = useDatabaseObjectData<string>(ref);
  const [loadedName, setLoadedName] = useState("");
  const { data } = response;
  const setPlayerName: (newName: string) => Promise<any> = (
    newName: string
  ) => {
    return ref.set(newName);
  };
  useEffect(() => {
    if (data && typeof data === "string") {
      setLoadedName(data);
    }
  }, [data, setLoadedName]);
  return [loadedName, setPlayerName];
};
