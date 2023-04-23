const express = require("express");
const router = require("express").Router();
const { Users, Conversations, Messages } = require("../models");

//Create a new Conversation
const newConvo = async (req, res) => {
  const groupChatName = req.body.groupTitle;
  console.log(groupChatName);
  try {
    const newConversation = await Conversations.create({
      conversation_id: req.params.conversation_id,
      conversation_name: groupChatName,
    });
    console.log(
      "New Conversation Created: ${newConversation.conversation_name}"
    );
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
};

//***Load Group Chat Page */
const getChatbyId = async (req, res) => {
  const conversationId = req.params.id;
  console.log(conversationId);
  try {
    const conversationData = await Conversations.findByPk(conversationId, {
      raw: true,
    });
    console.log(conversationData);
    res.render("private/groupchat", {
      conversation: conversationData,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
};

// Send a chat message
const sendMessage = async (req, res) => {
  const conversationId = req.body.conversation_id;
  const senderId = req.session.user_id;
  const message = req.body.message;

  // Create the message and associate it with the conversation
  const createdMessage = await Messages.create({
    message_text: message,
    sender: senderId,
  });
  const conversation = await Conversations.findByPk(conversationId);
  await conversation.addMessage(createdMessage);

  res.redirect("/dashboard");
};

module.exports = {
  newConvo,
  getChatbyId,
  sendMessage,
};

/*  we aren't referring to users anywhere on this page,
we might not need to deconstruct it's model here */
