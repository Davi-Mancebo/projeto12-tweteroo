import express from "express";

const app = express();

app.use(express.json());

const users = [];
const userPost = [];

app.post("/sign-up", (req, res) =>{
    if (!req.body?.username || !req.body?.avatar) {
        return res.status(400).send('Verifique os dados e tente novamente!');
    }

    const {username, avatar} = req.body;
    const newUser = { username, avatar }

    if (users.find(user => user.username === req.body?.username)) {
        return res.status(400).send('O usuário já existe!');
    }
    users.push(newUser);
    return res.status(201).send(users)
})

app.post("/tweets", (req, res) =>{
    let user = {}

    let image = ""

    if(users.find(user => user.username === req.body?.username)){
        user = users.find(user => user.username === req.body?.username)
        image = user.avatar
        console.log(`${image} é o usuario`)
    }
    if(!users.find(user => user.username === req.body?.username)){
        return res.status(401).send("UNAUTHORIZED")
      }

    const {username, tweet} = req.body;
    const newPost = {username, avatar: image, tweet}

    if(!req.body?.username || !req.body?.tweet){
        return res.status(400).send('Verifique os dados e tente novamente!');
    }



    userPost.push(newPost);


    res.status(201).send(userPost)
})
app.get('/tweets', (req, res) => {
    res.send(userPost.slice(-10))
})

app.listen(5000, () => {
    console.log('Server Open')
})
