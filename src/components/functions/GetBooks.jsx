
export default async function getBooks(page) {
    const response = await fetch(`${import.meta.env.VITE_API}/books/${page}`);
    return await response.json();
}
