import { useDatabase, useDatabaseObjectData } from "reactfire";

export const usePlayerName: (
  playerID: string
) => [string, (newName: string) => Promise<any>] = (playerID: string) => {
  const database = useDatabase();
  const ref = database.ref("players/" + playerID + "/name");
  const response = useDatabaseObjectData<string>(ref);
  const { data } = response;
  const setPlayerName: (newName: string) => Promise<any> = (
    newName: string
  ) => {
    return ref.set(newName);
  };
  return [data, setPlayerName];
};
