export interface AppBarData {
    Icons: Icons;
    notifications: Array<Notification>;
  }
  
  export interface Icons {
    vector: any;
    vectorList: any;
    arrowRigth: any;
    settings: any;
    Notification: any;
  }
  
  export interface Notification {
    text: string;
    time: string;
    icon: any;
  }