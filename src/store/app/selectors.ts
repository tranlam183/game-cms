import { State } from "store/configureStore";
import { useAppSelector } from "store/hooks";
import { AppState } from "./reducer";

export const useAppConfigs = () => {
  const appConfigs: AppState["configs"] = useAppSelector(
    (state: State) => state.app.configs,
  );
  return appConfigs;
};
