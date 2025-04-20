import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";

const Home = async ()=>{
    const result = await db.select().from(users);
    console.log(JSON.stringify(result, null, 2));
    return(
        <>
        <Button>Click Me</Button>
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        </>
    )

}


  


export default Home;