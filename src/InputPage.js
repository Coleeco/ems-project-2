import React, { useState } from "react";
import isEmpty from 'lodash/isEmpty';
import "./InputPage.css";
import { useStateValue } from './StateProvider';
import AutoComplete from "./Maps/AutoComplete"
import { actionTypes } from "./reducer";


function InputPage() {
  const [{ term, gmaps }, dispatch] = useStateValue();
  const [address, setAddress] = useState('');
  const [displayInput, setDisplayInput] = useState(false)
  // const [hospital, setHospital] = useState('');
  // const [helicopter, setHelicopter] = useState('');
  // const [time, setTime] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
  }

  // const showInput = () => {
  //   if (document.getElementById('show').style.visibility === 'hidden') {
  //     document.getElementById('show').style.visibility = 'visible';
  //   } else {
  //     document.getElementById('show').style.visibility = 'hidden';
  //   }
  // }

  const newPatientLoc= (place) => {
    dispatch({
      type: actionTypes.SET_LOC,
      patientLocal: place
    })
  }

  //  what does update results do ??
  return (
    <div className="input-container">
      <div className="location-section">
        <div className="manual-address-input">
          <button className="manual-address-btn"
            onClick={() => setDisplayInput(!displayInput)}
          >Add address manually</button>
          {displayInput &&
            (gmaps && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newPatientLoc} />
          )}
        </div>
      </div>

      <div className="dropdown">
        <select id="available-hospitals-selection">
          <option value="" disabled selected
            id="available-hospitals">Available Hospitals Nearby</option>
          {term[0] ?
            term.map(e => <option> {e.name}</option>)
            // <option>{term[0].name}</option>
            : null}
        </select>
        {/* {term[0] ? 
             term.map(e => console.log(e.name))
              :null} } */}

        <select id="available-helipads-dropdown">
          <option value="" disabled selected
            id="available-helipads">Available Helipads</option>
          <option value="site1">Site 1</option>
          <option value="site2">Site 2</option>
        </select>

        <input
          type="text"
          value={address}
          id="estimated-load-time"
          placeholder="Estimated Patient Loading Time (minutes)"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default InputPage;