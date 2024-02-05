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

"""
@param {Object} request - The request object.
{
    "id": <int>
}

@returns {Object} The response object.
e.g. {
    "data": {
        "program": {
            "authority_code": "Kansas Statute 58-3801 et seq.",
            "authority_effective_date": null,
            "authority_effective_text": null,
            "authority_expired_date": null,
            "authority_expired_text": null,
            "authority_id": 268,
            "authority_websiteurl": "https://www.ksrevisor.org/statutes/chapters/ch58/058_038_0001.html#:~:text=58%2D3801.,by%20such%20easement%20is%20situated.",
            "city_name": null,
            "county_name": null,
            "end_date": null,
            "id": 8,
            "name": "Kansas Solar Easement Laws",
            "program_category_name": "Regulatory Policy",
            "program_type_name": "Solar/Wind Access Policy",
            "start_date": null,
            "state_name": "Kansas",
            "summary": "<p><span>Parties may voluntarily enter into solar easement contracts for the purpose of ensuring adequate exposure of a solar energy system. An easement must be expressed in writing and recorded with the register of deeds for that county.</span><br/></p><p></p><p>The written agreement must contain a description of the airspace in question and any term and/or conditions under which the solar easement is granted or terminated.</p><p></p>",
            "utility_name": null,
            "websiteurl": null,
            "zipcode": null
        }
    }
}
"""
@https_fn.on_call(secrets=[PROTOTYPING_DB_PW])
def get_program(request: https_fn.CallableRequest):
    try: 
        program_id = request.data.get('id')
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
            results = db_conn.execute(sqlalchemy.text("""
                SELECT *
                FROM program_view
                WHERE program_id = {id};
            """.format(id=program_id))).fetchone()

            program_dict = program_to_dict(*results)
            return {"program": program_dict}
    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )

def program_to_dict(program_id ,program_name, program_summary , program_websiteurl , start_date , end_date ,program_type_name , program_category_name , authority_id , authority_code ,authority_websiteurl , authority_effective_date , authority_effective_text , authority_expired_date , authority_expired_text , state_name , utility_name , county_name , city_name , zipcode):
    return {
        "id": program_id,
        "name": program_name,
        "summary": program_summary,
        "websiteurl": program_websiteurl,
        "start_date": start_date,
        "end_date": end_date,
        "program_type_name": program_type_name,
        "program_category_name": program_category_name,
        "authority_id": authority_id,
        "authority_code": authority_code,
        "authority_websiteurl": authority_websiteurl,
        "authority_effective_date": authority_effective_date,
        "authority_effective_text": authority_effective_text,
        "authority_expired_date": authority_expired_date,
        "authority_expired_text": authority_expired_text,
        "state_name": state_name,
        "utility_name": utility_name,
        "county_name": county_name,
        "city_name": city_name,
        "zipcode": zipcode
    }


"""
@param {Object} request - The request object.
{
    "id": <int>
}

@returns {Object} The response object.
e.g. {
    "data": {
        "program_details": [
            {
                "display_order": 0,
                "id": 20881,
                "label": "Permit Fee Waiver / Reduction",
                "program_id": 4790,
                "template_id": 42,
                "value": null
            },
            {
                "display_order": 1,
                "id": 20882,
                "label": "Expedited Permitting Process",
                "program_id": 4790,
                "template_id": 43,
                "value": "Buildings designed to achieve LEED Silver Certification can qualify for expedited permits."
            },
            {
                "display_order": 2,
                "id": 20883,
                "label": "Density Bonus",
                "program_id": 4790,
                "template_id": 44,
                "value": null
            },
        ]
    }
}
"""
@https_fn.on_call(secrets=[PROTOTYPING_DB_PW])
def get_program_details(request: https_fn.CallableRequest):
    try: 
        program_id = request.data.get('id')
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
            results = db_conn.execute(sqlalchemy.text("""
                SELECT *
                FROM program_detail
                WHERE program_id = {id};
            """.format(id=program_id))).fetchall()

            rows = [program_details_to_dict(*row) for row in results]
            return {"program_details": rows}
    except Exception as e:
        print(e)
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.INTERNAL,
            message=(str(e))
        )
    
def program_details_to_dict(id, program_id, label, value, display_order, template_id):
    return {
        "id": id,
        "program_id": program_id,
        "label": label,
        "value": value,
        "display_order": display_order,
        "template_id": template_id
    }