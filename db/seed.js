const {
  Conversations,
  Messages,
  UserConversations,
  Users,
} = require("../models/index");
const db = require("./connection");

db.sync({ force: true }).then(() => {
  Conversations.bulkCreate([{}]).then(() => {
    console.log("Conversations seeded!");
    process.exit();
  });

  Messages.bulkCreate([{}]).then(() => {
    console.log("Messages seeded!");
    process.exit();
  });
  UserConversations.bulkCreate([{}]).then(() => {
    console.log("User Conversations seeded!");
    process.exit();
  });
  Users.bulkCreate([
    {
      username: "Bob",
      password: "woeifwefwef",
      email: "owiejfwef@woefijwef.com",
      created_at: "Tuesday",
    },
    {
      username: "Jimmy",
      password: "wikuiuikef",
      email: "owsaedfwefef@woefiyiuluibvf.com",
      created_at: "Wednesday",
    },
  ]).then(() => {
    console.log("Users seeded!");
    process.exit();
  });
});

db.sync({ force: true }).then(() =>
  Promise.all([
    Conversations.bulkCreate([{}]),
    Messages.bulkCreate([{}]),
    UserConversations.bulkCreate([{}]),
    Users.bulkCreate([{}]),
    {
      username: "Bob",
      password: "woeifwefwef",
      email: "owiejfwef@woefijwef.com",
      created_at: "Tuesday",
    },
    {
      username: "Jimmy",
      password: "wikuiuikef",
      email: "owsaedfwefef@woefiyiuluibvf.com",
      created_at: "Wednesday",
    },
  ])
);
