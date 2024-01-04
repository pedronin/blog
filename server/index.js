import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
  commentCreateValidation,
} from './validations.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import { PostController, UserController, CommentController } from './controllers/index.js';

mongoose
  .connect(
    'mongodb+srv://admin:Plumbum333@cluster0.eu0ww6u.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  fileName: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

// даем понять что такое json
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('www Hello Pedronin');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// когда загружем картинку
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    // вытаскиваю картинку и делаем валидный путь
    url: req.file.path.replace('\\', '/'),
    file: req.file,
  });
});

app.get('/posts/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);



app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);




app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.post(
  '/comments',
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  CommentController.create,
);
app.get('/comments/:id', CommentController.get);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Bce ok');
});
