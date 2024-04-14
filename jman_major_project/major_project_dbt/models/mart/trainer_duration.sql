{{
    config(
        tags=['mart']
    )
}}

WITH

trainer_duration AS (
    SELECT trainer_name, SUM(no_of_days) as total_training_duration, 
    ROUND(AVG(no_of_days),0) AS avg_training_duration
    FROM {{ ref("stg_training_plans") }}
    GROUP BY trainer_name
    ORDER BY total_training_duration desc
)

SELECT * FROM trainer_duration
