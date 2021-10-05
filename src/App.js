import {Fragment, useState, useEffect} from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import Error from './components/Error'

function App() {

  //crear state para la busqueda
  //se encarga de los datos del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  //cuando llamar a la api
  const [ consultar, guardarConsultar ] = useState(false)

  const [ resultado, guardarResultado ] = useState({})

  const [error, guardarError ] = useState(false)

  const { ciudad, pais } = busqueda

  useEffect(() => {
    //vamos a llamar a la api
    const consultarApi = async () => {
      if(consultar){
        const key = '8211fb00ad76f6eceb4a13ec46acb836'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        guardarResultado(resultado)
        guardarConsultar(false)

        if(resultado.cod === "404"){
          guardarError(true)
        }else{
          guardarError(false)
        }
      
      }
    }

    consultarApi()

  }, [consultar])

  let componente
  if(error){
    componente = <Error mensaje="No hay resultados"></Error>
  }else{
    componente = <Clima
                    resultado={resultado}
                  />
  }

  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />
      <div className="contenedor-form">
          <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario
                  busqueda={busqueda}
                  guardarBusqueda={guardarBusqueda}
                  guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                {componente}
              </div>
            </div>
          </div>
      </div>

    </Fragment>
  );
}

export default App;
