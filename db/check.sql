SELECT *
FROM "Player"
JOIN "Current_Season" ON "Player"."player_id" = "Current_Season"."player_id"
WHERE "Player"."player_id"  = 2544;