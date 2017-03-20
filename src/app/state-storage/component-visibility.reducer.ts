import {ActionReducer, Action} from '@ngrx/store';

export const UPDATE = 'UPDATE';

export function componentVisibilityReducer(states: ComponentVisibilityState[], action: Action): ComponentVisibilityState[] {
  switch (action.type) {
    case UPDATE:
      let state = states.filter(st => st.id == action.payload.id);
      if (!state.length) {
        states.push(action.payload);
      } else {
        state[0].visible = action.payload.visible;
      }
      return states;

    default:
      return states || [];
  }
}

export class ComponentVisibilityState {
  id: string;
  visible: boolean;
}
