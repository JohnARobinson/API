const express = require('express');
const app = express();
//const PORT = 8080;

app.use(express.json());

//app.get()
//app.post()
//app.put()
//app.delete()

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([courses]);
});

//app.get('/api/courses/:id', (req, res) => {
//   res.send(req.params.id);
//});

//app.get('/api/posts/:year/:month', (req, res) => {
 //   res.send(req.params);
 //});

 app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("course id was not found");
    res.send(course);
 });

 app.post('/api/courses', (req,res) =>{

    if(!req.body.name || req.body.name.length <3)
    {
        res.status(400).send("Name is required to be at least 3 char")
        return;
    }


    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
 });

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

