import React, { useEffect, useState } from "react";
import { PSYCHOLOGISTS_FETCHED } from "../constants/ActionTypes";
import appStore from "../stores/AppStore";
import { getPsychologists } from "../actions/AppActions";
import { Link } from 'react-router-dom';

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const psychologistsPerPage = 5;

  useEffect(() => {
    getPsychologists();

    const handlePsychologistsFetched = (data) => {
      setPsychologists(data);
    };

    appStore.on(PSYCHOLOGISTS_FETCHED, handlePsychologistsFetched);

    return () => {
      appStore.off(PSYCHOLOGISTS_FETCHED, handlePsychologistsFetched);
    };
  }, []);
  
  
  

  return (
    <div className="container" style={{ width: "95%"}}>
      <div className="text-center mb-5 psikologyazisitop">
      <h2 className="text-center">Psikolog Listesi</h2>
      </div>
      {psychologists.map((psychologist, index) => (
        <div className="card mb-5" key={index}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <h4 className="h5">Psikolog</h4>
              </div>
              <div className="col-sm-2">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  className="rounded-circle user_img"
                  alt="Psychologist"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="col-sm-8">
                <div className="d-flex flex-column flex-lg-row">
                  <div className="row flex-fill">
                    <div className="col-sm-5 psikologisim">
                      <h5 className="psychologist-name">
                        {psychologist.name} {psychologist.surname}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
              <Link to={`/psychologists/${psychologist.id}`}>
                <button type="button" className="btn btn-secondary btn-rounded butonProfil">
                  Profil Sayfasına Git
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Psychologists;