const database = require("../../database/databaseConfig.js");

// UPDATE/ EDIT A SONG (idValue, updatedObj)-> .one() -> use UPDATE, SET, WHERE and RETURNING keywords
async function updateSong(idValue, updatedObj) {
  if (!updatedObj.album && !updatedObj.time) {
    try {
      const updatedSong = await database.one(
        "UPDATE songs SET name = $2, artist = $3, is_favorite = $4 WHERE id = $1 RETURNING *",
        [
          idValue,
          updatedObj.name, 
          updatedObj.artist, 
          updatedObj.is_favorite
        ]
      );
      return updatedSong;
    } catch (err) {
      return err;
    }
  } else if (!updatedObj.album || !updatedObj.time) {
    if (!updatedObj.album) {
      try {
        const updatedSong = await database.one(
          "UPDATE songs SET name = $2, artist = $3, time = $4, is_favorite = $5 WHERE id = $1 RETURNING *",
          [
            idValue,
            updatedObj.name,
            updatedObj.artist,
            updatedObj.time,
            updatedObj.is_favorite,
          ]
        );
        return updatedSong;
      } catch (err) {
        return err;
      }
    } else if (!updatedObj.time) {
      try {
        const updatedSong = await database.one(
          "UPDATE songs SET name = $2, artist = $3, album = $4, is_favorite = $5 WHERE id = $1 RETURNING *",
          [
            idValue,
            updatedObj.name,
            updatedObj.artist,
            updatedObj.album,
            updatedObj.is_favorite,
          ]
        );
        return updatedSong;
      } catch (err) {
        return err;
      }
    }
  } else {
    try {
      const updatedSong = database.one(
        "UPDATE songs SET name = $2, artist = $3, album = $4, time = $5, is_favorite = $6 WHERE id = $1 RETURNING *",
        [
          idValue,
          updatedObj.name,
          updatedObj.artist,
          updatedObj.album,
          updatedObj.time,
          updatedObj.is_favorite,
        ]
      );

      return updatedSong;
    } catch (err) {
      return err;
    }
  }
}

module.exports = { updateSong };
