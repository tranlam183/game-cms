import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "store/app";
import appReducer from "store/app/reducer";
import racetrackReducer, { RacetractState } from "store/racetrack/reducer";

export interface State {
  app: AppState;
  racetrack: RacetractState;
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    racetrack:racetrackReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
