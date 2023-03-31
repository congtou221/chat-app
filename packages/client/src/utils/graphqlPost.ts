import axios from 'axios';

const graphqlPost = (params: unknown, success: (data: unknown) => void, fail: (e?: unknown) => void) => {
  try {
    axios
      .post('graphql', params)
      .then((response) => {
        success(response?.data?.data || {});
      })
      .catch((e) => {
        fail(e);
      });
  } catch (e: unknown) {
    fail(e);
  }
};

export default graphqlPost;

