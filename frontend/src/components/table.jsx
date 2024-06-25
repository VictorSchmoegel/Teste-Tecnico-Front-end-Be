import { useEffect, useState } from "react"
import './table.css'

export default function Table() {
  const [employees, setEmployees] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

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

  const handleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

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
            {filteredEmployees.map((employee, index) => (
              <>
              <tr key={employee.id} onClick={() => handleExpand(index)} className="employee-row">
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}<p className="expand-btn">{expanded === index ? '▲' : '▼'}</p></td>
                <td>{employee.job}</td>
                <td>{employee.admission_date}</td>
                <td>{employee.phone}</td>
              </tr>
              {expanded === index && (
                <tr className="employee-details">
                  <td className="expanded">
                    <div><span>Cargo:</span> {employee.job}</div>
                    <div><span>Data de Admissão:</span> {employee.admission_date}</div>
                    <div><span>Telefone:</span> {employee.phone}</div>
                  </td>
                </tr>
              )}
              </>
            ))}
          </tbody>
          {error && <p>Erro ao carregar os dados</p>}
        </table>
      </>
    </main>
  )
}
