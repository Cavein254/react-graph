import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      isMarried
      id
      age
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      name
      isMarried
      id
      age
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      name
      isMarried
      id
      age
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const { data, error, loading } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = () => {
    createUser({
      variables: {
        input: {
          name: newUser.name,
          age: Number(newUser.age),
          isMarried: false,
        },
      },
    });
  };

  if (loading) return <p>Loading.......</p>;
  if (error) return <p>Error.......</p>;
  return (
    <>
      <div className="">
        <input
          placeholder="Name ....."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age ....."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <h1>Chosen User</h1>
      <p>{getUserByIdData?.getUserById?.name}</p>
      <h1>Users</h1>
      <div className="">
        {data.getUsers.map((user) => (
          <div className="">
            <h4>Name: {user.name}</h4>
            <h4>Age: {user.age}</h4>
            <h4>Is Married: {user.isMarried ? "Yes" : "No"}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
