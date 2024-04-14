{{
    config(
        tags=['basic', 'staging']
    )
}}

WITH

required_fields AS (

    SELECT

        id,
        email,
        designation,
        training_name,
        score

    FROM {{ source('etms', 'assessments') }}

)

SELECT * FROM required_fields