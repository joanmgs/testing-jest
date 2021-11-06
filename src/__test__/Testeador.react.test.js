//@ts-nocheck
import '@testing-library/jest-dom'
import React from "react";
// import renderer, { act } from "react-test-renderer";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Testeador from "../components/Testeador";

describe('Pruebas de testing-library', () => {

  it('Renderiza', () => {
    //Render indica el componente que se testeará
    //screen es equivalente a todo el contenido del render
    render(<Testeador />)
    //Para encontrar un elemento debe indicarse el nombre a trabés de los queries
    // Aquí están todas las fotmas de hacerlo: https://testing-library.com/docs/queries/about
    //En este caso con el role que es el tipo de elemento
    //se hace getAll porque hay más de un botón, si se hace solo
    //  const btn = screen.getByRole('button');
    //arroja un error porque dirá que hay más de uno
    const btn = screen.getAllByRole('button');
    
    //En este caso se screen.debug() para ver mejor los elementos
    //btn indicará que es un array con dos botones, así que para escoger uno de los dos se accede como un array normal
    // screen.debug(btn[0]);
    
    //En este caso para escoger solo un botón se puede usar la propiedad name
    //que es el contenido del elemento, el contenido del label que tiene ese elemento
    //o el atributo aria-label
    //en este caso se usa regex para que encuentre aquel contenido que tenga b-2 en él
    const btn1 = screen.getByRole('button', { name: /b-1/ });
    const h1 = screen.getByRole('heading');
    // const btn2 = screen.getByRole('button', { name: /b-2/ });
    
    //Primer momento
    expect(h1).toHaveTextContent('SinNombre');
    screen.debug(h1);

    //Hago click
    userEvent.click(btn1);

    // expect(h1).toHaveTextContent('UnNombre');
    expect(h1.textContent).toBe('UnNombre');
    
    screen.debug();
    // screen.debug(h1);

  });
  
});


// describe("Haciendo pruebas", () => {
  
//   //Este test crea un snapshot, que es el resultado actual obtenido en expect
//   //se corre con npm run test y los resultados estan en la carpeta _snapshots_
//   //si se hacen cambios al componente, y se vuelve a hacer npm run test
//   //se compara el primer resultado con el resultado actual.
//   //npm run test -u actualizará el snapshot por el actual
//   test("Primera prueba - toMatchSnapshot", () => {
//     const tree = renderer.create(<Testeador />);
//     console.log("--------- TREE -------------", tree.toJSON());
//     console.log(tree.toJSON());
//     console.log("--------- TREE -------------", tree.toJSON());
//     expect(tree.toJSON()).toMatchSnapshot();
//   });

// });

// describe('Probando botón', () => {
  
//   it('Reconoce que hay dentro del h1', () => {
//     const tree = renderer.create(<Testeador />);
//     const button = tree.toJSON()[1];
//     const h1 = tree.toJSON()[0];
    
//     expect(h1.children[0]).toBe("SinNombre");

//   });
// });

