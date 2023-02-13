#########################################################################
##                                                                     ##
##   0. Imports                                                        ##
##                                                                     ##
#########################################################################

# 0.1 Import Flask, jsonify and render_template
from flask import Flask, jsonify, render_template, send_from_directory

# 0.2 Import our local functions to retrieve data from Starwars API
from sw_api import get_planets_info, get_artifacts_info

# 0.3 Import SQLAlchemy
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import Session

print("\n\n")
print("Server Dev Internal Debugging Prompts:\n")




#########################################################################
##                                                                     ##
##   3. Starting DB
##                                                                     ##
#########################################################################

db_path = "sqlite:///db/starwars.sql"
engine = create_engine(db_path)




#########################################################################
##                                                                     ##
##   5. Collect Data from SW API
##                                                                     ##
#########################################################################

# Collect planets and artifacts data
planets_df = get_planets_info()
print(f"Planet records collected: {len(planets_df)}")
planets_df.to_sql('planets', con=engine, if_exists='replace')

artifacts_df = get_artifacts_info()
print(f"Artifact records collected: {len(artifacts_df)}\n")
artifacts_df.to_sql('artifacts', con=engine, if_exists='replace')









#########################################################################
##                                                                     ##
##   10. Start Flask                                                   ##
##                                                                     ##
#########################################################################


# 10.1 Set app name as "app" and start Flask
app = Flask(__name__)



# 10.2 Define what to do when a user hits the index route
@app.route("/")
# Return static HTML file with JS code
# Ideally would serve from independent web server, but not practical in test environment
def home():
    return render_template ("index.html")


# 10.3 Define routes to create the APIs that will fed the JavaScript
@app.route("/api/planets-v1")
def planets_v1():
    session = Session(bind=engine)
    execute_string = "select * from planets"
    planets = engine.execute(execute_string).fetchall()
    session.close()
    
    planet_dict = {}
    for row in planets:
        planet_dict[row[0]] = ({
                                "name": row[1],
                                "diameter": row[2],
                                "population": row[3],
                                "no_of_films": row[4],
                                "no_of_residents": row[5]
                               })
    
    # Return dictionary as a JSON file for JS processing
    return(jsonify(planet_dict))

@app.route("/api/planets-v2")
def planets_v2():
    session = Session(bind=engine)
    execute_string = "select * from planets"
    planets = engine.execute(execute_string).fetchall()
    session.close()
    
    planet_lst = []
    for row in planets:
        planet_lst.append({
                                "name": row[1],
                                "diameter": row[2],
                                "population": row[3],
                                "no_of_films": row[4],
                                "no_of_residents": row[5]
                           })
    
    # Return dictionary as a JSON file for JS processing
    return(jsonify(planet_lst))

# 10.8 Define route for the planets viz
@app.route("/planets")
def linechart():
    return render_template ("planets.html")


# @app.route('/favicon.ico') 
# def favicon(): 
#    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='images/favicon.ico')

# 4. Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"


if __name__ == "__main__":
    app.run(debug=True)