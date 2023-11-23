//import mongo collections, bcrypt and implement the following data functions

import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import {users} from '../config/mongoCollections.js';
import helpers from '../helpers.js'

export const registerUser = async (firstName, lastName, emailAddress, password, role) => {
  // Using helper functions for validation
  helpers.isValidString(firstName, 'First Name', 2);
  helpers.isValidString(lastName, 'Last Name', 2);
  helpers.isValidEmail(emailAddress);
  helpers.isValidPassword(password);
  helpers.isValidRole(role);

  const normalizedEmail = emailAddress.toLowerCase();
  const usersCollection = await users();
  const existingUser = await usersCollection.findOne({ emailAddress: normalizedEmail });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const newUserId = new ObjectId();
  const insertResult = await usersCollection.insertOne({
    _id: newUserId,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailAddress: normalizedEmail,
    password: hash,
    role: role.toLowerCase()
  });

  if (!insertResult.insertedId) {
    throw new Error('Error inserting user');
  }

  return { insertedUser: true };
};

export const loginUser = async (emailAddress, password) => {
  // Using helper functions for validation
  helpers.isValidEmail(emailAddress);
  helpers.isValidPassword(password);

  const normalizedEmail = emailAddress.toLowerCase();
  const usersCollection = await users();
  const user = await usersCollection.findOne({ emailAddress: normalizedEmail });
  if (!user) {
    throw new Error('Email address does not have an account'); 
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password'); 
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    role: user.role
  };
};
