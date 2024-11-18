import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';

export interface Tablet {
  id: number;
  name: string;
  os: string;
  cpu_speed: number;
  cores: number;
  display_size: number;
  resolution_x: number;
  resolution_y: number;
  ram: number;
  price: number;
}

const TabletPagination = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetch(`http://localhost:3000/tablets`)
      .then((response) => response.json())
      .then((data) => {
        setTablets(data.tablets);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba: {error}</p>;

  return (
    <Container>
      <h2>Tabletek Lista (Pagináció)</h2>

      <ul>
        {tablets.map((tablet) => (
          <li key={tablet.id}>
            <strong>{tablet.name}</strong>; OS: {tablet.os}; CPU: {tablet.cpu_speed} GHz; 
            Magok: {tablet.cores}; Kijelző: {tablet.display_size}" ({tablet.resolution_x}x{tablet.resolution_y}); 
            RAM: {tablet.ram} GB; Ár: {tablet.price} Ft
          </li>
        ))}
      </ul>


      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Előző
        </button>
        <span style={{ margin: '0 10px' }}>
          {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Következő
        </button>
      </div>
    </Container>
  );
};

export default TabletPagination;
