import { PrismaClient } from '@prisma/client'
import { fakerKO as faker } from '@faker-js/faker'

const prisma=new PrismaClient()

const CATEGORY = [
    'PLAN',
    'TASK',
    'DIARY'
]

const STATUS = [
    'start',
    'on process',
    'finish'
]

async function seedtUser (){
    Array.from({length:5}, (v,i)=>i).forEach(async()=>{
        const userData={
            name:faker.person.firstName()+faker.person.lastName(),
            email:faker.internet.email(),
            image:faker.image.avatar()
        }
        const res=await prisma.user.create({
            data:userData
        })
        console.log(res)
    })
}

async function seedPost (){
    const totalUsers = await prisma.user.findMany();

    if (totalUsers.length === 0) {
        console.warn("No users found in the database.  Cannot seed posts.");
        return; // Or throw an error if that's more appropriate for your use case
    }

    Array.from({ length: 5 }, (v, i) => i).forEach(async () => {
        const randomUserIndex = Math.floor(Math.random() * totalUsers.length);
        const randomUser = totalUsers[randomUserIndex];

        // Check if randomUser is defined (just in case, though the above check should prevent this)
        if (!randomUser) {
        console.error("Random user is undefined. This should not happen.");
        return;
        }

        const postData = {
        title: faker.lorem.words(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        status: STATUS[Math.floor(Math.random() * STATUS.length)],
        userId: randomUser.id,
        createdAt: faker.date.recent({ days: 5 }),
        };

        try {
        const res = await prisma.post.create({
            data: postData,
        });
        console.log(res);
        } catch (error) {
        console.error("Error creating post:", error); // Handle potential errors during post creation
        }
    });
}

async function main() {
    await seedtUser()
    await seedPost()
    //await seedFaq()
}

main()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.error(`Error in:`,e)
    await prisma.$disconnect()
    process.exit(1)
})