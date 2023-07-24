import { Button, Table } from "reactstrap"
import "../style/style.css"
import basura from "../assets/basura.png"
import editar from "../assets/editar.png"

const TablaTareas = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarTarea }) => {

    const enviarDatos = (Tarea) => {
        setEditar(Tarea)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table responsive>
            <thead className="fondo-titulo">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Estatus</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.descripcion}</td>
                                <td ><div className={item.completado ? "completado" : "no-completado"}>{item.completado ? "Completado" : "Sin realizar"}</div></td>
                                <td>
                                    <Button outline color="black" size="sm" className="me-2" onClick={() => enviarDatos(item)}><img className="btn-editar" src={editar} alt="Editar"></img></Button>
                                    <Button outline color="black" size="sm" onClick={() => eliminarTarea(item.id)}><img className="btn-eliminar" src={basura} alt="Eliminar"></img></Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaTareas;