import { useEffect, useState } from "react";
import { deleteClient, getClient } from "../api/client";
import { IUser } from "../config/Types";
import useModal from "../hook/useModal";
import Header from "./header/Header";
import Modal, { AlertInfo } from "./Modal/Modal";
import "./Table.css";

const Table = () => {
  const [list, setList] = useState<IUser[]>([]);
    const { openModal, closeModal, modalIsOpen } = useModal();
    const [userUpdate, setUserUpdate] = useState<IUser>({
      nombre:'',
      apellido:'',
      email:'',
      id:0,
    })
    const [TYPE, setTYPE] = useState('')
    const deleteClientAction=async(id=0)=>{
      try {
        await deleteClient(id)
        AlertInfo('Se ha eliminado correctamente')
      } catch (error) {
        
      } finally {
        getClient()
      }
      
    }
    useEffect(() => {
      (async () => {
        const { data } = await getClient();
        setList(data);
      })();
    }, [list]);
  return (
    <div className={"container"}>
      <div style={{ flexDirection: "column" }}>
      <Header/>
        <div style={{ width: 200 }}>
          <button className={"button-85"} onClick={()=>{setTYPE('add'); openModal()}}>Crear</button>
        </div>
        <div>
          <table>
            <caption>Usuarios</caption>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">apellido</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {list?.map(({ nombre, apellido, email,id }: IUser) => (
                <tr key={id}>
                  <td data-label="Nombre">{nombre}</td>
                  <td data-label="apellido">{apellido}</td>
                  <td data-label="Email">{email}</td>
                  <td data-label="Update">
                    <button className={"button-85"} style={{ width: 140 }} onClick={()=>{setTYPE('update');setUserUpdate({...{nombre, apellido, email, id}}) ;openModal()}}>
                      Actulizar
                    </button>
                    <button className={"button-85"} style={{ width: 140 }} onClick={()=>{deleteClientAction(id)}}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal {...{openModal,closeModal,modalIsOpen,TYPE,userUpdate}}/>
    </div>
  );
};

export default Table;
