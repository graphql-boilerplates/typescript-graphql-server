import test from "ava";
import { request, GraphQLClient } from "graphql-request";

/**
  * The user token obtained by calling login mutation
  * @see database/seed.graphql
  * @see src/resolvers/mutation/auth
  */
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjamRnNGgwN3QwMDVkMDE3OW5yNDJzeTh4IiwiaWF0IjoxNTE4MTkyMzgwfQ.AsQb9P0BjWT_SOk4JSs7AYXrDr2VbRTdI3ExMItl-So"

// The query we are are testing
const query = `
  {
    me {
      id
    }
  }
`;

test('if no Authorization header, it should throw an error', async t => {
  const client = new GraphQLClient('http://localhost:4000/');
	const error = await t.throws(client.request(query));
  const errorMessage = error.response.errors[0].message
	t.deepEqual(errorMessage, 'Not authorized');
});

test('if token is invalid, it should throw an error', async t => {
  const client = new GraphQLClient('http://localhost:4000/', {
    headers: {
      Authorization: "123"
    }
  });
	const error = await t.throws(client.request(query));
  const errorMessage = error.response.errors[0].message
	t.deepEqual(errorMessage, 'Invalid Token');
});

test("if token is valid, it should return the current user's id", async t => {
  try {
    const client = new GraphQLClient('http://localhost:4000/', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    const actual = await client.request(query);
    const expected = { me: { id: 'cjdg4h07t005d0179nr42sy8x' } }

    t.deepEqual(actual, expected)
  } catch (err) {
    t.fail(); // If there is an unexpected error the test should fail
  }
});
