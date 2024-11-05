from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.static import players
import json
import os

# use nba API for nba data 
# os and json help us write data to a file 


json_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'json','active_players.json')

# Above, uses os to get the absolute path of furrent directory and join it to the path of our file.


os.makedirs(os.path.dirname(json_directory), exist_ok=True)

# Above, checks if the directore exists and if it does we do nothing but if it doesnt we make it.


player_dict = players.get_players()

# Above, uses nba API to get all players from the nba 

active_players =[]

for player in player_dict: 
    if player['is_active'] == True:
        active_players.append(player)

# Above, we loop through our player_dict list and only append active players to our active_players =[] list 


with open(json_directory, "w") as f:
    json.dump(active_players, f, indent=4) 


# Above, write to a file path "json_directory" with "with open" and "json.dump".
# "f represents the file , active_players represents the item we want to write and indent=4 allows for spacing betwwen dictionaries "
# "w" stands for writing









# Example function to get game logs for a player over multiple seasons
"""def get_player_game_logs(player_id, start_season, end_season):
    game_logs = []
    for season in range(start_season, end_season + 1):
        game_log = playergamelog.PlayerGameLog(player_id=player_id, season=season).get_data_frames()[0]
        game_logs.append(game_log)
    return game_logs"""

#career = playercareerstats.PlayerCareerStats(player_id='203999') 





#print (career.get_data_frames()[0])



"""player_info = commonplayerinfo.CommonPlayerInfo(player_id='203999')
player_dict = player_info.get_dict()
common_info = player_dict['resultSets'][0]  # Access the first dataset
player_name = common_info['rowSet'][0][3] 
print(player_name)"""

