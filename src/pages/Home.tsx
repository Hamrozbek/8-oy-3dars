import { CustomeTable } from "@/modules/CustomeTable"
import Header from "../modules/Header"
import { useQuery } from "@tanstack/react-query"
import { instance } from "@/hooks/instance"
import { Loader } from "lucide-react"

const Home = () => {

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => instance().get("/students").then(res => res.data)
  })

  console.log(students)

  return (
    <div>
      <Header />
      <div className="mt-5 w-[1200px] mx-auto">
        {isLoading ? <Loader /> : <CustomeTable data={students} />}
      </div>
    </div>
  )
}

export default Home
