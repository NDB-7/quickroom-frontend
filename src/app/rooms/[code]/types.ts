export type ClientMessageType =
  | {
      sentByMe: true;
      sender?: undefined;
      content: string;
      serverNotification?: undefined;
    }
  | {
      sentByMe: false;
      sender: string;
      content: string;
      serverNotification: false;
    }
  | {
      sentByMe?: undefined;
      sender?: undefined;
      content: string;
      serverNotification: true;
    };

export type ChatroomInfoType =
  | {
      success: true;
      name: string;
      expiresAt: number;
    }
  | {
      success: false;
    };
