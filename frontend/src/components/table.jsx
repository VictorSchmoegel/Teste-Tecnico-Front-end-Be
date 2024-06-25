import { useEffect, useState } from "react"

export default function Table() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch('http://localhost:3000/employees')
        const data = await res.json()
        setEmployees(data)
        console.log(data)
      } catch (error) {
        setError(true)
        console.error(error)
      }
    };
    fetchEmployees()
  }, [])

  const allEmployees = employees.map(employee => ({
    id: employee.id,
    name: employee.name,
    job: employee.job,
    admission_date: employee.admission_date,
    phone: employee.phone,
    image: employee.image
  }))
  console.log(allEmployees)

  return (
    <main>
      {loading && <p>Carregando...</p>}
      <table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Data de Admissão</th>
            <th>telefone</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees.map(employee => (
            <tr key={employee.id}>
              <td>
                <img src={employee.image} alt={employee.name} />
              </td>
              <td>{employee.name}</td>
              <td>{employee.job}</td>
              <td>{employee.admission_date}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
        {error && <p>Erro ao carregar os dados</p>}
      </table>
    </main>
  )
}
