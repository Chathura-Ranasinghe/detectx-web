import { Link } from 'react-router-dom'

import { ModeToggle } from "./ui/Darkmode/mode-toggle";

import { Button } from "@/components/ui/button"

const Welcome = () => {
  return (
    <div>
      <Button asChild>
          <Link to="/home">Home</Link>
      </Button>
      <ModeToggle/>
    </div>
  )
}

export default Welcome