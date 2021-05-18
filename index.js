const github_data = {
  token: "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",
  username: "bonarhyme",
};

const body = {
  query: `
    query { 
        user(login: ${github_data.username}){
          avatarUrl
        }
      }
    `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
  "Content-Type": "application/json",
  Authentication: "bearer " + github_data.token,
};

async function postData(url = "", body) {
  const response = await fetch(url, {
    method: "POST",

    headers,
    body: JSON.stringify(body),
  });
  return response.json();
}

postData(baseUrl, body)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => console.log(JSON.stringify(error)));
