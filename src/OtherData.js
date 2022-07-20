import { useState, useEffect } from 'react';
import './App.css';

export default function OtherDataComp(props) {

  const[userdata, setUserData] = useState(props.userData)

  useEffect(() => {
    props.callback.user(userdata)
    },[userdata])

  return (
    <div className="other">
      <h5>Street: <input type="text" value={userdata.street} onChange={(e) => setUserData({...userdata, street: e.target.value})}/></h5>
      <h5>City: <input type="text" value={userdata.city} onChange={(e) => setUserData({...userdata, city: e.target.value})}/></h5>
      <h5>Zip Code: <input type="text" value={userdata.zipcode} onChange={(e) => setUserData({...userdata, zipcode: e.target.value})}/></h5>
    </div>
  );
}
