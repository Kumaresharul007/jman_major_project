{{
    config(
        tags=['mart']
    )
}}

WITH

training_duration AS (
    SELECT training_name, no_of_days, designation
    FROM {{ ref("stg_training_plans") }}
    ORDER BY no_of_days desc
)

SELECT * FROM training_duration
