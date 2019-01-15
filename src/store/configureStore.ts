import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
  createTransform
} from "redux-persist";
import authReducer from "../reducers/authReducer";
import expenseReducer from "../reducers/expenseReducer";
import filterReducer from "../reducers/filterReducer";
import storage from "redux-persist/lib/storage";
import moment from "moment";
import userReducer from "../reducers/user";

const persistConfig = {
  key: "expense-app",
  storage,
  // Redux-persist converts Moment objects to strings when saving to disk
  // to convert the items back to Moment items upon launch, we use a transform
  // to convert them back to Moment objects.
  transforms: [
    createTransform(
      // The first parameter converts objects when writing to disk
      state => state,
      // The second parameter converts objects when loading into memory
      (outboundState: any) => {
        // convert startDate and endDate back into Moment objects
        return {
          ...outboundState,
          startDate: moment(outboundState.startdate),
          endDate: moment(outboundState.endDate)
        };
      },
      // The third parameter denotes which reducers to apply the change to
      { whitelist: ["filters"] }
    ),
    // Clear error state when persisting to disk
    createTransform(state => ({ ...state, error: "" }), state => state, {
      whitelist: ["auth"]
    })
  ]
};

const reducers = persistCombineReducers(persistConfig, {
  expenses: expenseReducer,
  auth: authReducer,
  filters: filterReducer,
  user: userReducer
});

const store = createStore(reducers, applyMiddleware(thunk));
const persistor = persistStore(store);

// Only used during testing
// persistor.purge();

export { store, persistor };
