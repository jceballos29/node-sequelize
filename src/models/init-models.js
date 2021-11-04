const DataTypes = require("sequelize").DataTypes;
const _conversations = require("./conversations");
const _messages = require("./messages");
const _participants = require("./participants");
const _users = require("./users");

function initModels(sequelize) {
  const conversations = _conversations(sequelize, DataTypes);
  const messages = _messages(sequelize, DataTypes);
  const participants = _participants(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  messages.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id"});
  conversations.hasMany(messages, { as: "messages", foreignKey: "conversation_id"});
  participants.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id"});
  conversations.hasMany(participants, { as: "participants", foreignKey: "conversation_id"});
  conversations.belongsTo(users, { as: "owner", foreignKey: "created_by"});
  users.hasMany(conversations, { as: "conversations", foreignKey: "created_by"});
  messages.belongsTo(users, { as: "sender", foreignKey: "sender_id"});
  users.hasMany(messages, { as: "messages", foreignKey: "sender_id"});
  participants.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(participants, { as: "participants", foreignKey: "user_id"});

  return {
    conversations,
    messages,
    participants,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
