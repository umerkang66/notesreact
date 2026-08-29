import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Actions } from '../actions';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';

type Store = {
  dispatch: Dispatch<Actions>;
  getState(): RootState;
};

export const persistMiddleware = ({ dispatch, getState }: Store) => {
  let timer: NodeJS.Timeout;

  return (next: (action: Actions) => void) => {
    return (action: Actions) => {
      next(action);

      if (action.type === ActionType.RESET_CELLS) {
        if (timer) {
          clearTimeout(timer);
        }
        // Save immediately on reset without debounce
        saveCells()(dispatch, getState);
        return;
      }

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
