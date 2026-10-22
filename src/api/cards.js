const API_URL = "http://localhost:3001/cards";

export async function fetchCards() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
