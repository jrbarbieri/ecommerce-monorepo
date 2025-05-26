"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gql, useMutation } from "@apollo/client";
import apolloClient from "../../lib/apollo-client";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export default function HomeScreen() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    client: apolloClient,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createUser({ variables: { name } });
    if (data?.createUser?.id) {
      router.push(`/shop?id=${data.createUser.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Criando..." : "Entrar"}
      </button>
    </form>
  );
}
