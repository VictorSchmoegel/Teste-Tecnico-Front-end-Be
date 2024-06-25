import { useEffect, useState } from "react"
import './table.css'

export default function Table() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

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

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase()) ||
    employee.job.toLowerCase().includes(search.toLowerCase()) ||
    employee.phone.includes(search)
  );
  console.log(filteredEmployees)

  return (
    <main className="user-table">
      <>
        {loading ? '' : <p>Carregando...</p>}
        <div className="search-div">
          <h1>Funcionários</h1>
          <input
            type="text"
            placeholder="Pesquisar"
            value={search}
            onChange={handleSearch}
            />
        </div>
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
            {filteredEmployees.map(employee => (
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
      </>
    </main>
  )
}
