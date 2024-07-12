import { chefService } from "../../services/chef.service";
import {
  ADD_CHEF,
  REMOVE_CHEF,
  SET_FILTER_BY,
  SET_IS_LOADING,
  SET_CHEFS,
  UPDATE_CHEF,
} from "../reducers/chef.reducer";
import { store } from "../store";

export async function loadChefs() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  try {
    const { filterBy } = store.getState().chefModule;
    const chefs = await chefService.query(filterBy);
    console.log("chefs from chefs.action: ", chefs)
    store.dispatch({ type: SET_CHEFS, chefs });
  } catch (err) {
    console.log("Had issues loading chefs", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}

export async function removeChef(chefId: string) {
  try {
    await chefService.remove(chefId);
    store.dispatch({ type: REMOVE_CHEF, chefId });
  } catch (err) {
    console.log("Had issues removing chefS", err);
    throw err;
  }
}

export async function saveChef(chef: any) {
  try {
    const type = chef._id ? UPDATE_CHEF : ADD_CHEF;
    console.log("TYPE ", type, " CHEF ", chef)
    const savedChef = await chefService.save(chef);
    console.log("savedChef", savedChef)
    store.dispatch({ type, chef: savedChef });
  } catch (err) {
    console.log("Had issues saving chefs", err);
    throw err;
  }
}

export function setFilterBy(fieldsToUpdate: any) {
  store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
}
