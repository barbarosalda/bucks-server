import { NextFunction, Request, Response } from 'express';
import firebase from '../../firebase'
import Task from '../models/TaskModal'
import TaskInterface from '../models/TaskModal'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);


export const createTask = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'task'), data);
      res.status(200).send('task created successfully');
    } catch (error : any) {
      res.status(400).send(error.message);
    }
};


export const getTasks = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const tasks = await getDocs(collection(db, 'tasks'));
      const tasksArray : Task[] = [];
  
      if (tasks.empty) {
        res.status(400).send('No Tasks found');
      } else {
        tasks.forEach((doc) => {
          const task = new Task({...doc.data()});
          tasksArray.push(task);
        });
  
        res.status(200).send(tasksArray);
      }
    } catch (error : any) {
      res.status(400).send(error.message);
    }
  };

  export const getTask = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const id = req.params.id;
      const task = doc(db, 'tasks', id);
      const data = await getDoc(task);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('task not found');
      }
    } catch (error : any) {
      res.status(400).send(error.message);
    }
  };

  export const updateTask = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const task = doc(db, 'tasks', id);
      await updateDoc(task, data);
      res.status(200).send('task updated successfully');
    } catch (error : any) {
      res.status(400).send(error.message);
    }
  };


  export const deleteTask = async (req : Request, res : Response, next : NextFunction) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'tasks', id));
      res.status(200).send('task deleted successfully');
    } catch (error : any) {
      res.status(400).send(error.message);
    }
  };