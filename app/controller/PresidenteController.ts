import client from "../database/PgDatabase.js";
import { HttpContext } from "@adonisjs/core/http";

export default class PresidenteController {

    async getPresidentes({response}:HttpContext){
        const presidentes = await client.query(`SELECT * FROM presidente ORDER BY dni ASC `)
        return response.status(200).json({datos:presidentes.rows})
    }

    async postPresidente({request, response}: HttpContext){
        const {id_equipo, dni, nombre} = request.body()
        await client.query(`INSERT INTO presidente (id_equipo, dni, nombre) VALUES ($1, $2, $3)`,[id_equipo, dni, nombre])
        return response.status(200).json({mensaje:'PRESIDENTE INSERTADO EXITOSAMENTE'})
    }

    async putPresidente({params, request, response}:HttpContext){
        const id = params.dni;
        const {id_equipo, dni, nombre} = request.body()
        await client.query('UPDATE presidente SET id_equipo = $1, dni = $2, nombre = $3 WHERE dni = $4',[id_equipo, dni, nombre, id])
        return response.status(200).json({mensaje:'PRESIEDNTE ACTUALIZADO EXITOSAMENTE'})
    }

    async deletePresidente({params, response}:HttpContext){
        const id = params.dni;
        await client.query('DELETE from presidente WHERE dni = $1',[id])
        return response.status(200).json({mensaje:'PRESIDENTE ELIMINADO EXITOSAMENTE'})
    }
}