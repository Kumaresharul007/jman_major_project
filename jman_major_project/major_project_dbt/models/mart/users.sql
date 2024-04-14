{{
    config(
        tags=['mart']
    )
}}

WITH

users AS (
    SELECT 
    SUM(CASE WHEN designation = 'Employee' THEN 1 ELSE 0 END) AS total_employees,
    SUM(CASE WHEN designation = 'Intern' THEN 1 ELSE 0 END) AS total_interns,
    SUM(CASE WHEN designation = 'Employee' AND NEW_USER = TRUE THEN 1 ELSE 0 END) AS new_users_in_employees,
    SUM(CASE WHEN designation = 'Intern' AND NEW_USER = TRUE THEN 1 ELSE 0 END) AS new_users_in_interns
    FROM 
        {{ ref("stg_users") }}
)

SELECT * FROM users
