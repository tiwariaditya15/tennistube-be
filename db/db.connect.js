const mongoose = require("mongoose");
// const { Video } = require("../models/video.model");
// const videos = require("./Videos");

function connectToAtlas(app) {
  mongoose
    .connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(process.env.PORT, () =>
        console.log("Server running at 5000.")
      );
    })
    .catch((error) => console.log({ error }));

  // videos.forEach(async (element) => {
  //   try {
  //     const video = await new Video(element);
  //     await video.save();
  //   } catch (error) {
  //     console.log(">>", error);
  //   }
  // });
}

module.exports = { connectToAtlas };
