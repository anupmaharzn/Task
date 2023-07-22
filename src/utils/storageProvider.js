// data from local storage
const userdata = JSON.parse(localStorage.getItem("userdata")) || [];

// generate 5 character randomid
const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};
export const setItem = (value) => {
  //find user index
  const foundUserIndex = userdata.findIndex((user) => user.id === value.id);

  //if found means already exist
  if (foundUserIndex > -1) {
    userdata[foundUserIndex] = {
      ...userdata[foundUserIndex],
      ...value,
    };
  } else {
    // if no user found add to array
    userdata.push({
      ...value,
      id: randomId(),
    });
  }
  localStorage.setItem("userdata", JSON.stringify(userdata));
};

export const getItem = () => {
  return JSON.parse(localStorage.getItem("userdata")) || [];
};

export const getOneItem = (id) => {
  const findOneUser = userdata.find((item) => item.id === id);
  return findOneUser;
};

export const removeItem = (id) => {
  const filterUser = userdata.filter((item) => item.id !== id);
  localStorage.setItem("userdata", JSON.stringify(filterUser));
};
