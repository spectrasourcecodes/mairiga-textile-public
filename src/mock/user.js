export const user = {
  isAuthenticated: false,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  homeAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  pickupAddress: "Mairiga Store, 45 Market Street, Downtown",
  deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
  password: "********"
};

export const updateUser = (newUserData) => {
  Object.assign(user, newUserData);
};

export const logoutUser = () => {
  user.isAuthenticated = false;
};

export const loginUser = (email, password) => {
  // Mock login - accept any credentials
  if (email && password) {
    user.isAuthenticated = true;
    user.email = email;
    return true;
  }
  return false;
};