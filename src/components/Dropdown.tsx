import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Dropdown = () => {
return (
  <DropdownMenu>
  <DropdownMenuTrigger>
      <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>CR</AvatarFallback>
      </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
  </DropdownMenu>
)
}

export default Dropdown