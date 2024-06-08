import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protect(){
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('userEmail')) {
            navigate('/login');
        }
    });
};

export default Protect;