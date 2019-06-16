let initialState = {
  searchresult: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'Search':
      return {
        ...state,
        searchresult: action.payload
      };
    default:
      return state
  }
}

export default search;