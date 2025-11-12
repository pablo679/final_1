
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1>Error 404</h1>
            <p>Página no encontrada.</p>
            <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
        </div>
    );
}

export default NotFoundPage;