import React,{useState,useEffect} from 'react'
import india from './images/india.png'
import pakistan from './images/pakistan.png'
import afghanistan from './images/afghanistan.png'
import australia from './images/australia.png'
import bangladesh from './images/bangladesh.png'
import england from './images/england.png'
import new_zealand from './images/new_zealand.png'
import south_africa from './images/south_africa.png'
import sri_lanka from './images/sri_lanka.png'
import west_indies from './images/west_indies.png'

const CricketScorePredictor = () => {
    const [a,setA]=useState(india);
    const [b,setB]=useState(pakistan);
    const [teams, setTeams] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        batting_team: 'India',
        bowling_team: 'Pakistan',
        city: 'Abu Dhabi',
        current_runs: '',
        overs: '',
        wickets: '',
        last_five: ''
      });
      const [teamImages] = useState({
        India: india,
        Pakistan: pakistan,
        Afghanistan: afghanistan,
        Australia: australia,
        Bangladesh: bangladesh,
        England: england,
        'New Zealand': new_zealand,
        'South Africa': south_africa,
        'Sri Lanka': sri_lanka,
        'West Indies': west_indies,
    });
      const [prediction, setPrediction] = useState(null);
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          const data = await response.json();
          setPrediction(data.prediction);
        } else {
          alert('Failed to get prediction');
        }
      };
      useEffect(() => {
        fetch('/data')
          .then(response => response.json())
          .then(data => {
            setTeams(data.teams);
            setCities(data.cities);
            setA('./images/india.png');
            setB('./images/pakistan.png');
          });
      }, []);
  return (
    <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center">
      <h1 className="text-[50px] text-cyan-800 font-bold mb-20">Cricket Score Predictor</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <img src={teamImages[formData.batting_team]} alt="Batting Team" className="w-40 h-40 mb-2" />
            <label htmlFor="batting_team" className="text-md font-semibold">Select Batting Team</label>
            <select
              id="batting_team"
              name="batting_team"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.batting_team}
              onChange={handleChange}
            >
              {teams.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center">
            <img src={teamImages[formData.bowling_team]} alt="Bowling Team" className="w-40 h-40 mb-2" />
            <label htmlFor="bowling_team" className="text-md font-semibold">Select Bowling Team</label>
            <select
              id="bowling_team"
              name="bowling_team"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.bowling_team}
              onChange={handleChange}
            >
              {teams.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="text-md font-semibold">Select City</label>
            <select
              id="city"
              name="city"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.city}
              onChange={handleChange}
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="current_runs" className="text-md font-semibold">Current Score</label>
            <input
              type="number"
              id="current_runs"
              name="current_runs"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.current_runs}
              onChange={handleChange}
              placeholder="Enter current score"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="overs" className="text-md font-semibold">Overs Done (Works for Over &gt; 5)</label>
            <input
              type="number"
              step="0.1"
              id="overs"
              name="overs"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.overs}
              onChange={handleChange}
              placeholder="Enter overs"
            />
          </div>
          <div>
            <label htmlFor="wickets" className="text-md font-semibold">Wickets</label>
            <input
              type="number"
              id="wickets"
              name="wickets"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.wickets}
              onChange={handleChange}
              placeholder="Enter wickets"
            />
          </div>
          <div>
            <label htmlFor="last_five" className="text-md font-semibold">Runs Scored in Last 5 Overs</label>
            <input
              type="number"
              id="last_five"
              name="last_five"
              className="block w-full mt-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
              value={formData.last_five}
              onChange={handleChange}
              placeholder="Enter runs in last 5 overs"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-xl font-semibold"
        >
          Predict Score
        </button>

        {prediction !== null && (
          <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-semibold">Predicted Score: {prediction}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default CricketScorePredictor