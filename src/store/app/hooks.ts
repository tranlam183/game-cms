import { State } from "store/configureStore";
import { useAppSelector } from "store/hooks";
import { Snackbar } from "./reducer";

export const useSnackbar = () => {
  const snackbar: Snackbar | null = useAppSelector(
    (state: State) => state.app.snackbar,
  );
  return snackbar;
};
