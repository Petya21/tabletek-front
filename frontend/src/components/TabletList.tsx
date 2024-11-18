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

const TabletList = () => {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");
    const [sortAscending, setSortAscending] = useState<boolean>(true);

    const [newTablet, setNewTablet] = useState<Tablet>({
        id: Date.now(),
        name: '',
        os: '',
        cpu_speed: 0,
        cores: 0,
        display_size: 0,
        resolution_x: 0,
        resolution_y: 0,
        ram: 0,
        price: 0,
    });

    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:3000/tablets")
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer('A kért erőforrás nem található (404)!');
                } else if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleRemove = (id: number) => {
        setTablets((prevTablets) => prevTablets.filter((tablet) => tablet.id !== id));
    };

    const handleAdd = () => {
        setTablets((prevTablets) => [...prevTablets, { ...newTablet, id: Date.now() }]);
        setNewTablet({
            id: Date.now(),
            name: '',
            os: '',
            cpu_speed: 0,
            cores: 0,
            display_size: 0,
            resolution_x: 0,
            resolution_y: 0,
            ram: 0,
            price: 0,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTablet((prev) => ({
            ...prev,
            [name]: name === "name" || name === "os" ? value : Number(value),
        }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = () => {
        const sortedTablets = [...tablets].sort((a, b) =>
            sortAscending ? a.price - b.price : b.price - a.price
        );
        setTablets(sortedTablets);
        setSortAscending(!sortAscending);
    };

    const filteredTablets = searchQuery
        ? tablets.filter((tablet) =>
              tablet.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : tablets;

    if (errorServer) {
        return <p>{errorServer}</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>;
    }

    return (
        <Container>
            <h2>Tabletek listája</h2>
            <input
                type="text"
                placeholder="Keresés név alapján..."
                value={searchQuery}
                onChange={handleSearch}
                style={{
                    marginBottom: "15px",
                    display: "block",
                    padding: "10px",
                    width: "100%",
                    maxWidth: "400px",
                }}
            />
            <button onClick={handleSort} style={{ marginBottom: "15px" }}>
                Ár szerint: {sortAscending ? "Növekvő" : "Csökkenő"}
            </button>
            <ul>
                {filteredTablets.map((tablet) => (
                    <li key={tablet.id}>
                        {tablet.name}; {tablet.os}; {tablet.cpu_speed}GHz; {tablet.cores}; {tablet.display_size}inch; {tablet.resolution_x}pixel; {tablet.resolution_y}pixel; {tablet.ram}GB; {tablet.price}Ft
                        <button onClick={() => handleRemove(tablet.id)} style={{ marginLeft: "10px", marginBottom: "5px" }}>
                            Törlés
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Új tablet hozzáadása</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
                <div>
                    <label htmlFor="name">Név</label>
                    <input id="name" type="text" name="name" value={newTablet.name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="os">Operációs rendszer</label>
                    <input id="os" type="text" name="os" value={newTablet.os} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="cpu_speed">CPU sebesség (GHz)</label>
                    <input id="cpu_speed" type="number" name="cpu_speed" value={newTablet.cpu_speed} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="cores">Magok száma</label>
                    <input id="cores" type="number" name="cores" value={newTablet.cores} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="display_size">Kijelző méret (inch)</label>
                    <input id="display_size" type="number" name="display_size" value={newTablet.display_size} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="resolution_x">Felbontás X</label>
                    <input id="resolution_x" type="number" name="resolution_x" value={newTablet.resolution_x} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="resolution_y">Felbontás Y</label>
                    <input id="resolution_y" type="number" name="resolution_y" value={newTablet.resolution_y} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="ram">RAM (GB)</label>
                    <input id="ram" type="number" name="ram" value={newTablet.ram} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="price">Ár (Ft)</label>
                    <input id="price" type="number" name="price" value={newTablet.price} onChange={handleChange} required />
                </div>
                <button type="submit">Hozzáadás</button>
            </form>
        </Container>
    );
};

export default TabletList;
