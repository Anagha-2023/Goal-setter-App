
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  getAllUsers,reset,UserBlock, editUser} from '../features/adminAuth/adminAuthSlice';

function UserList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminAuth.users);
  const isLoading = useSelector((state) => state.adminAuth.isLoading);

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleBlock = (userId) => {
    if (window.confirm("Are you sure want to block the user?")) {
      dispatch(UserBlock(userId));
    }
  };

  const handleEdit = (userId, name, email) => {
    const newName = prompt("Enter new name:", name);
    const newEmail = prompt("Enter new Email:", email);
    if (newName === null || newEmail === null) {
      return; 
    }
    if (newEmail && newName) {
      dispatch(editUser({ userId, name: newName, email: newEmail }));
    }
  };
 
  return (
    <div className="user-list">

      
       {isLoading && <p>Loading...</p>}
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* <img src={`user_photo${index + 1}.jpg`} alt="User Photo" /> */}
                  <img src={user?.profileUrl ? user.profileUrl :  "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"} alt="profile"  />

                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isBlock ? "Blocked" : "Unblocked"}</td>
                <td className="action-buttons">
                  <div className="table-button">
                  <button onClick={() => handleBlock(user._id)}  className="btn">{user.isBlock ? "Unblock" : "Block"}</button>
                  <button  onClick={() => handleEdit(user._id, user.name, user.email)} className="btn-1">Edit</button>

                  </div>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
  
}

export default UserList;