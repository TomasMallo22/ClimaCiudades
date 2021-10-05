import React, {useState} from 'react'

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
    
  
    
    const [error, guardarError] = useState(false)

    const { ciudad, pais } = busqueda

    //funcionar para actualizar el state mientras se agregan nuevos valores a los campos
    const handleChange = e => {
        //actualizar el state de formulario 
        guardarBusqueda({
            ...busqueda, 
            [e.target.name] : e.target.value
        })
    }

    //funcion para guardar información de una busqueda 

    const handleSubmit = e => {
        e.preventDefault()

        //validar los campos y manejar errores
        if(ciudad.trim() === '' || pais.trim() === ''){
            guardarError(true)
            return
        }

        guardarError(false)

        guardarConsultar(true)
    }

    return ( 
        <form 
            onSubmit={handleSubmit}
        >
            {error ? <p className="red darken-4 error">Los campos son obligatorios </p> : null }
            
            <div className="input-field col s12">
                <select 
                    name="pais" 
                    id="pais" 
                    value={pais}
                    onChange={handleChange}
                 >
                    <option value="">-- Seleccionar un país --</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                    <option value="AW">Aruba</option>

                </select>
                <label htmlFor="pais"> País: </label>

                <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad"> Ciudad:</label>
            </div> 
            </div>
            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}
 
export default Formulario;