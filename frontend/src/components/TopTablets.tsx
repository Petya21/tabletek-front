import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css';

interface Tablet {
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

const TopTablets = () => {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/tablets')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch tablets data');
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data); 
                setLoading(false);  
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false); 
            });
    }, []);

    const topExpensiveTablets = tablets
        .slice()
        .sort((a, b) => b.price - a.price) 
        .slice(0, 3); 

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container>
            <h2>Top 3 Legdrágább Tabletek</h2>
            <Row>
                {topExpensiveTablets.map((tablet) => (
                    <Col key={tablet.id} xs={12} md={4}>
                        <Card style={{ marginBottom: '20px' }}>
                            <Card.Body>
                                <Card.Title>{tablet.name}</Card.Title>
                                <Card.Text>
                                    <strong>OS:</strong> {tablet.os}<br />
                                    <strong>CPU Speed:</strong> {tablet.cpu_speed} GHz<br />
                                    <strong>Cores:</strong> {tablet.cores}<br />
                                    <strong>Display Size:</strong> {tablet.display_size} inches<br />
                                    <strong>Resolution:</strong> {tablet.resolution_x}x{tablet.resolution_y}<br />
                                    <strong>RAM:</strong> {tablet.ram} GB<br />
                                    <strong>Price:</strong> {tablet.price} Ft
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TopTablets;