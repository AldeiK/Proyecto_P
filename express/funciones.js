const conn=require('./connection');



function saludar(req,res){      
    res.json({mensaje:"hola Puta"});
}



function Despedida(req,res){      
    console.log(req.body.respuesta)
    res.json({mensaje:"hola Puta Pasame tu Num"});
}



function Parametro(req,res){      
   console.log(req.params.numero);
   res.json({mensaje:"ALV a lo toni montana"});
}

async function seleccionarTodo(req, res) {
    try {
        const resultado = await conn.query("SELECT * FROM Personajes_Principales");
        res.status(200).json(resultado.rows); 
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al obtener los personajes");
    }
}


async function insertar(req, res) {
    try {
        const { nombre, epoca_historica, juego_id } = req.body; 
        const resultado = await conn.query(
            "INSERT INTO Personajes_Principales (nombre, epoca_historica, juego_id) VALUES ($1, $2, $3)", 
            [nombre, epoca_historica, juego_id]
        );
        res.status(201).send("Personaje insertado correctamente");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al insertar el personaje");
    }
}


async function eliminar(req, res) {
    try {
        const { id } = req.params;
        const resultado = await conn.query(
            "DELETE FROM Personajes_Principales WHERE id_personaje = $1", 
            [id]
        );
        res.status(200).send("Personaje eliminado correctamente");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al eliminar el personaje");
    }
}


async function actualizar(req, res) {
    try {
        const { id } = req.params;  
        const { nombre, epoca_historica, juego_id } = req.body; 
        const resultado = await conn.query(
            "UPDATE Personajes_Principales SET nombre = $1, epoca_historica = $2, juego_id = $3 WHERE id_personaje = $4", 
            [nombre, epoca_historica, juego_id, id]
        );
        res.status(200).send("Personaje actualizado correctamente");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al actualizar el personaje");
    }
}



async function seleccionarID(req, res) {
    try {
        const { id } = req.params; 
        const resultado = await conn.query(
            "SELECT * FROM Personajes_Principales WHERE id_personaje = $1", 
            [id]
        );
        if (resultado.rows.length > 0) {
            res.status(200).json(resultado.rows[0]);
        } else {
            res.status(404).send("Personaje no encontrado");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error al obtener el personaje");
    }
}


module.exports={saludar,Despedida,Parametro,seleccionarTodo,insertar,eliminar,actualizar,seleccionarID};