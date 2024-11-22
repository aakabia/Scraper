from sqlalchemy import create_engine
import pandas as pd
import os
from dotenv import load_dotenv
from sklearn.preprocessing import StandardScaler

load_dotenv()

scaler = StandardScaler()


db_username = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')



db_url = f'postgresql://{db_username}:{db_password}@localhost:5432/{db_name}'

engine = create_engine(db_url)

query = '''
SELECT 
     g.player_id,g.stat_year,g.player_name,g.game_date,g.matchup,
	 g.home_away,g.field_goals_made,g.field_goals_attempted,g.points,g.rebounds,g.assist,
    ts.defensive_rating AS opponent_defensive_rating, 
    ts.pace_factor AS opponent_pace_factor
FROM 
    "Games" g
JOIN 
    "AdvanceTeamStats" ts
ON 
    ts.team_abr = SPLIT_PART(g.MATCHUP, ' ', 3) -- Opponent team abbreviation
    AND ts.stat_year = g.stat_year -- Directly using the stat_year from the Games table
WHERE 
    g.player_id = 203500;
'''

df = pd.read_sql(query, engine)

df['rolling_avg_points'] = df['points'].rolling(window=5).mean()
df['rolling_avg_rebounds'] = df['rebounds'].rolling(window=5).mean()
df['rolling_avg_assists'] = df['assist'].rolling(window=5).mean()
df['rolling_avg_fgm'] = df['field_goals_made'].rolling(window=5).mean()
df['rolling_avg_fga'] = df['field_goals_attempted'].rolling(window=5).mean()
df.dropna(subset=['rolling_avg_points', 'rolling_avg_rebounds', 'rolling_avg_assists','rolling_avg_fgm','rolling_avg_fga' ], inplace=True)

# claculate rolling averages above 


columns_to_standardize = [
    'points', 'field_goals_made', 'field_goals_attempted', 'rebounds', 'assist', 
    'opponent_defensive_rating', 'opponent_pace_factor',
    'rolling_avg_points', 'rolling_avg_rebounds', 'rolling_avg_assists', 
    'rolling_avg_fgm', 'rolling_avg_fga'
]


df[columns_to_standardize] = scaler.fit_transform(df[columns_to_standardize])

# standardization important before testing in machine learning above


# Show the DataFrame with the rolling average added

pd.set_option('display.max_rows', 10)  # Limit the rows displayed (e.g., 10 rows)
pd.set_option('display.max_columns', None)  # Limit the columns displayed (e.g., 5 columns)

# Set the width of the display (this prevents columns from being wrapped)
pd.set_option('display.width', 100)

# Set the maximum number of characters per column (useful for text-heavy columns)
pd.set_option('display.max_colwidth', 20)




print(df)