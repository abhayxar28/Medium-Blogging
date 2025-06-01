import AddBlogComponent from "@/components/AddBlogComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Addblogs(){
    const session = await getServerSession(authOptions)
    return (
        <div>
            <AddBlogComponent session={session}/>
        </div>
    )
}