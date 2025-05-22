import client from "../database/PgDatabase.js";
import { HttpContext } from "@adonisjs/core/http";

export default class equiposcontroller{
    async getEquipo({request,response}:HttpContext){
        const result = await client.query('select * from equipo')
        console.log(result.rows)
        return response.json({ mensaje: 'Estos son los equipos', datos: result.rows })
    }

    async postEquipo({request,response}:HttpContext){
        const {nombre,anio_fundacion}=request.body()
        await client.query(`insert into equipo(nombre,anio_fundacion)values($1,$2)`,[nombre,anio_fundacion])
        return response.json({mensaje:'Se creo el equipo', datos:{nombre,anio_fundacion},
        })
    }

    async putEquipo({params, request, response}:HttpContext){
        const id = params.id
        const {nombre,anio_fundacion} = request.body()
        const result = await client.query('update equipo set nombre=$,anio_fundacion=$2 where id=$3',[nombre,anio_fundacion,id])
        return response.json({mensaje: 'Se actualizo el equipo'})   
    }

    async deleteEquipo({params,response}:HttpContext){
        const id = params.id
        const result = await client.query('delete from equipo where id=$1',[id])
        return response.json({mensaje: 'El equipo se ha eliminado exitosamente'})
    }
}