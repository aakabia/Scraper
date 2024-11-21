from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.static import players
from nba_api.stats.endpoints import commonplayerinfo
from nba_api.stats.endpoints import playergamelog
import pandas as pd
import json
import os
import time
import requests

# use nba API for nba data 
# os and json help us write data to a file 
# time for  adding delays (e.g., time.sleep) between retries in case of timeouts (not responsible for retry just delays execution)
# requests for handeling timeouts from  HTTP requests to fetch player career stats from an external API.
# pandas to use data frames and more



def get_player_career_stats():

    """
    Fetches career stats for active players and saves them to a CSV file.

    This function retrieves the list of active players from an API and fetches
    their career stats. The stats are saved to a CSV file located in the 
    'csv/active_players_career_stats.csv' directory. If the file already 
    exists, new stats are appended to the file with a header written only once.

    Retries up to 3 times in case of a timeout while fetching the stats for 
    each player, and handles any exceptions that might occur during the process.

    Writes:
        - Player career stats to a CSV file with headers written only once.
        - Adds a blank line between player entries for separation.

    Raises:
        - Exception: If any unexpected error occurs during the data retrieval
          or writing process.
    """




    try:

        player_dict = players.get_players()

        if not player_dict:
            print("No players returned from API")
            return
        
        # Above checks if we recieved data from API 

        active_player_ids_dict = [player for player in player_dict if player['is_active']]
        # Above filters active players to a new list 


        csv_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'csv','players','active_players_carrer_stats_2024.csv')
        os.makedirs(os.path.dirname(csv_directory), exist_ok=True)
        # Above is the path we make for our data file 

        file_exists = os.path.exists(csv_directory)
        # check if the file exists, use this for headers in csv file 



        if os.path.exists(csv_directory):
            os.remove(csv_directory)  # Delete the file if it exists
            print(f"{csv_directory} has been deleted and recreated.")
            file_exists = False
        else:
            print(f"{csv_directory} is being created.")
            file_exists = False 



        for player in active_player_ids_dict:
            player_id = player["id"]

            

            retries = 3
            # Outter loop loops of our active player dict and grabs player id 
            # sets our number of retries for each request
            for attempt in range(retries):
                # inner loop, loops over retries and calls the api for each retry

                try:


                    career_stats = playercareerstats.PlayerCareerStats(player_id=player_id,timeout=60)
                    stats_df = career_stats.get_data_frames()[0]

                    
                    stats_df['player_name'] = player['full_name']
                    season_stats = stats_df[stats_df['SEASON_ID'] == '2024-25']

                    if season_stats.empty:
                        print(f"No stats available for player {player['full_name']} in season 2024-25. Skipping...")
                        time.sleep(2)  
                        break


                    with open(csv_directory, 'a', newline='') as f:
                        season_stats.to_csv(f, header= not file_exists, index=False)
                        file_exists = True
                        f.write("\n")  # Add a blank line for separation
                        print(f"Stats saved for player {player['full_name']}")

                    time.sleep(2)
                    break
                # try block that calls the the API, creats a DataFrame for each player entry and appends that Dataframe to our file
                # sets file_exists to true  so we only recieve our headers once
                #  breaks out of inner loop to next iteration of outter loop if append is successful.
              
                except requests.exceptions.ReadTimeout:
                    if attempt < retries - 1:
                        print(f"Timeout occurred for player {player['full_name']}. Retrying... ({attempt + 1}/{retries})")
                        time.sleep(10)  # Wait for 5 seconds before retrying
                    else:
                        print(f"Max retries reached for player {player['full_name']}. Skipping.")

                #  Above, if a requests timeouts we check the atteamp we are on 
                # for the first two attempts we try again 
                # time.sleep waits 10 seconds before continuing to our nex iteration.
                # after last iteration we skip

                except Exception as e:
                    print(f"An error occurred for player {player['full_name']}: {e}")
                    break  # Break out of the retry loop if any other error occurs
               
                

        print(f"All active player career stats have been saved to {csv_directory}")


        

    except Exception as e:
        print(f"An error occurred: {e}")
        raise




def get_player_game_logs(year):
    """
    Fetches and saves the "year" game logs for all active NBA players for a given season.

    This function retrieves game logs for each active player using the NBA API and extracts 
    the last five games played, sorted by date in descending order. The data is then saved 
    into a CSV file.

    Parameters:
    year (string): The NBA season year (e.g., 2024 for the 2023-2024 season).

    Function Workflow:
    - Creates or appends to a CSV file in the 'csv/performance' directory.
    - Retrieves a list of active NBA players.
    - Iterates through each player and fetches their game logs.
    - Sorts the logs by game date and selects the last five games.
    - Handles potential request timeouts and retries up to three times for each player.
    - Saves the filtered game data into a CSV file.

    Raises:
    Exception: Re-raises any unexpected errors for further handling.

    Notes:
    - The 'GAME_DATE' column is formatted to the standard 'YYYY-MM-DD'.
    - The CSV includes the player's name and game log details.

    CSV File Structure:
    - The output CSV will be named 'players_last_five_{year}.csv' and saved in the 
      'csv/performance' directory.

    Example:
    >>> get_player_game_logs('2024')
    Saves a CSV file containing the last five games of active NBA players for the 2023-2024 season.

    """




    try:

        csv_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'csv','performance',f'players_{year}_stats.csv')
        os.makedirs(os.path.dirname(csv_directory), exist_ok=True)
        # Above is the path we make for our data file 

        file_exists = os.path.exists(csv_directory)
        # check if the file exists, use this for headers in csv file 



        player_dict = players.get_players()

        if not player_dict:
            print("No players returned from API")
            return
        
        # Above checks if we recieved data from API 

        active_player_dict = [player for player in player_dict if player['is_active']]
        # Above filters active players to a new list 

        if os.path.exists(csv_directory):
            os.remove(csv_directory)  # Delete the file if it exists
            print(f"{csv_directory} has been deleted and recreated.")
            file_exists = False 
        else:
            print(f"{csv_directory} is being created.")
            file_exists = False

        

        for player in active_player_dict:
            player_id = player["id"]

            retries = 3 

            for attempt in range (retries):
                try:
   
                   
                    game_log = playergamelog.PlayerGameLog(player_id=player_id, season=year, timeout=45)
                    game_log_df = game_log.get_data_frames()[0]

                    game_log_df['player_name'] = player['full_name']
                    game_log_df['GAME_DATE'] = pd.to_datetime(game_log_df['GAME_DATE'], format='%b %d, %Y')

                    last_five_games = game_log_df.sort_values(by='GAME_DATE', ascending=False)

                    # Above, uses  playergamelog.PlayerGameLog to get the last five games for a player 
                    # Also it organizes the games by date YYY-MM-DD

                    if last_five_games.empty:
                        print(f"No stats available for player {player['full_name']} in season 2024-25. Skipping...")
                        time.sleep(2)  
                        break

                   


                    with open(csv_directory, 'a', newline='') as f:
                        last_five_games.to_csv(f, header= not file_exists, index=False)
                        file_exists = True
                        f.write("\n")
                        print(f"{year} player gamelog saved for player {player['full_name']}")

                    time.sleep(2)
                        
                    break


                except requests.exceptions.ReadTimeout:
                    if attempt < retries - 1:
                        print(f"Timeout occurred for player {player['full_name']}. Retrying... ({attempt + 1}/{retries})")
                        time.sleep(10)  # Wait for 10 seconds before retrying
                    else:
                        print(f"Max retries reached for player {player['full_name']}. Skipping.")

                except Exception as e:
                    print(f"An error occurred for player {player['full_name']}: {e}")
                    break  # Break out of the retry loop if any other error occurs

    except Exception as e:
        print(f"An error occurred: {e}")
        raise

    print(f"All player logs for {year}  have been saved to {csv_directory}")




def getPlayerInfo():

    try:
        json_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'json','active_players.json')
        os.makedirs(os.path.dirname(json_directory), exist_ok=True)
        # Above is the path we make for our data file 

       
        player_dict = players.get_players()

        if not player_dict:
            print("No players returned from API")
            return
        
        # Above checks if we recieved data from API 

        active_player_dict = [player for player in player_dict if player['is_active']]
        # Above filters active players to a new list 

        results = []

        for player in active_player_dict:
            player_id = player["id"]

            retries = 3 

            for attempt in range (retries):
                try:
                    player_info = commonplayerinfo.CommonPlayerInfo(player_id=player_id ,timeout=45)

                    # Retrieve the data as a dictionary
                    player_dict = player_info.get_dict()

                    # Access the first dataset from 'resultSets'
                    common_info = player_dict['resultSets'][0]

                    # Extract the player's name, assuming it's in the 4th column of the first row

                    player_height = common_info['rowSet'][0][11]

                    player_weight = common_info['rowSet'][0][12]
                    player_position = common_info['rowSet'][0][15]
                    player_team_name = common_info['rowSet'][0][19]
                    player_team_abr = common_info['rowSet'][0][20]
                    

                    if not player_height and not player_weight and not player_position and not player_team_name and not player_team_abr:
                        break

                    player_dic = {
                        **player,
                        "player_height":player_height,
                        "player_weight":player_weight,
                        "player_position":player_position,
                        "player_team_name":player_team_name,
                        "player_team_abr":player_team_abr

                    }
                   
                    results.append(player_dic)
                    print(f" appended {player['full_name']} dict to results array!")
                   
                    break


                except requests.exceptions.ReadTimeout:
                    if attempt < retries - 1:
                        print(f"Timeout occurred for player {player['full_name']}. Retrying... ({attempt + 1}/{retries})")
                        time.sleep(15)  # Wait for 10 seconds before retrying
                    else:
                        print(f"Max retries reached for player {player['full_name']}. Skipping.")

                except Exception as e:
                    print(f"An error occurred for player {player['full_name']}: {e}")
                    break  # Break out of the retry loop if any other error occurs




        with open(json_directory, "w") as f:
            json.dump(results, f, indent=4) 


        print(f"All player info has been saved to {json_directory}")




    
    except Exception as e:
        print(f"An error occurred: {e}")
        raise


#get_player_career_stats()
get_player_game_logs("2024")







