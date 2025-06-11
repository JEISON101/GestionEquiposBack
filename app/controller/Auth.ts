import { HttpContext } from "@adonisjs/core/http";
import hash from "@adonisjs/core/services/hash";
import client from "../database/PgDatabase.js";

export class AuthUsuariosController {

    async register({ request, response }: HttpContext) {
        const { email, password } = request.body();
        const passwordEncriptada = await hash.make(password)
        try {
            await client.query(`INSERT INTO usuarios(email, password) VALUES ($1, $2)`, [email, passwordEncriptada])
            return response.json({ mensaje: 'USUARIO REGISTRADO EXITOSAMENTE' })
        } catch (error) {
            return response.json({ mensaje: 'EL USUARIO NO SE PUDO REGISTRAR' })
        }
    }

    async login({ request, response }: HttpContext) {
        const { email, password } = request.body();
        const res = await client.query(`SELECT * FROM usuarios WHERE email = $1`, [email])
        if(res.rows.length > 0){
            const valid = await hash.verify(res.rows[0].password, password)
            if(valid){
                return response.json({ mensaje:'USUARIO LOGUEADO CORRECTAMENTE', valid:valid})
            }else{
                return response.json({ mensaje:'CREDENCIALES INCORRECTAS', valid:valid})
            }
        }else{
            return response.json({ mensaje:'USUARIO NO REGISTRADO'})
        }
    }
}