import { useRef, useState } from 'react';
import './App.css';
import Users from "./Users";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const addName = useRef();
  const addEmail = useRef();
  const addAge = useRef();

  const updateName = useRef();
  const updateEmail = useRef();
  const updateAge = useRef();

  const [users, setUsers] = useState(Users);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [editedUser, setEditedUser] = useState("");


  const deleteHandler = (id) => {
    setUsers(users.filter(user => user.id !== id))
    toast.warn("Deleted User!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });

  }

  const addNewUser = () => {

    var nameVal = addName.current.value;
    var emailVal = addEmail.current.value;
    var ageVal = addAge.current.value;

    var largestId = 0;

    users.forEach(user => {
      if (user.id > largestId) {
        largestId = user.id;
      }
    })

    setUsers([...users, {
      id: largestId + 1,
      name: nameVal,
      email: emailVal,
      age: ageVal
    }]);

    nameVal = ""
    emailVal = ""
    ageVal = ""

    toast.success("Created New User!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });

    setAddModal(false)
  }



  const updateUser = () => {
  
    setUsers((prevUsers) => prevUsers.map(user => user.id === editedUser.id ? {
      ...user,
      name: updateName.current.value,
      email: updateEmail.current.value,
      age: updateAge.current.value
    } : user))
    toast.success("Updated User!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });
    setUpdateModal(false)
  }

  const updateHandler = (id) => {
    setUpdateModal(true);
    var editedUserVal = users.find(user => user.id === id);
    setEditedUser(editedUserVal);
  }

  return (
    <>
      <div className='container'>
        <button onClick={() => { setAddModal(true) }} className='btn btn-success mb-3'>Yeni Kullanıcı Ekle</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İsim</th>
              <th>Email</th>
              <th>Yaş</th>
              <th style={{ width: "150px" }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {
              users && users.length > 0 ? users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <div className='actions'>
                      <button onClick={() => { updateHandler(user.id) }} className='btn btn-info'>Düzenle</button>
                      <button onClick={() => { deleteHandler(user.id) }} className='btn btn-danger'>Sil</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5}>Kullanıcı bulunmamaktadır.</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <ToastContainer />
      {
        addModal && (
          <div className='modal-overlay'>
            <div className='modal'>
              <div className='modal-header'>
                <h5>Kullanıcı Ekle</h5>
                <button onClick={() => { setAddModal(false) }} type='button' className='close-button'>x</button>
              </div>
              <div className='modal-body'>
                <input type='text' placeholder='İsim' ref={addName} />
                <textarea placeholder='E-Mail' ref={addEmail}></textarea>
                <input type='text' placeholder='Yaş' ref={addAge} />
                <button onClick={addNewUser} className='btn btn-success'>Ekle</button>
              </div>
            </div>
          </div>
        )
      }
      {
        updateModal && (
          <div className='modal-overlay'>
            <div className='modal'>
              <div className='modal-header'>
                <h5>Kullanıcı Düzenle</h5>
                <button onClick={() => { setUpdateModal(false) }} type='button' className='close-button'>x</button>
              </div>
              <div className='modal-body'>
                <input type='text' placeholder='İsim' ref={updateName} defaultValue={editedUser.name} />
                <textarea placeholder='E-Mail' ref={updateEmail} defaultValue={editedUser.email}></textarea>
                <input type='text' placeholder='Yaş' ref={updateAge} defaultValue={editedUser.age} />
                <button onClick={updateUser} className='btn btn-success'>Kaydet</button>
              </div>
            </div>
          </div>
        )
      }

    </>
  );
}

export default App;
