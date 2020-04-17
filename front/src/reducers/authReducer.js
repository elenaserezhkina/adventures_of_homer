export default function (state = {}, action) {
  switch (action.type) {
    case "CREATE_SESSION":
      return { ...state, token: action.token };
    case "DELETE_SESSION":
      return { ...state, token: null };
    default:
      return state;
  }
}
