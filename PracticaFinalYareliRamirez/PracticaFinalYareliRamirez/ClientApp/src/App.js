import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from "reactstrap"
import TablaTareas from "./components/TablaTareas"
import ModalTarea from "./components/ModalTarea"

const App = () => {

    const [tareas, setTareas] = useState([])

    const mostrarTareas = async () => {

        const response = await fetch("api/personaitem/Lista");

        if (response.ok) {
            const data = await response.json();
            setTareas(data)
        } else {
            console.log("Error en los datos de la lista")
        }
    }

    useEffect(() => {
        mostrarTareas()
    }, [])

    const guardarTarea = async (tarea) => {

        const response = await fetch("api/personaitem/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarTareas();
        }

    }

    const editarTarea = async (tarea) => {

        const response = await fetch("api/personaitem/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tarea)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarTareas();
        }

    }

    const eliminarTarea = async (id) => {

        var respuesta = window.confirm("Desea eliminar esta tarea")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/personaitem/Eliminar/" + id, {
            method: 'DELETE'
        })

        if (response.ok) {
            mostrarTareas();
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Tareas</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Agregar Tarea</Button>
                            <hr></hr>
                            <TablaTareas data={tareas}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarTarea={eliminarTarea}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalTarea
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarTarea={guardarTarea}
                editar={editar}
                setEditar={setEditar}
                editarTarea={editarTarea}
            />
        </Container>
    )
}

export default App;