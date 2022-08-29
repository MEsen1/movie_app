import axios from "axios";

export const movieSearch = async (search) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
        },
      }
    );
    if (data.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const authToken = async () => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=ccc`
    );
    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async (id) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTvDetails = async (id) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPersonDetails = async (id) => {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    if (data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
