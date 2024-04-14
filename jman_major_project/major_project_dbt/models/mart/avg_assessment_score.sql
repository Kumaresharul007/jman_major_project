{{
    config(
        tags=['mart']
    )
}}

WITH

avg_assessment_score AS (
    SELECT
    email,
    AVG(score) AS average_assessment_score
    FROM
        {{ ref("stg_assessments") }}
    GROUP BY
        email
    ORDER BY 
        average_assessment_score desc
)

SELECT * FROM avg_assessment_score
