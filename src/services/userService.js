export async function saveUser(user) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Erreur serveur");
  }

  return await response.json();
}