DROP TABLE IF EXISTS program_technology;
CREATE TABLE program_technology (
    program_id INTEGER,
    technology_id INTEGER
);

DROP TABLE IF EXISTS implementing_sector;
CREATE TABLE implementing_sector (
    id INTEGER,
    name TEXT,
    active INTEGER
);

DROP TABLE IF EXISTS program;
CREATE TABLE program (
    id INTEGER,
    state_id INTEGER,
    is_entire_state INTEGER,
    implementing_sector_id INTEGER,
    program_category_id INTEGER,
    program_type_id INTEGER,
    created_by_user_id INTEGER,
    code TEXT,
    name TEXT,
    updated_ts TIMESTAMP,
    created_ts TIMESTAMP,
    published INTEGER,
    websiteurl TEXT,
    administrator TEXT,
    fundingsource TEXT,
    budget TEXT,
    start_date TIMESTAMP,
    start_date_text TEXT,
    end_date TIMESTAMP,
    end_date_text TEXT,
    summary TEXT,
    additional_technologies TEXT,
    fromSir INTEGER
);

DROP TABLE IF EXISTS program_sector;
CREATE TABLE program_sector (
    program_id INTEGER,
    sector_id INTEGER
);

DROP TABLE IF EXISTS state_info_content;
CREATE TABLE state_info_content (
    id INTEGER,
    state_id INTEGER,
    introduction TEXT,
    history TEXT,
    renewable_portfolio_standard TEXT,
    organizations TEXT,
    programs TEXT,
    footnotes TEXT
);

DROP TABLE IF EXISTS technology_category;
CREATE TABLE technology_category (
    id INTEGER,
    name TEXT,
    energy_category_id INTEGER
);

DROP TABLE IF EXISTS parameter;
CREATE TABLE parameter (
    id INTEGER,
    parameter_set_id INTEGER,
    source TEXT,
    qualifier TEXT,
    amount REAL,
    units TEXT
);

DROP TABLE IF EXISTS program_detail_template;
CREATE TABLE program_detail_template (
    id INTEGER,
    type_id INTEGER,
    label TEXT,
    display_order INTEGER
);

DROP TABLE IF EXISTS program_detail;
CREATE TABLE program_detail (
    id INTEGER,
    program_id INTEGER,
    label TEXT,
    value TEXT,
    display_order INTEGER,
    template_id INTEGER
);

DROP TABLE IF EXISTS sector;
CREATE TABLE sector (
    id INTEGER,
    name TEXT,
    fieldname TEXT,
    is_selectable INTEGER,
    parent_id INTEGER
);

DROP TABLE IF EXISTS technology;
CREATE TABLE technology (
    id INTEGER,
    name TEXT,
    technology_category_id INTEGER,
    active INTEGER
);

DROP TABLE IF EXISTS state;
CREATE TABLE state (
    id INTEGER,
    abbreviation TEXT,
    name TEXT,
    is_territory INTEGER
);

DROP TABLE IF EXISTS parameter_set;
CREATE TABLE parameter_set (
    id INTEGER,
    program_id INTEGER
);

DROP TABLE IF EXISTS program_category;
CREATE TABLE program_category (
    id INTEGER,
    name TEXT
);

DROP TABLE IF EXISTS utility_zipcode;
CREATE TABLE utility_zipcode (
    utility_id INTEGER,
    zipcode_id INTEGER
);

DROP TABLE IF EXISTS county;
CREATE TABLE county (
    id INTEGER,
    name TEXT,
    state_id INTEGER
);

DROP TABLE IF EXISTS parameter_set_sector;
CREATE TABLE parameter_set_sector (
    sector_id INTEGER,
    set_id INTEGER
);

DROP TABLE IF EXISTS export;
CREATE TABLE export (
    id INTEGER,
    key TEXT,
    created_ts TIMESTAMP,
    type TEXT,
    size INTEGER
);

DROP TABLE IF EXISTS city;
CREATE TABLE city (
    id INTEGER,
    name TEXT,
    state_id INTEGER
);

DROP TABLE IF EXISTS program_city;
CREATE TABLE program_city (
    program_id INTEGER,
    city_id INTEGER
);

DROP TABLE IF EXISTS energy_category;
CREATE TABLE energy_category (
    id INTEGER,
    name TEXT
);

DROP TABLE IF EXISTS authority;
CREATE TABLE authority (
    id INTEGER,
    program_id INTEGER,
    "order" INTEGER,
    code TEXT,
    website TEXT,
    enacted TIMESTAMP,
    enactedtext TEXT,
    effective TEXT,
    effectivetext TEXT,
    expired TIMESTAMP,
    expiredtext TEXT,
    file_key TEXT,
    file_name TEXT
);

DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
    id INTEGER,
    created_ts TIMESTAMP,
    updated_ts TIMESTAMP,
    first_name TEXT,
    last_name TEXT,
    organization_name TEXT,
    web_visible_default INTEGER,
    phone TEXT,
    email TEXT,
    website_url TEXT,
    address TEXT,
    city TEXT,
    state_id REAL,
    zip TEXT
);

DROP TABLE IF EXISTS program_contact;
CREATE TABLE program_contact (
    id INTEGER,
    program_id INTEGER,
    contact_id INTEGER,
    webvisible INTEGER
);

DROP TABLE IF EXISTS parameter_set_technology;
CREATE TABLE parameter_set_technology (
    technology_id INTEGER,
    set_id INTEGER
);

DROP TABLE IF EXISTS program_county;
CREATE TABLE program_county (
    program_id INTEGER,
    county_id INTEGER
);

DROP TABLE IF EXISTS subscription_memo;
CREATE TABLE subscription_memo (
    id INTEGER,
    program_id INTEGER,
    added_by_user INTEGER,
    added TEXT,
    memo TEXT
);

DROP TABLE IF EXISTS utility;
CREATE TABLE utility (
    id INTEGER,
    name TEXT,
    state_id INTEGER,
    utility_id INTEGER
);

DROP TABLE IF EXISTS zipcode;
CREATE TABLE zipcode (
    id INTEGER,
    zipcode INTEGER,
    city_id INTEGER,
    state_id INTEGER,
    county_id INTEGER,
    latitude INTEGER,
    longitude INTEGER
);

DROP TABLE IF EXISTS program_utility;
CREATE TABLE program_utility (
    program_id INTEGER,
    utility_id INTEGER
);

DROP TABLE IF EXISTS program_zipcode;
CREATE TABLE program_zipcode (
    program_id INTEGER,
    zipcode_id INTEGER
);

DROP TABLE IF EXISTS program_type;
CREATE TABLE program_type (
    id INTEGER,
    name TEXT,
    program_category_id INTEGER
);

SELECT program.id,program.name,
state.name AS state_name,
program.websiteurl,
program_type.name AS program_type_name,
program_category.name AS program_category_name,
program.start_date,
program.end_date 
FROM program
JOIN state on program.state_id = state.id
JOIN program_type on program.program_type_id = program_type.id
JOIN program_category on program.program_category_id = program_category.id;

                SELECT 
                    program.id, 
                    program.name, 
                    program.summary AS program_summary,
                    program.websiteurl, 
                    program_type.name AS program_type_name, 
                    program_category.name AS program_category_name,
                    program.start_date, 
                    program.end_date,
                                                      
                    technology.name AS technology_name,
                                                      
                    city.name AS city_name,
                    county.name AS county_name,
                    state.name AS state_name, 
                    zipcode.zipcode AS zipcode,

                    authority.name AS authority_name,
                    authority.code AS authority_code,
                    authority.websiteurl AS authority_websiteurl,
                    authority.effective_date AS authority_effective_date,
                    authority.effective_text AS authority_effective_text,
                    authority.expired_text AS authority_expired_text,
                    authority.expired_date AS authority_expired_date,
                                                      
                    utility.name AS utility_name

                FROM program
                JOIN state on program.state_id = state.id
                JOIN program_type on program.program_type_id = program_type.id
                JOIN program_category on program.program_category_id = program_category.id
                JOIN program_technology on program.id = program_technology.program_id
                JOIN technology on program_technology.technology_id = technology.id
                JOIN program_city on program.id = program_city.program_id
                JOIN city on program_city.city_id = city.id
                JOIN county on program.county_id = county.id
                JOIN authority on program.id = authority.program_id
                Join program_utility on program.id = program_utility.program_id
                JOIN utility on utility_program.utility_id = utility.id
                JOIN program_zipcode on program.id = program_zipcode.program_id
                JOIN zipcode on program_zipcode.zipcode_id = zipcode.id
                WHERE program.id = {id};










SELECT * FROM program WHERE id = 8;

SELECT 
    program.id, 
    program.name, 
    program.summary AS program_summary,
    program.websiteurl, 
    program_type.name AS program_type_name, 
    program_category.name AS program_category_name,
    program.start_date, 
    program.end_date,                                            
    technology.name AS technology_name,                                            
    city.name AS city_name,
    county.name AS county_name,
    state.name AS state_name, 
    zipcode.zipcode AS zipcode,
    authority.code AS authority_code,
    authority.website AS authority_websiteurl,
    authority.effective AS authority_effective_date,
    authority.effectivetext AS authority_effective_text,
    authority.expired AS authority_expired_date,                              
    authority.expiredtext AS authority_expired_text,
    utility.name AS utility_name
FROM program
JOIN state ON program.state_id = state.id
JOIN program_type ON program.program_type_id = program_type.id
JOIN program_category ON program.program_category_id = program_category.id
JOIN program_technology ON program.id = program_technology.program_id
JOIN technology ON program_technology.technology_id = technology.id
JOIN program_city ON program.id = program_city.program_id
JOIN city ON program_city.city_id = city.id
JOIN program_county ON program.id = program_county.program_id
JOIN county ON program_county.county_id = county.id
JOIN authority ON program.id = authority.program_id
JOIN program_utility ON program.id = program_utility.program_id
JOIN utility ON program_utility.utility_id = utility.id
JOIN program_zipcode ON program.id = program_zipcode.program_id
JOIN zipcode ON program_zipcode.zipcode_id = zipcode.id
WHERE program.id = 8;











-- many to one program
technology.name AS technology_name,
JOIN program_technology ON program.id = program_technology.program_id
JOIN technology ON program_technology.technology_id = technology.id



-- works in psql
SELECT 
    program.id,
    program.name,
    program.summary AS program_summary,
    program.websiteurl,
    program.start_date,
    program.end_date,
    program_type.name AS program_type_name,
    program_category.name AS program_category_name,
    authority.code AS authority_code,
    authority.website AS authority_websiteurl,
    authority.effective AS authority_effective_date,
    authority.effectivetext AS authority_effective_text,
    authority.expired AS authority_expired_date,                             
    authority.expiredtext AS authority_expired_text,
    city.name AS city_name,
    county.name AS county_name,
    state.name AS state_name,
    zipcode.zipcode AS zipcode,
    utility.name AS utility_name
FROM program
LEFT JOIN program_type ON program.program_type_id = program_type.id
LEFT JOIN program_category ON program.program_category_id = program_category.id
LEFT JOIN authority ON program.id = authority.program_id
LEFT JOIN state ON program.state_id = state.id
LEFT JOIN program_utility ON program.id = program_utility.program_id  -- LEFT JOIN to include programs without utilities
LEFT JOIN utility ON program_utility.utility_id = utility.id  -- LEFT JOIN to handle cases where there is no utility
LEFT JOIN program_county ON program.id = program_county.program_id
LEFT JOIN county ON program_county.county_id = county.id
LEFT JOIN program_city ON program.id = program_city.program_id
LEFT JOIN city ON program_city.city_id = city.id
LEFT JOIN program_zipcode ON program.id = program_zipcode.program_id
LEFT JOIN zipcode ON program_zipcode.zipcode_id = zipcode.id
WHERE program.id = 8;



-- view creation
CREATE VIEW program_view AS
SELECT 
    program.id AS program_id,
    program.name AS program_name,
    program.summary AS program_summary,
    program.websiteurl AS program_websiteurl,
    program.start_date,
    program.end_date,
    program_type.name AS program_type_name,
    program_category.name AS program_category_name,
    authority.id AS authority_id, -- Example of aliasing to avoid duplicate column names
    authority.code AS authority_code,
    authority.website AS authority_websiteurl,
    authority.effective AS authority_effective_date,
    authority.effectivetext AS authority_effective_text,
    authority.expired AS authority_expired_date,
    authority.expiredtext AS authority_expired_text,
    state.name AS state_name,
    utility.name AS utility_name,
    county.name AS county_name,
    city.name AS city_name,
    zipcode.zipcode
FROM program
LEFT JOIN program_type ON program.program_type_id = program_type.id
LEFT JOIN program_category ON program.program_category_id = program_category.id
LEFT JOIN authority ON program.id = authority.program_id
LEFT JOIN state ON program.state_id = state.id
LEFT JOIN program_utility ON program.id = program_utility.program_id
LEFT JOIN utility ON program_utility.utility_id = utility.id
LEFT JOIN program_county ON program.id = program_county.program_id
LEFT JOIN county ON program_county.county_id = county.id
LEFT JOIN program_city ON program.id = program_city.program_id
LEFT JOIN city ON program_city.city_id = city.id
LEFT JOIN program_zipcode ON program.id = program_zipcode.program_id
LEFT JOIN zipcode ON program_zipcode.zipcode_id = zipcode.id;


 program_id |        program_name        |                                                                                                                                                                                                                     program_summary                                                                                                                                                                                                                     | program_websiteurl | start_date | end_date |    program_type_name     | program_category_name | authority_id |         authority_code         |                                                    authority_websiteurl                                                     | authority_effective_date | authority_effective_text | authority_expired_date | authority_expired_text | state_name | utility_name | county_name | city_name | zipcode
------------+----------------------------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+--------------------+------------+----------+--------------------------+-----------------------+--------------+--------------------------------+-----------------------------------------------------------------------------------------------------------------------------+--------------------------+--------------------------+------------------------+------------------------+------------+--------------+-------------+-----------+---------
          8 | Kansas Solar Easement Laws | <p><span>Parties may voluntarily enter into solar easement contracts for the purpose of ensuring adequate exposure of a solar energy system. An easement must be expressed in writing and recorded with the register of deeds for that county.</span><br/></p><p></p><p>The written agreement must contain a description of the airspace in question and any term and/or conditions under which the solar easement is granted or terminated.</p><p></p> |                    |            |          | Solar/Wind Access Policy | Regulatory Policy     |          268 | Kansas Statute 58-3801 et seq. | https://www.ksrevisor.org/statutes/chapters/ch58/058_038_0001.html#:~:text=58%2D3801.,by%20such%20easement%20is%20situated. |                          |                          |                        |                        | Kansas     |              |             |           |





program.name,
program.summary AS program_summary,

authority.effective AS authority_effective_date,
authority.effectivetext AS authority_effective_text,
authority.expired AS authority_expired_date,                             
authority.expiredtext AS authority_expired_text,
program.start_date,
program.end_date,

program_type.name AS program_type_name,
program_category.name AS program_category_name,


            {/* {descriptionHTML && <Typography variant="body1">{descriptionHTML}</Typography>} */}
            {/* <div dangerouslySetInnerHTML={{ __html: cleanHTML }} /> */}

"dompurify": "^3.0.8",
"react": "^17.0.0 || ^18.0.0",
"react-dom": "^17.0.0 || ^18.0.0",