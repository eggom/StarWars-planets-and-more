import requests
import json
import pandas as pd
import numpy as np

def get_planets_info():

    # Get data from API and build a list of dicts
    planets_lst = []
    for p in range(6):
        url = "https://swapi.dev/api/planets/?page="+str(p+1)
        response = requests.get(url).json()
        planets = response["results"]
        for planet in planets:
            planet["no_of_films"] = len(planet["films"])
            planet["no_of_residents"] = len(planet["residents"])
            planets_lst.append(planet)

    # Convert list of dicts into a DF
    planets_df = pd.DataFrame(planets_lst)

    # Clean and Wrangle planets_DF
    target_cols = ["name", "diameter", "population", "no_of_films", "no_of_residents"]
    planets_df = planets_df[target_cols]
    planets_df.replace("unknown",np.nan, inplace=True)
    planets_df.dropna(inplace=True)
    planets_df['diameter'] = planets_df['diameter'].astype('int64')
    planets_df['population'] = planets_df['population'].astype('int64')
    planets_df.reset_index(inplace=True)
    planets_df.drop(columns="index",inplace=True)

    return(planets_df)


def get_artifacts_info():

    # Get info from vehicles

    # Get data from API and build a list of dicts
    vehicles_lst = []
    for p in range(4):
        url = "https://swapi.dev/api/vehicles/?page="+str(p+1)
        response = requests.get(url).json()
        vehicles = response["results"]
        for vehicle in vehicles:
            vehicle["no_of_films"] = len(vehicle["films"])
            if len(vehicle["pilots"])>0:
                pilot_url = vehicle["pilots"][0]
                response = requests.get(pilot_url).json()
                vehicle["main_pilot"] = response["name"]
            else:
                vehicle["main_pilot"] = "No Pilot"
            vehicles_lst.append(vehicle)
    
    # Convert list of dicts into a DF
    vehicles_df = pd.DataFrame(vehicles_lst)
    
    # Clean and Wrangle vehicles_DF
    target_cols = ["name", "manufacturer", "crew", "passengers", "cargo_capacity", "vehicle_class", "main_pilot","no_of_films"]
    vehicles_df = vehicles_df[target_cols]
    vehicles_df.replace("unknown",np.nan, inplace=True)
    vehicles_df.dropna(inplace=True)
    vehicles_df["cargo_capacity"].replace("none",0, inplace=True)
    vehicles_df["crew"] = vehicles_df['crew'].astype('int64')
    vehicles_df["passengers"] = vehicles_df['passengers'].astype('int64')
    vehicles_df["cargo_capacity"] = vehicles_df['cargo_capacity'].astype('int64')
    vehicles_df.rename(columns={"vehicle_class":"artifact_class"}, inplace=True)
    vehicles_df["artifact"]="ve"
    vehicles_df.reset_index(inplace=True)
    vehicles_df.drop(columns="index",inplace=True)

    # Get info from starships
    starships_lst = []
    for p in range(4):
        url = "https://swapi.dev/api/starships/?page="+str(p+1)
        response = requests.get(url).json()
        starships = response["results"]
        for starship in starships:
            starship["no_of_films"] = len(starship["films"])
            if len(starship["pilots"])>0:
                pilot_url = starship["pilots"][0]
                response = requests.get(pilot_url).json()
                starship["main_pilot"] = response["name"]
            else:
                starship["main_pilot"] = "No Pilot"
            starships_lst.append(starship)

    # Convert list of dicts into a DF
    starships_df = pd.DataFrame(starships_lst)
    
    # Clean and Wrangle starships_DF
    target_cols = ["name", "manufacturer", "crew", "passengers", "cargo_capacity", "starship_class", "main_pilot","no_of_films"]
    starships_df = starships_df[target_cols]
    starships_df.replace("unknown",np.nan, inplace=True)
    starships_df.dropna(inplace=True)
    starships_df["cargo_capacity"].replace("none",0, inplace=True)
    starships_df["crew"] = starships_df["crew"].str.replace(',','')
    starships_df["passengers"] = starships_df["passengers"].str.replace(',','')
    starships_df.loc[0,"crew"]=30
    starships_df.loc[1,"passengers"]=0
    starships_df["crew"] = starships_df['crew'].astype('int64')
    starships_df["passengers"] = starships_df['passengers'].astype('int64')
    starships_df["cargo_capacity"] = starships_df['cargo_capacity'].astype('int64')
    starships_df.rename(columns={"starship_class":"artifact_class"}, inplace=True)
    starships_df["artifact"]="ss"
    starships_df.reset_index(inplace=True)
    starships_df.drop(columns="index",inplace=True)

    # Append both dataframes into one artifacts_DF
    artifacts_df = vehicles_df.append(starships_df, ignore_index=True)

    return(artifacts_df)