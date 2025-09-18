import { Button } from "@/components/ui/button"
import { UserRoundPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navegate = useNavigate()

  return (
    <div className="bg-slate-900 p-5">
      <div className="containers flex justify-between items-center">
        <h2 className="font-bold text-[25px] text-white">Students</h2>
        <Button onClick={() => navegate("/create")} className="cursor-pointer" variant={"outline"}>
          <UserRoundPlus />
          Created
        </Button>
      </div>
    </div>
  )
}

export default Header
