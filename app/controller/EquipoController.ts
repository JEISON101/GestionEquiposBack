import client from "../database/PgDatabase.js";
import { HttpContext } from "@adonisjs/core/http";

export default class EquiposController{

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
        const result = await client.query('update equipo set nombre=$1,anio_fundacion=$2 where id_equipo=$3',[nombre,anio_fundacion,id])
        return response.json({mensaje: 'Se actualizo el equipo'})   
    }

    async deleteEquipo({params,response}:HttpContext){
        const  {id} = params.id
        const result = await client.query('delete from equipo where id_equipo=$1',[id])
        return response.json({mensaje: 'El equipo se ha eliminado exitosamente'})
    }

    async getEquipoPresidente({request,response}:HttpContext){
        const result = await client.query('select * from public.equipo where id_equipo not in (select id_equipo) from presidente')
        console.log(result.rows)
        return response.json({mensaje:'Se obtiene el equipo sin presidente', datos: result.rows})
    }
}