let initialState = {
  apiroad: false
};

const cartkey = (state = initialState, action) => {
  switch (action.type) {
    case 'API':
      return {
        ...state,
        apiroad: true
      };
    default:
      return state
  }
}

export default cartkey;