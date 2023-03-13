const API_SERVER =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";


/**
 * API Endpoint to fetch all types of users
 * @returns - List of Users
 */
const fetchUsers = async () => {
  try {
    const response = await fetch(API_SERVER);
    return response.json()
  } catch (error) {
    console.log(error);
  }
};

export default fetchUsers;
