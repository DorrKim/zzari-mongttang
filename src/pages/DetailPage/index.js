import React from 'react';
import { useParams } from 'react-router';


const DetailPage = () => {
  const { zzalId } = useParams();
  
  return <h1> 짤 아이디 {zzalId}</h1>;
};


export default DetailPage;
