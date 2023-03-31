import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Presentation from './Presentation';

const API_BASE_URL = 'http://localhost:5000';

const FaceRecognition: React.FC = () => {
  const [recognizedNames, setRecognizedNames] = useState<string[]>([]);
  const [language, setLanguage] = useState(undefined);

  const startRecognition = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/start');
      const intervalId = setInterval(async () => {
      /*  try {
          const namesResponse = await axios.get('http://localhost:5000/api/names');
          if(namesResponse.data.length > 0) {
            const name = namesResponse.data;
            console.log(name && !recognizedNames.includes(name));
  
          if (name[0] && !recognizedNames.includes(name[0])) {
            console.log(name[0])
            console.log(recognizedNames.includes(name[0]))
            console.log('New name:' + name);
            setRecognizedNames((prevNames) => [...prevNames, name[0]]);
          }
        }*/
        try {
            const response = await axios.get(`${API_BASE_URL}/api/names`);
            if(response.data.length > 0) {
            const name = response.data;
        
            setRecognizedNames((prevNames) => {
              if (name[0] && !prevNames.includes(name[0])) {
                return [...prevNames, name[0]];
              }
              return prevNames;
            });
        }
        } catch (error) {
          console.error('Error fetching recognized names:', error);
        }
      }, 500); // Poll every 0.5 seconds
  
      setTimeout(() => {
        clearInterval(intervalId); // Stop polling after 3 hours
      }, 60000 * 60 * 3);
  
      console.log(response.data.message);
    } catch (error) {
      console.error('Error starting face recognition:', error);
    }
  };
  useEffect(() => {   

    const stopRecognition = async () => {
      await axios.post(`${API_BASE_URL}/api/stop`);
    };

    startRecognition();

    return () => {
      stopRecognition();
    };
  }, []);

  const trimAttendeeArray = (array: string[]) => [...new Set(array)];
  return (
    <div>
{/*         
    {recognizedNames.length}
      <h2>Recognized Names:</h2>
      <ul>
        {trimAttendeeArray(recognizedNames).map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
*/}
      <Presentation recognizedNames={recognizedNames} language={language} setLanguage={setLanguage}/>
    </div>
  );
};

export default FaceRecognition;
