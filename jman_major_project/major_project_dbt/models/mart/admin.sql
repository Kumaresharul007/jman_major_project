{{
    config(
        tags=['mart']
    )
}}

WITH

admin_data AS (

    SELECT

        id,
        username,
        password

    FROM {{ ref("stg_admin") }}

)

SELECT * FROM admin_data