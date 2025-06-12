import { HttpContext } from "@adonisjs/core/http";
import hash from "@adonisjs/core/services/hash";
import client from "../database/PgDatabase.js";

export class AuthUsuariosController {

    async register({ request, response }: HttpContext) {
        const { nombre, correo, direccion, telefono, contrasena } = request.body();
        const passwordEncriptada = await hash.make(contrasena)
        try {
            await client.query(`INSERT INTO usuarios(nombre, correo, direccion, telefono, contrasena) VALUES ($1, $2, $3, $4, $5)`, [nombre, correo, direccion, telefono, passwordEncriptada])
            return response.json({ mensaje: 'USUARIO REGISTRADO EXITOSAMENTE' })
        } catch (error) {
            return response.json({ mensaje: 'EL USUARIO NO SE PUDO REGISTRAR' })
        }
    }

    async login({ request, response }: HttpContext) {
        const { correo, contrasena } = request.body();
        const res = await client.query(`SELECT * FROM usuarios WHERE correo = $1`, [correo])
        if(res.rows.length > 0){
            const valid = await hash.verify(res.rows[0].contrasena, contrasena)  
            if(valid){
                const name = client.query("SELECT nombre FROM usuarios WHERE correo = $1", [correo])
                return response.json({ mensaje:'USUARIO LOGUEADO CORRECTAMENTE', valid:valid, nombre:(await name).rows[0].nombre})
            }else{
                return response.json({ mensaje:'CREDENCIALES INCORRECTAS', valid:valid})
            }
        }else{
            return response.json({ mensaje:'No hay usuarios registrados con este correo'})
        }
    }
}