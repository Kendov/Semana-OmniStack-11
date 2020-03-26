import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';


import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: ongId
            }
        }).then(res=>{
            setIncidents(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error. Unable to delete incident. Try again')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Welcome {ongName}</span>

                <Link className="button" to="/incidents/new">Register new incidend</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Recorded incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Incident:</strong>
                        <p>{incident.title}</p>

                        <strong>Description:</strong>
                        <p>{incident.description}</p>

                        <strong> value:</strong>
                        <p>{
                        Intl.NumberFormat('pt-BR', {
                            style:'currency', 
                            currency: 'BRL'}).format(incident.value)
                        }</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}


            </ul>
        </div>
    );
}