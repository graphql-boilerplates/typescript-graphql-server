import test from "ava";
import { request, GraphQLClient } from "graphql-request";

  /**
    * Generate token by calling login mutation
    * @see database/seed.graphql
    * @see src/resolvers/mutation/auth
    */
  const generateToken = async () => {
    const loginMutation = `mutation {
      login(email: "developer@example.com", password: "nooneknows") {
        token
      }
    }`

    const client = new GraphQLClient('http://localhost:4000/');
  	const { login: { token}} = await client.request(loginMutation) as { login: { token: string} }
    return token
  }


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
    const token = await generateToken();

    const client = new GraphQLClient('http://localhost:4000/', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    const response = await client.request(query) as { me: { id: string }};

    t.true(!!response.me.id) // Check if id exists
  } catch (err) {
    t.fail(); // If there is an unexpected error the test should fail
  }
});
