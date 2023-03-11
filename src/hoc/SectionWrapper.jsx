import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) => // Componente que envuelve otro componente
  function HOC() {                         // Esta función crea una sección con un identificador único idName
    return (
      <motion.section                      // que devuelve un componente animado de forma escalonada.
        variants={staggerContainer()}      // Todos los componentes que usen este starWrapper se mostrarán uno tras otro.
        initial='hidden'                   
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`} // Ademas contarám con unos estilos comunes que los centran y les dan posición.
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        {/* Todos los componentes que usen este HOC se mostrarn animados escalonadamente y centrados en el html */}
        <Component /> 
      </motion.section>
    );
  };

export default StarWrapper;