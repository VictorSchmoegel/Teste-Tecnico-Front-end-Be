import { useEffect, useState } from "react"
import { IoIosSearch } from "react-icons/io";
import { FaCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { normalizeString } from "../utils/normalize";
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPhone = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  const normalizedSearch = normalizeString(search);

  const filteredEmployees = employees.filter(employee =>
    normalizeString(employee.name).includes(normalizedSearch) ||
    normalizeString(employee.job).includes(normalizedSearch) ||
    employee.phone.includes(search)
  );
  
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  })

  return (
    <main className="user-table">
      <>
        {loading ? '' : <p>Carregando...</p>}
        <div className="search-div">
          <h1>Funcionários</h1>
          <div className="search-div-container">
            <input
              id="searchInput"
              type="text"
              placeholder="Pesquisar"
              value={search}
              onChange={handleSearch}
            />
            <span className="search-icon">
              <IoIosSearch />
            </span>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Data de Admissão</th>
              <th>telefone</th>
              <th id="circle-icon"><FaCircle /></th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map((employee, index) => (
              <>
              <tr key={employee.id} onClick={() => handleExpand(index)} className="employee-row">
                <td>
                  <img src={employee.image} alt={employee.name} />
                </td>
                <td>{employee.name}</td>
                <td>{employee.job}</td>
                <td>{formatDate(employee.admission_date)}</td>
                <td>{formatPhone(employee.phone)}</td>
                <td className="expand-btn">{expanded === index ? <FaChevronUp /> : <FaChevronDown />}</td>
              </tr>
              {expanded === index && (
                <tr className="employee-details">
                  <td className="expanded">
                    <div><span>Cargo:</span> {employee.job}</div>
                    <div><span>Data de Admissão:</span> {formatDate(employee.admission_date)}</div>
                    <div><span>Telefone:</span> {formatPhone(employee.phone)}</div>
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
