export const fetchEmployees = async () => {
  try {
    const res = await fetch('http://localhost:3000/employees');
    if (!res.ok) {
      throw new Error('Erro ao buscar dados dos funcionários');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};