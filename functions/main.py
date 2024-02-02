# Deploy with `firebase deploy`
import psycopg2

from firebase_admin import initialize_app
from firebase_functions import https_fn
from firebase_functions.params import SecretParam
from google.cloud.sql.connector import Connector
import sqlalchemy

initialize_app()

PROTOTYPING_DB_PW = SecretParam('PROTOTYPING_DB_PW')

@https_fn.on_call(secrets=[PROTOTYPING_DB_PW])
def get_programs(request: https_fn.CallableRequest):
    try: 
        db_user = 'postgres'
        db_name = 'dsire'
        db_pass = PROTOTYPING_DB_PW.value
        db_connection_name = "double-runway-412322:us-west1:prototyping-db"

        # initialize Connector object
        connector = Connector()

        # function to return the database connection object
        def getconn():
            conn = connector.connect(
                db_connection_name,
                "pg8000",
                user=db_user,
                password=db_pass,
                db=db_name
            )
            return conn

        # create connection pool with 'creator' argument to our connection object function
        pool = sqlalchemy.create_engine(
            "postgresql+pg8000://",
            creator=getconn,
        )
        with pool.connect() as db_conn:
            # query and fetch ratings table
            results = db_conn.execute(sqlalchemy.text("""
                SELECT 
                    program.id, 
                    program.name, 
                    state.name AS state_name, 
                    program.websiteurl, 
                    program_type.name AS program_type_name, 
                    program_category.name AS program_category_name,
                    program.start_date, 
                    program.end_date 
                FROM program
                JOIN state on program.state_id = state.id
                JOIN program_type on program.program_type_id = program_type.id
                JOIN program_category on program.program_category_id = program_category.id
                WHERE program.published = 1;
            """)).fetchall()
            rows = [list(row) for row in results]
            return {"programs": rows}
    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )

