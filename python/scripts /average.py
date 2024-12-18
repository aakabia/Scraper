from sqlalchemy import create_engine
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from dotenv import load_dotenv
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score,accuracy_score,root_mean_squared_error



load_dotenv()
scaler = StandardScaler()



pd.set_option('display.max_rows', 10)  # Limit the rows displayed (e.g., 10 rows)
pd.set_option('display.max_columns', None)  # Limit the columns displayed (e.g., 5 columns)

# Set the width of the display (this prevents columns from being wrapped)
pd.set_option('display.width', 100)

# Set the maximum number of characters per column (useful for text-heavy columns)
pd.set_option('display.max_colwidth', 20)







db_username = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')



db_url = f'postgresql://{db_username}:{db_password}@localhost:5432/{db_name}'

engine = create_engine(db_url)

query =  '''
    SELECT 
		g.player_name,
		g.matchup,
        g.minutes_played, 
        g.free_throws_made,
        g.field_goals_made,
        g.field_goals_three_made,
        g.points, 
        g.home_away,
	ts.defensive_rating AS opponent_defensive_rating, 
    ts.pace_factor AS opponent_pace_factor
FROM 
    "Games" g
JOIN 
    "AdvanceTeamStats" ts
ON 
    ts.team_abr = SPLIT_PART(g.MATCHUP, ' ', 3) -- Opponent team abbreviation
    AND ts.stat_year = g.stat_year -- Directly using the stat_year from the Games table

	
'''


queryTwo = """
        SELECT 
        g.minutes_played, 
        g.free_throws_made,
        g.field_goals_made,
        g.points, 
        g.home_away
    FROM "Games" g
	WHERE "player_id"=1628386
"""



df = pd.read_sql(query, engine)


df['opponent'] = df['matchup'].apply(lambda x: x.split()[-1])

df2 = pd.read_sql(queryTwo, engine)




df = df.dropna()
df2 = df2.dropna()





encoded_opponents = pd.get_dummies(df['opponent'], prefix='opponent')
df = pd.concat([df, encoded_opponents], axis=1).drop('opponent', axis=1)
df[encoded_opponents.columns] = df[encoded_opponents.columns].astype(int)

#df.info()

#print(df.describe())









X = df.drop(columns=['points','player_name','opponent_defensive_rating','opponent_pace_factor','matchup','field_goals_three_made'])
y = df['points']

print(X)





X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

feature_names = X.columns


scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
X_test_scaled = pd.DataFrame(X_test_scaled, columns=X_test.columns)






model = LinearRegression()

# Train the model on the scaled data
model.fit(X_train_scaled, y_train)

y_pred = model.predict(X_test_scaled)



coefficients = model.coef_
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
rmse = root_mean_squared_error(y_test, y_pred)
print(f'R-squared (R²): {r2}')
print(f'Mean Absolute Error (MAE): {mae}')
print(f'Root Mean Squared Error (RMSE): {rmse}')

print(coefficients)


coef_df = pd.DataFrame({
    'Feature': feature_names,
    'Coefficient': coefficients
})

print(coef_df)





df2['rolling_avg_min_played'] = df2['minutes_played'].rolling(window=10).mean()
df2['rolling_avg_ft_made'] = df2['free_throws_made'].rolling(window=10).mean()
df2['rolling_avg_fg_made'] = df2['field_goals_made'].rolling(window=10).mean()

predictionDF = df2[['rolling_avg_min_played','rolling_avg_ft_made','rolling_avg_fg_made']]

avergae_min_played = predictionDF.iloc[9, 0]
avergae_ft_made = predictionDF.iloc[9, 1]
avergae_fg_made = predictionDF.iloc[9, 2]
print(predictionDF)
print(avergae_min_played)
print(avergae_ft_made)
print(avergae_fg_made)


nba_teams = [
    'ATL', 'BKN', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW',
    'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK',
    'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'
]





upcoming_game_data = {
    'minutes_played': avergae_min_played,
    'field_goals_made':avergae_fg_made,
    'free_throws_made': avergae_ft_made,
    'home_away': 1
}

for team in nba_teams:
    upcoming_game_data[f'opponent_{team}'] = 1 if team == 'WAS' else 0  # change if team for correct team








upcoming_game_df = pd.DataFrame([upcoming_game_data],columns=X_train.columns)




upcoming_game_scaled = scaler.transform(upcoming_game_df)
upcoming_game_scaled_df = pd.DataFrame(upcoming_game_scaled, columns=X_train.columns)

# Make prediction
predicted_points = model.predict(upcoming_game_scaled_df)

print(f"Predicted Points for Upcoming Game: {predicted_points[0]}")














