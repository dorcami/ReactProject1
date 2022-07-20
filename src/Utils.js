import axios from 'axios';

const userslink = 'https://jsonplaceholder.typicode.com/users';
const postslink = 'https://jsonplaceholder.typicode.com/posts';
const todoslink = 'https://jsonplaceholder.typicode.com/todos';

const GetAllUsers = async () =>
{
  let resp = await axios.get(userslink);
  return resp.data
}


const GetUsersTodos = async () =>
{
  let resp = await axios.get(todoslink);
  return resp.data
}


const GetUsersPosts = async () =>
{
  let resp = await axios.get(postslink);
  return resp.data
}

const utils = {GetAllUsers, GetUsersPosts, GetUsersTodos};

export default utils;
