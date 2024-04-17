import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Routes, Route } from 'react-router-dom';
import './TabienList.css';
import AppSearch from '../components/AppSearch';





const MemberList = () => {
  const [tabiens, setTabiens] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTabien, setSelectedTabien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3300/member')
      .then(res => {
        const tabiens = res.data;
        setTabiens(tabiens);
        setLoading(false); // Set loading to false when data is fetched successfully
        if (id) {
          const selected = tabiens.find(tabien => tabien.ID === parseInt(id, 10));
          setSelectedTabien(selected || null);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error state if there's an issue
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [id]);

  const openTabienDetail = (tabienId) => {
    window.open(`/tabiens/${tabienId}`, '_blank');
  };

  return (
    <div className="container">
      <AppSearch value={searchText} onValueChange={setSearchText} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

  
    </div>
  );
};

export default MemberList;