export interface SidebarData {
    user: User;
    navItems: Array<NavItem>
  }
  
  export interface User {
    name: string;
    lastName: string;
    imgUrl: string;
    profileUrl: string;
    position: string;
  }
  
  export interface NavItem {
    label: string;
    icon: any;
    url: string;
  }