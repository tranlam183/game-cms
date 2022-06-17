import Common from "./common";
import Home from "./home";
import { NS_HOME, DEFAULT_NAMESPACE } from "constant";

export default {
  [DEFAULT_NAMESPACE]: Common,
  [NS_HOME]: Home,
};
