import mongoose from "mongoose";

export const posts = [
    {
      _id: new mongoose.Types.ObjectId(),
      userId: "64cba13f5271c77278d3e67f",
      firstName: "Manish",
      lastName: "Rai",
      location: "New York, CA",
      description: "Some really long random description",
      videoPath: "Download.mp4",
      // userPicturePath: "p3.jpeg",
      likes: new Map([
      ]),
      comments: [
        "random comment",
        "another random comment",
        "yet another random comment",
      ],
    },
]