from flask import Flask, jsonify, request
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model
pipe = pickle.load(open('pipe.pkl', 'rb'))

teams = [
    'Australia', 'India', 'Bangladesh', 'New Zealand', 'South Africa',
    'England', 'West Indies', 'Afghanistan', 'Pakistan', 'Sri Lanka'
]

cities = [
    'Colombo', 'Mirpur', 'Johannesburg', 'Dubai', 'Auckland', 'Cape Town',
    'London', 'Pallekele', 'Barbados', 'Sydney', 'Melbourne', 'Durban',
    'St Lucia', 'Wellington', 'Lauderhill', 'Hamilton', 'Centurion',
    'Manchester', 'Abu Dhabi', 'Mumbai', 'Nottingham', 'Southampton',
    'Mount Maunganui', 'Chittagong', 'Kolkata', 'Lahore', 'Delhi',
    'Nagpur', 'Chandigarh', 'Adelaide', 'Bangalore', 'St Kitts', 'Cardiff',
    'Christchurch', 'Trinidad'
]

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify({'teams': sorted(teams), 'cities': sorted(cities)})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    batting_team = data['batting_team']
    bowling_team = data['bowling_team']
    city = data['city']
    current_runs = int(data['current_runs'])
    overs = float(data['overs'])
    wickets = int(data['wickets'])
    last_five = int(data['last_five'])

    balls_left = 120 - (overs * 6)
    wicket_left = 10 - wickets
    current_run_rate = current_runs / overs

    input_df = pd.DataFrame(
        {
            'batting_team': [batting_team], 
            'bowling_team': [bowling_team], 
            'city': [city], 
            'current_runs': [current_runs], 
            'balls_left': [balls_left], 
            'wicket_left': [wicket_left], 
            'current_run_rate': [current_run_rate], 
            'last_five': [last_five]
        }
    )

    result = pipe.predict(input_df)
    prediction = int(result[0])

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
