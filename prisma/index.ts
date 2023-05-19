import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.create({
        data: {
            email: email,
            password: password,
        },
    });
    res.json(user);
});

app.post("/createManySessions", async (req: Request, res: Response) => {
    const { sessionList } = req.body;
    const sessions = await prisma.session.createMany({
        data: sessionList
    });
    res.json(sessions);
});


app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: { sessions: true },
    });
    res.json(users);
});

app.get("/byId/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id),
        },
    });
    res.json(user);
});

app.put("/", async (req: Request, res: Response) => {
    const { id, email } = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data:{
            email: email,
        },
    });
    res.json(updatedUser);
});

app.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const deletedUser = await prisma.user.delete({
        where: {
           id: Number(id), 
        },
    }); 
    res.json(deletedUser);   
});


app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
});