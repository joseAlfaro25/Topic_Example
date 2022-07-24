import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { getClient, postClient, updateClient } from "../../api/client";
import { IUser } from "../../config/Types";
import "../Table.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export interface IModal {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  TYPE: string;
  userUpdate:IUser
}
export interface IOnChanges {
  name: string;
  value: string;
}

export const AlertInfo=(name:string,icon?:boolean)=>{
  const iconE=!icon?'success':'error'
  Swal.fire({
    position: "center",
    icon: iconE,
    title: `${name}`,
    showConfirmButton: false,
    timer: 1500,
  });
}
const ModalComponent = ({
  closeModal,
  modalIsOpen,
  TYPE,
  userUpdate
}: IModal) => {
  const [user, setUser] = useState<IUser>(userUpdate);
  const onChangeUser = ({ name, value }: IOnChanges) => {
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    setUser(userUpdate)
  }, [userUpdate])
  
  const actionRequest = async () => {
    if (TYPE === "add") {
      try {
        await postClient(user);
        AlertInfo('Se guardar correctamente')
      } catch (error) {
        AlertInfo('Error al registrar',true)
      } finally {
        await getClient()
      }
    } else {
      try {
        await updateClient(user)
        await getClient()
        AlertInfo('Se actualizo correctamente')
      } catch (error) {
        AlertInfo('Error al actualizar',true)
      } finally {
        await getClient()
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="form__group">
          <label className="form__label">Nombre</label>
          <input
            type="text"
            className=""
            id="name"
            placeholder="Nombre"
            name="nombre"
            value={user.nombre}
            onChange={({ target }) =>
              onChangeUser({ name: "nombre", value: target.value })
            }
            required
          />
          <label className="form__label">apellido</label>
          <input
            type="text"
            className=""
            name="apellido"
            placeholder="Apellido"
            value={user.apellido}
            onChange={({ target }) =>
              onChangeUser({ name: "apellido", value: target.value })
            }
            required
          />
          <label className="form__label">Email</label>
          <input
            type="email"
            className=""
            name="email"
            placeholder="Correo"
            value={user.email}
            onChange={({ target }) =>
              onChangeUser({ name: "email", value: target.value })
            }
            required
          />
        </div>
        <button className={"button-85"} onClick={actionRequest}>
          {`${TYPE === "add" ? "Guardar" : "Actualizar"}`}
        </button>
      </Modal>
    </div>
  );
};

export default ModalComponent;
